import { useEffect, useMemo, useState } from "react";
import _ from "lodash";
import { RenderInput, hdlChg, hdlSchm, hdlIsVal } from './PreviewForm'
import { resetInputsCatalogues, returnFormData, returnIsValid } from "./formStarter";

export const ConditionalInputs = ({ 
  entireSchema, entirePathSchema, setSchemaState,
  entireFormData, entirePathData, setFormData,
  entireIsValid, setIsValid,
  conditionals = [], 
  parentValue, 
  attachments, 
  setAttachments, 
  tryToSend,
  tryToNext,
  activeStep,
  land,
  colsLg,
}) => {
  
  const [currentConditionals, setCurrentConditionals] = useState([]);
  const [currentConditionalsIdx, setCurrentConditionalsIdx] = useState(null);
  const [rerendering, setRerendering] = useState(true);

  const changeValidationForConditionals = (getCurrentConditionals, getCurrentConditionalsIdx) => {
    const newSchemaConditionals = Array.isArray(getCurrentConditionals) && resetInputsCatalogues(getCurrentConditionals) || [];
    const newDataConditionals = Array.isArray(getCurrentConditionals) && returnFormData(getCurrentConditionals) || [];
    const newValidConditionals = Array.isArray(getCurrentConditionals) && returnIsValid(getCurrentConditionals) || [];

    hdlSchm({action: "resetInputs", pathSchema: `${entirePathData}.conditionals.${getCurrentConditionalsIdx}.nestChildren`, inputs: newSchemaConditionals, entireSchema, setSchemaState})
    hdlChg({e:{target:{value: newDataConditionals}}, entirePathData, params: { conditionals: newDataConditionals }, entireFormData, setFormData})
    hdlIsVal({errors: newValidConditionals, entirePathDataWithKey: `${entirePathData}.conditionals`, entireIsValid, setIsValid});
  }
  
  const changeSchema = () => {
    if (!rerendering) {
      const getCurrentConditionals = conditionals.find(item=>item.caseOf===parentValue);
      const getCurrentConditionalsIdx = conditionals.findIndex(item=>item.caseOf===parentValue);
      setCurrentConditionals(getCurrentConditionals?.nestChildren);
      setCurrentConditionalsIdx(getCurrentConditionalsIdx);
      changeValidationForConditionals(getCurrentConditionals?.nestChildren, getCurrentConditionalsIdx);
      setRerendering(true);
    }
  }

  useEffect(() => {
    const getCurrentConditionals = conditionals.find(item=>item.caseOf===parentValue);
    const getCurrentConditionalsIdx = conditionals.findIndex(item=>item.caseOf===parentValue);
    setCurrentConditionals(getCurrentConditionals?.nestChildren || []);
    setCurrentConditionalsIdx(getCurrentConditionalsIdx);
    setRerendering(false);
  }, []);

  useEffect(() => {
    if (rerendering) {
      setRerendering(false);
    }
  }, [rerendering]);

  useEffect(() => {
    changeSchema(parentValue);
  }, [parentValue]);

  // useMemo(() => changeSchema(parentValue), [parentValue]);
  
  return (
    <>
      {
        (Array.isArray(currentConditionals)) && (currentConditionals.length > 0) && (currentConditionalsIdx >= 0) && !rerendering &&
        currentConditionals.map((sch,idx) => (
          <RenderInput
            key={`form-input-conditional-${idx}`}
            idx={idx}
            tryToSend={tryToSend}
            entireSchema={entireSchema}
            entirePathSchema={`${entirePathSchema}.conditionals.${currentConditionalsIdx}.nestChildren.${idx}`}
            entireFormData={entireFormData}
            entirePathData={`${entirePathData}.conditionals.${idx}`}
            entireIsValid={entireIsValid}
            attachments={attachments}
            setAttachments={setAttachments}
            tryToNext={tryToNext}
            activeStep={activeStep}
            land={land}
            colsLg={colsLg}

            setSchemaState={setSchemaState}
            setFormData={setFormData}
            setIsValid={setIsValid}
          />
        ))
      }
    </>
  )
}