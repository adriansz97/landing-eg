import _ from "lodash";
import { catalogByPart } from "../../../apis";

const checkCatalogues = async(inputs) => {
  const newInputs = inputs.map(async(inp,idx) => {
    let newInput = _.cloneDeep(inp);
    _.unset(newInput,`children`);
    _.unset(newInput,`childs`);
    _.unset(newInput,`next`);
    _.set(newInput,`selected`,"");
    _.set(newInput,`lastChild`,true);
    
    if ("catalogue" in inp && "isOwn" in inp && !("conditionals" in inp) ) {

      const resp = await catalogByPart({ is_own: inp.isOwn, catalogue: inp.catalogue, path: "/" });

      if (resp.error) return returnCatalogueInputError(inp);
      
      newInput.children = resp.data;
      return newInput;

    } else if ("catalogue" in inp && "isOwn" in inp && "conditionals" in inp ) {

      const resp = await catalogByPart({ is_own: inp.isOwn, catalogue: inp.catalogue, path: "/" });

      if (resp.error) return returnCatalogueInputError(inp);
      
      const nested = await Promise.all(newInput.conditionals.map(async(item)=> {
        const newNestedChildren = await checkCatalogues(item.nestChildren);
        return { caseOf: item.caseOf, nestChildren: newNestedChildren }; 
      }));

      newInput.conditionals = nested;
      newInput.children = resp.data;
      return newInput;
    }
    return inp;
  })
  const newInputsSolved = await Promise.all(newInputs);
  return newInputsSolved;
}

const checkConditionals = (conditionals, value, origin, target = "data") => {
  const currentConditionals = conditionals.find(item=>checkTypeOfConditional(item, value));
  const currentConditionalsIdx = conditionals.findIndex(item=>checkTypeOfConditional(item, value));
  if (currentConditionals && currentConditionalsIdx>=0) {
    if (target==="data") {
      return returnFormData(currentConditionals.nestChildren, `${origin}::conditionals::${currentConditionalsIdx}::nestChildren`)
    } else if (target==="valid") {
      return returnIsValid(currentConditionals.nestChildren)
    }
  }
  return [];
}

export const checkTypeOfConditional = (item, value) => {
  if (typeof value === "boolean" ) {
    if (value===item.caseOf) {
      return true
    } else {
      return false
    }
  }
  if (typeof value === "string" ) {
    if (value.includes(item.caseOf)) {
      return true
    } else {
      return false
    }
  }
}

export const resetInputsCatalogues = (inputs) => {
  const newInputs = inputs.map((inp,idx) => {
    let newInput = _.cloneDeep(inp);
    if ("catalogue" in inp && "isOwn" in inp ) {
      _.unset(newInput,`childs`);
      _.unset(newInput,`next`);
      _.set(newInput,`selected`,"");
    }
    return newInput;
  })
  return newInputs;
}

export const returnFormData = (inputs, path) => {
  const newInputs = inputs.map((input, idx) => {
    const newPath = `${path}::${idx}`;
    if (input.type === "date") {
      let today = new Date();
      return {
        [input.key]: today,
        "sensitive": input.sensitive || false,
        "origin": newPath,
      }
    }
    if (input.type === "date-range") {
      let today = new Date().toJSON();
      return {
        [input.key]: `${today}__${today}`,
        "sensitive": input.sensitive || false,
        "origin": newPath,
      }
    }
    if (input.type === "file") {
      return {
        [input.key]: null,
        "sensitive": input.sensitive || false,
        "origin": newPath,
      }
    }
    if (input.type === "checkbox") {
      return {
        [input.key]: false,
        "sensitive": input.sensitive || false,
        "origin": newPath,
      }
    }
    if (input.type === "checkbox-conditional") {
      return {
        [input.key]: false,
        "sensitive": input.sensitive || false,
        "origin": newPath,
        "conditionals": checkConditionals(input.conditionals, false, newPath, "data")
      }
    }
    if ("catalogue" in input && !("conditionals" in input)) {
      return {
        [input.catalogue]: "",
        "sensitive": input.sensitive || false,
        "origin": newPath,
        "catalogue": input.catalogue,
        "isOwn": input.isOwn
      }
    }
    if ("catalogue" in input && "conditionals" in input) {
      return {
        [input.catalogue]: "",
        "sensitive": input.sensitive || false,
        "origin": newPath,
        "catalogue": input.catalogue,
        "isOwn": input.isOwn,
        "conditionals": checkConditionals(input.conditionals, "", newPath, "data")
      }
    }
    return {
      [input.key]: "",
      "sensitive": input.sensitive || false,
      "origin": newPath,
    }
  })
  return newInputs
}

