import { useEffect, useState } from "react";
import { RenderInput } from './PreviewForm'
import _ from "lodash";
import { resetInputsCatalogues, returnFormData, returnIsValid } from "./formStarter";
import { useMemo } from "react";

export const ConditionalInputs = ({ 
  conditionals = [], 
  parentValue, 
  hdlChg, 
  hdlSchm, 
  hdlIsVal, 
  tryToSend,
  entireSchema,
  entireFormData,
  entireIsValid,
  entirePathSchema,
  entirePathData,
  tryToNext,
  activeStep,
  land
}) => {
  
  const [currentConditionals, setCurrentConditionals] = useState([]);
  const [currentConditionalsIdx, setCurrentConditionalsIdx] = useState(null);
  const [rerendering, setRerendering] = useState(true);

  useEffect(() => {
    const getCurrentConditionals = conditionals.find(item=>item.caseOf===parentValue);
    const getCurrentConditionalsIdx = conditionals.findIndex(item=>item.caseOf===parentValue);
    setCurrentConditionals(getCurrentConditionals?.nestChildren || []);
    setCurrentConditionalsIdx(getCurrentConditionalsIdx);
    setRerendering(false);
  }, []);

  const changeValidationForConditionals = (getCurrentConditionals, getCurrentConditionalsIdx) => {
    const newSchemaConditionals = Array.isArray(getCurrentConditionals) && resetInputsCatalogues(getCurrentConditionals) || [];
    const newDataConditionals = Array.isArray(getCurrentConditionals) && returnFormData(getCurrentConditionals) || [];
    const newValidConditionals = Array.isArray(getCurrentConditionals) && returnIsValid(getCurrentConditionals) || [];
    hdlSchm({ action: "resetInputs", pathSchema: `${entirePathData}.conditionals.${getCurrentConditionalsIdx}.nestChildren`, inputs: newSchemaConditionals })
    hdlChg({e:{target:{value: newDataConditionals}}, entirePathData, params: { conditionals: newDataConditionals }})
    hdlIsVal({errors: newValidConditionals, entirePathDataWithKey: `${entirePathData}.conditionals`});
  }
  
  const changeSchema = () => {
    if (!rerendering) {
      const getCurrentConditionals = conditionals.find(item=>item.caseOf===parentValue);
      const getCurrentConditionalsIdx = conditionals.findIndex(item=>item.caseOf===parentValue);
      setCurrentConditionals(getCurrentConditionals?.nestChildren);
      setCurrentConditionalsIdx(getCurrentConditionalsIdx);
      changeValidationForConditionals(getCurrentConditionals?.nestChildren, getCurrentConditionalsIdx);
    }
  }

  useMemo(() => changeSchema(parentValue), [parentValue]);
  
  return (
    <>
      {
        (Array.isArray(currentConditionals)) && (currentConditionals.length > 0) && (currentConditionalsIdx >= 0) &&
        currentConditionals.map((sch,idx) => (
          <RenderInput
            key={`form-input-conditional-${idx}`}
            idx={idx}
            schema={sch}
            hdlChg={hdlChg}
            hdlSchm={hdlSchm}
            hdlIsVal={hdlIsVal}
            tryToSend={tryToSend}
            entireSchema={entireSchema}
            entirePathSchema={`${entirePathSchema}.conditionals.${currentConditionalsIdx}.nestChildren.${idx}`}
            entireFormData={entireFormData}
            entirePathData={`${entirePathData}.conditionals.${idx}`}
            entireIsValid={entireIsValid}
            tryToNext={tryToNext}
            activeStep={activeStep}
            land={land}
          />
        ))
      }
    </>
  )
}