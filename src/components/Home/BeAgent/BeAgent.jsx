import { useEffect, useState } from "react";
import _ from "lodash";
import { CDBInput, CDBBtn, CDBStep, CDBContainer, CDBStepper } from "cdbreact";
import { getDetailCurrentReport, catalogByPart } from "../../../apis";
import { PreviewForm } from "../../PreviewForm/PreviewForm";
import "./styles.scss";
import { Container } from "react-bootstrap";

const BeAgent = () => {

  const [form, setForm] = useState(null);
  const [formIdentifier, setFormIdentifier] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [steps, setSteps] = useState([
    {
      name: "step_title",
      title: "Step title",
      description: "Write a description"
    }
  ]);
  const [schemaState, setSchemaState] = useState([
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
  ]);
  const [formData, setFormData] = useState([
    [
      { input_label: "" }
    ]
  ]);
  const [isValid, setIsValid] = useState([
    [
      true
    ]
  ]);

  useEffect(() => {
    getDetailCurrentReport()
    .then(setForm)
    .catch(console.log)
  }, []);

  useEffect(() => {
    if (form) {
      begin();
    }
  }, [form]);

  const checkIfIsCatalogue = async(inputs) => {

    const newInputs = inputs.map(async(inp,idx) => {
      let newInput = _.cloneDeep(inp);
      if ("catalogue" in inp && "isOwn" in inp) {
        _.unset(newInput,`children`);
        _.unset(newInput,`childs`);
        _.unset(newInput,`next`);
        _.set(newInput,`selected`,"");

        const resp = await catalogByPart({ is_own: inp.isOwn, catalogue: inp.catalogue, path: "/" })
        newInput.children = resp.data;
        return newInput;
      }
      return inp;
    })

    const newInputsSolved = await Promise.all(newInputs);
    return newInputsSolved;
  }

  const begin = async() => {
    setFormIdentifier(form.identifier_name);
    setFormDescription(form.description);
    if (Array.isArray(form.stepers)) {

      let newSteps = [];
      let newSchemaState = [];
      let newFormData = [];
      let newIsValid = [];

      for (const step of form.stepers) {
        newSteps.push({
          name: step.name,
          title: step.title,
          description: step.description,
        })
        const jsonSchemaTemp = _.get(step,`form.json-schema`);
        const resp = await checkIfIsCatalogue(jsonSchemaTemp);
        newSchemaState.push(resp);
        newFormData.push(resp.map( input => {
          if (input.type === "number") {
            return {
              [input.key]: 0,
              "sensitive": input.sensitive || false
            }
          }
          if (input.type === "checkbox") {
            return {
              [input.key]: false,
              "sensitive": input.sensitive || false
            }
          }
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
          if ("catalogue" in input) {
            return {
              [input.catalogue]: "",
              "sensitive": input.sensitive || false,
              "catalogue": input.catalogue,
              "isOwn": input.isOwn
            }
          } else {
            return {
              [input.key]: "",
              "sensitive": input.sensitive || false
            }
          }
        }));
        newIsValid.push(resp.map( input => input.required ? false : true ))
        // newIsValid.push(resp.map( input => input.required ? false : true ))
      }

      setSteps(newSteps);
      setSchemaState(newSchemaState);
      setFormData(newFormData);
      setIsValid(newIsValid);
    }
  }

  return(
    <div id="be-agent" className="complaint-content">
      <div id="title">
        <h3 className="mb-5">¿CÓMO FUNCIONA?</h3>
        <p>Por medio de este sitio podrás denunciar aquellas conductas no éticas de manera sencilla, confidencial, segura y con la opción de hacerlo de forma anónima.
          El sistema es operado por un tercero independiente a Grupo Lala, líder en el país y especialista en la gestión de denuncias y reportes (EthicsGlobal).</p>
      </div>
      <div className="form-container mt-5">
        <PreviewForm
          formIdentifier={formIdentifier}
          formDescription={formDescription}
          steps={steps}
          schemaState={schemaState}
          setSchemaState={setSchemaState}
          formData={formData}
          setFormData={setFormData}
          isValid={isValid}
          setIsValid={setIsValid}
        />  
      </div>
    </div>
  )
}

export default BeAgent;