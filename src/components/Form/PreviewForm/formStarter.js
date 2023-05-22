import _ from "lodash";
import { catalogByPart } from "../../../apis";

const checkCatalogues = async(inputs) => {
  const newInputs = inputs.map(async(inp,idx) => {
    let newInput = _.cloneDeep(inp);
    _.unset(newInput,`children`);
    _.unset(newInput,`childs`);
    _.unset(newInput,`next`);
    _.set(newInput,`selected`,"");
    
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

export const returnFormData = (inputs) => {
  const newInputs = inputs.map( input => {
    if (input.type === "date") {
      let today = new Date();
      return {
        [input.key]: today,
        "sensitive": input.sensitive || false
      }
    }
    if (input.type === "date-range") {
      let today = new Date().toJSON();
      return {
        [input.key]: `${today}__${today}`,
        "sensitive": input.sensitive || false
      }
    }
    if (input.type === "file") {
      return {
        [input.key]: null,
        "sensitive": input.sensitive || false
      }
    }
    if (input.type === "checkbox") {
      return {
        [input.key]: false,
        "sensitive": input.sensitive || false
      }
    }
    if (input.type === "checkbox-conditional") {
      return {
        [input.key]: false,
        "sensitive": input.sensitive || false,
        "conditionals": []
      }
    }
    if ("catalogue" in input && !("conditionals" in input)) {
      return {
        [input.catalogue]: "",
        "sensitive": input.sensitive || false,
        "catalogue": input.catalogue,
        "isOwn": input.isOwn
      }
    }
    if ("catalogue" in input && "conditionals" in input) {
      return {
        [input.catalogue]: "",
        "sensitive": input.sensitive || false,
        "catalogue": input.catalogue,
        "isOwn": input.isOwn,
        "conditionals": []
      }
    }
    return {
      [input.key]: "",
      "sensitive": input.sensitive || false
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
        "conditionals": []
      }
    }
    if ("catalogue" in input && !("conditionals" in input) && input.required) {
      return {
        [key]: ["El catalogo debe estar completo"]
      }
    }
    if ("catalogue" in input && "conditionals" in input) {
      if (input.required) {
        return {
          [key]: ["El catalogo debe estar completo"],
          "conditionals": []
        }  
      } else {
        return {
          [key]: [],
          "conditionals": []
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
      for (const step of formLoaded.stepers) {
        newSteps.push({
          name: step.name,
          title: step.title,
          description: step.description,
        })
        newValidCreateSteps.push([]);
        const jsonSchemaTemp = _.get(step,`form.json-schema`);
        const resp = await checkCatalogues(jsonSchemaTemp);
        newSchemaState.push(resp);
        newFormData.push(returnFormData(resp));
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
        name: "step_title",
        title: "Step title",
        description: "Write a description"
      }
    ];
    newSchemaState = [
      [
        {
          "key": "input_label",
          "type": "string",
          "label": "Input label",
          "placeholder": "tempPlaceholder",
          "required": false,
          "sensitive": false
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

  // const beginNew2 = () => {
  //   newSteps = [
  //     {
  //       name: "step_title",
  //       title: "Step title",
  //       description: "Write a description"
  //     }
  //   ];
  //   newSchemaState = [
  //     [
  //       {
  //         "key": "input_label",
  //         "type": "string",
  //         "label": "Input label",
  //         "placeholder": "tempPlaceholder",
  //         "required": false,
  //         "sensitive": false
  //       },
  //       {
  //         "key": "input_label2",
  //         "type": "checkbox-conditional",
  //         "label": "Mantenerme Informado del caso",
  //         "placeholder": "tempPlaceholder",
  //         "required": false,
  //         "sensitive": false,
  //         "conditionals": [
  //           {
  //             "caseOf": true,
  //             "nestChildren": [
  //               {
  //                 "key": "correo_electronico",
  //                 "type": "string",
  //                 "label": "Correo electronico",
  //                 "placeholder": "tempPlaceholder",
  //                 "required": false,
  //                 "sensitive": false
  //               },
  //               {
  //                 "key": "telefono",
  //                 "type": "number",
  //                 "label": "Telefono",
  //                 "placeholder": "tempPlaceholder",
  //                 "required": false,
  //                 "sensitive": false
  //               },
  //             ]
  //           },
  //         ]
  //       },
  //       {
  //         "key": "C::EG::RD-102101",
  //         "type": "catalog-select-conditional",
  //         "label": "Relationship with the company",
  //         "placeholder": "tempPlaceholder",
  //         "required": false,
  //         "sensitive": false,
  //         "scope": "/",
  //         "selected": "",
  //         "conditionals": [
  //           {
  //             "caseOf": "type::associatesCommissionAgentsDistributorsExternal",
  //             "nestChildren": [
  //               {
  //                 "key": "input_label_de_associatesCommissionAgentsDistributorsExternal",
  //                 "type": "string",
  //                 "label": "Input label ass",
  //                 "placeholder": "tempPlaceholder",
  //                 "required": false,
  //                 "sensitive": false
  //               },
  //             ]
  //           },
  //           {
  //             "caseOf": "type::clients",
  //             "nestChildren": [
  //               {
  //                 "key": "C::EG::IC-101",
  //                 "type": "catalog-select",
  //                 "label": "Industry classification",
  //                 "placeholder": "tempPlaceholder",
  //                 "required": true,
  //                 "sensitive": false,
  //                 "scope": "/",
  //                 "selected": "",
  //                 "isOwn": false,
  //                 "catalogue": "IC-101"
  //               },
  //               {
  //                 "key": "input_label_de_clients2",
  //                 "type": "string",
  //                 "label": "Input label clientes",
  //                 "placeholder": "tempPlaceholder",
  //                 "required": false,
  //                 "sensitive": false
  //               },
  //             ]
  //           },
  //         ],
  //         "isOwn": false,
  //         "catalogue": "RD-102101"
  //       },
  //     ]
  //   ];
  //   newFormData = [
  //     [
  //       { "input_label": "" },
  //       { 
  //         "input_label2": false,
  //         "conditionals": [
  //           { 
  //             "input_label_de_clients": "" 
  //           },
  //           { 
  //             "input_label_de_clients2": "" 
  //           }
  //         ]
  //       },
  //       { 
  //         "RD-102101": "",
  //         "conditionals": [
  //           { 
  //             "input_label_de_clients": "" 
  //           },
  //           { 
  //             "input_label_de_clients2": "" 
  //           }
  //         ]
  //       },
  //     ]
  //   ];
  //   newIsValid = [
  //     [
  //       { "input_label": [] },
  //       { 
  //         "input_label2": [],
  //         "conditionals": [
  //           { 
  //             "input_label_de_clients": []
  //           },
  //           { 
  //             "input_label_de_clients2": []
  //           }
  //         ]
  //       },
  //       { 
  //         "RD-102101": [],
  //         "conditionals": [
  //           { 
  //             "input_label_de_clients": []
  //           },
  //           { 
  //             "input_label_de_clients2": []
  //           }
  //         ]
  //       },
  //     ]
  //   ];
  //   newValidCreateSteps = [
  //     []
  //   ]
  //   newValidCreateInputs = [
  //     [
  //       []
  //     ]
  //   ]
  // }

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

