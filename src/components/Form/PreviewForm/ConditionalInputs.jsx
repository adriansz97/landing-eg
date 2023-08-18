import { useEffect, useState } from "react";
import _ from "lodash";
import { RenderInput, hdlChg, hdlSchm, hdlIsVal } from './PreviewForm'
import { checkTypeOfConditional, resetInputsCatalogues, returnFormData, returnIsValid } from "./formStarter";

export const ConditionalInputs = ({ 
  entireSchema, entirePathSchema, setSchemaState,
  entireFormData, entirePathData, setFormData,
  entireIsValid, setIsValid,
  conditionals = [], 
  parentValue, 
  parentOrigin,
  attachments, 
  setAttachments,
  tryToNext,
  activeStep,
}) => {
  
  const [currentConditionals, setCurrentConditionals] = useState([]);
  const [currentConditionalsIdx, setCurrentConditionalsIdx] = useState(null);
  const [rerendering, setRerendering] = useState(false);
  const [parentValueState, setParentValueState] = useState(parentValue);

  const changeValidationForConditionals = (getCurrentConditionals, getCurrentConditionalsIdx) => {
    if (getCurrentConditionalsIdx!=currentConditionalsIdx) {
      const newSchemaConditionals = Array.isArray(getCurrentConditionals) && resetInputsCatalogues(getCurrentConditionals) || [];
      const newDataConditionals = Array.isArray(getCurrentConditionals) && returnFormData(getCurrentConditionals, `${parentOrigin}::conditionals::${getCurrentConditionalsIdx}::nestChildren`) || [];
      const newValidConditionals = Array.isArray(getCurrentConditionals) && returnIsValid(getCurrentConditionals) || [];
      hdlSchm({action: "resetInputs", pathSchema: `${entirePathData}.conditionals.${getCurrentConditionalsIdx}.nestChildren`, inputs: newSchemaConditionals, entireSchema, setSchemaState})
      hdlChg({e:{target:{value: newDataConditionals}}, entirePathData, params: { conditionals: newDataConditionals }, entireFormData, setFormData})
      hdlIsVal({errors: newValidConditionals, entirePathDataWithKey: `${entirePathData}.conditionals`, entireIsValid, setIsValid});
      setParentValueState(parentValue);
      setRerendering(true);
    }
  }
  
  const changeSchema = () => {
    if (!rerendering) {
      const getCurrentConditionals = conditionals.find(item=>checkTypeOfConditional(item, parentValue));
      const getCurrentConditionalsIdx = conditionals.findIndex(item=>checkTypeOfConditional(item, parentValue));
      setCurrentConditionals(getCurrentConditionals?.nestChildren);
      setCurrentConditionalsIdx(getCurrentConditionalsIdx);
      if (parentValueState != parentValue) {
        changeValidationForConditionals(getCurrentConditionals?.nestChildren, getCurrentConditionalsIdx);
      }
    }
  }

  useEffect(() => {
    if (rerendering) {
      setRerendering(false);
    }
  }, [rerendering]);

  useEffect(() => {
    changeSchema();
  }, [parentValue]);
  
  return (
    <>
      {
        (Array.isArray(currentConditionals)) && (currentConditionals.length > 0) && (currentConditionalsIdx >= 0) && !rerendering &&
        currentConditionals.map((sch,idx) => (
          <RenderInput
            key={`${parentOrigin}::conditionals::${currentConditionalsIdx}::nestChildren::${idx}`}
            entireSchema={entireSchema}
            entirePathSchema={`${entirePathSchema}.conditionals.${currentConditionalsIdx}.nestChildren.${idx}`}
            setSchemaState={setSchemaState}
            entireFormData={entireFormData}
            entirePathData={`${entirePathData}.conditionals.${idx}`}
            setFormData={setFormData}
            entireIsValid={entireIsValid}
            setIsValid={setIsValid}
            attachments={attachments}
            setAttachments={setAttachments}
            tryToNext={tryToNext}
            activeStep={activeStep}
            origin={`${parentOrigin}::conditionals::${currentConditionalsIdx}::nestChildren::${idx}`}
          />
        ))
      }
    </>
  )
}