export const returnIsValid = (inputs) => {
  const newInputs = inputs.map( input => {
    const key = input.catalogue ? input.catalogue : input.key;
    if (input.type === "file" && input.required) {
      return {
        [key]: ["Este campo es requerido"]
      }
    }
    if (input.type === "checkbox") {
      return {
        [key]: []
      }
    }
    if (input.type === "checkbox-conditional") {
      return {
        [key]: [],
        "conditionals": checkConditionals(input.conditionals, false, "", "valid")
      }
    }
    if ("catalogue" in input && !("conditionals" in input) && input.required) {
      return {
        [key]: ["Este campo es requerido"]
      }
    }
    if ("catalogue" in input && "conditionals" in input) {
      if (input.required) {
        return {
          [key]: ["Este campo es requerido"],
          "conditionals": checkConditionals(input.conditionals, "", "", "valid")
        }  
      } else {
        return {
          [key]: [],
          "conditionals": checkConditionals(input.conditionals, "", "", "valid")
        }
      }
    }
    if (input.required) {
      return {
        [key]: ["Este campo es requerido"]
      }
    }
    return { 
      [key]: [] 
    };
  })
  return newInputs;
}

const returnCatalogueInputError = (inp) => ({
  key: `C::${inp.isOwn}::${inp.catalogue}`,
  catalogue: inp.catalogue,
  type: "catalog-error",
  label: `Catalogue with error (${inp.catalogue})`,
  required: false,
  sensitive: false,
  selected: "",
})

// target: 'normal' || 'new' || 'answered' 
export const formStarter = async( formLoaded, target = 'normal' ) => {

  let formIdentifier = "";
  let newSteps = [];
  let newSchemaState = [];
  let newFormData = [];
  let newIsValid = [];
  let newValidCreateSteps = [];
  let newValidCreateInputs = [];

  const begin = async() => {
    formIdentifier = formLoaded.identifier_name;
    if (Array.isArray(formLoaded.stepers)) {
      for (const [ idx, step ] of formLoaded.stepers.entries()) {
        newSteps.push({
          name: step.name,
          title: step.title,
          description: step.description,
        })
        newValidCreateSteps.push([]);
        const jsonSchemaTemp = _.get(step,`form.json-schema`);
        const resp = await checkCatalogues(jsonSchemaTemp);
        newSchemaState.push(resp);
        newFormData.push(returnFormData(resp, `stepers::${idx}::form::json-schema`, ));
        newIsValid.push(returnIsValid(resp));
        newValidCreateInputs.push(resp.map( input => {
          // const validInput = 
          // if ("catalogue" in input) {
            
          // }
          // console.log(input)
          return []
        }));
      }
    }
  }

  const beginNew = () => {
    newSteps = [
      {
        name: "titulo_del_paso",
        title: "Título del paso",
        description: "Any description"
      }
    ];
    newSchemaState = [
      [
        {
          "key": "ingrese_etiqueta",
          "type": "string",
          "label": "Ingrese etiqueta",
          "placeholder": "tempPlaceholder",
          "required": false,
          "sensitive": false,
          "grid": 4
        }
      ]
    ];
    newFormData = [
      [
        { input_label: "" }
      ]
    ];
    newIsValid = [
      [
        { input_label: [] }
      ]
    ];
    newValidCreateSteps = [
      []
    ]
    newValidCreateInputs = [
      [
        []
      ]
    ]
  }

  if (target === 'normal') {
    await begin();
  } else if ('new') {
    beginNew();
  } else if ('answered') {
    
  }


  return {
    initFormIdentifier: formIdentifier,
    initSteps: newSteps,
    initSchemaState: newSchemaState,
    initFormData: newFormData,
    initIsValid: newIsValid,
    initValidCreateSteps: newValidCreateSteps,
    initValidCreateInputs: newValidCreateInputs,
  }
}

