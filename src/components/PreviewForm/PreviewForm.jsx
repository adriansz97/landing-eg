import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import _ from "lodash";
import DatePicker from "react-datepicker";
import { Col, Row, Button } from "react-bootstrap";
import { CDBStep, CDBStepper } from "cdbreact";
import { catalogByPart, createReport } from "../../apis";
import './styles.scss'

// Render de un input asociado a un catalogo
const CatalogueInput = ({ scope, value, valid, path = "", nestNum = 0, keyData, idx, type, required, catalogue, isOwn, hdlChg, hdlSchm, doValidate, isValidCatalogue, setIsValidCatalogue }) => {

  const [selectedKey, setSelectedKey] = useState(scope.selected||"");
  const isUniqueSelectionDefault = Array.isArray(scope.children) && scope.children.length===1;

  useEffect(() => {
    if (isUniqueSelectionDefault && !scope.selected) {
      setSelectedKey(scope.children[0].key);
      if (Array.isArray(scope.children[0].childs)) {
        hdlSchm({ action: "selection", children: scope.children[0].childs, selected: scope.children[0].key, path, idx });
      }
    } else {
      setSelectedKey(scope.selected);
    }
  }, [scope]);

  useEffect(() => {
    // Cuando la llave cambia a un string vacio o cuando se crea el componente
    if (!selectedKey) {
      // Cuando el selectedKey tiene valor y cambia a ""
      if (scope.selected!==selectedKey) {
        hdlSchm({ action: "nullSelection", path, idx });
        const valueTemp = value ? value : "";
        const splitedArr = valueTemp.split("::");
        const slicedArr = splitedArr.slice(0,((2*(nestNum))));
        const joined = slicedArr.join("::");
        if (joined) {
          hdlChg({target:{name: catalogue, value: `${joined}`}},idx);
        } else {
          hdlChg({target:{name: catalogue, value: ``}},idx);
        }
      }
    // Cuando la selectedKey es diferente a la seleccionada en el schema
    } else if (scope.selected!==selectedKey) {
      const actualScope = scope.children.find(obj=>obj.key===selectedKey);
      if (isUniqueSelectionDefault) {
        if (Array.isArray(scope.children[0].childs)) {
          if (!scope.next && !scope.selected) {
            hdlSchm({ action: "selection", children: scope.children[0].childs, selected: scope.children[0].key, path, idx });
          }
        } else {
          // Cuando el ultimo hijo es unico
          hdlSchm({ action: "noNextPath", selected: selectedKey, path, idx, });
          setIsValidCatalogue(true);
          const valueTemp = value ? value : "";
          const splitedArr = valueTemp.split("::");
          const slicedArr = splitedArr.slice(0,((2*(nestNum))));
          const joined = slicedArr.join("::");
          if (joined) {
            hdlChg({target:{name: catalogue, value: `${joined}::type::${selectedKey}`}},idx);
          } else {
            hdlChg({target:{name: catalogue, value: `type::${selectedKey}`}},idx);
          }
        }
      } else {
        const pathOnBack = actualScope?.path;
        if (pathOnBack) {
          catalogByPart({ is_own: isOwn, catalogue, path: pathOnBack })
          .then( resp => {
            hdlSchm({ action: "selection", children: resp.data, selected: selectedKey, path, idx });
            handleDataChange({ pathOnBack, scope: resp.data });
          })
          .catch(console.log);
        } else {
          hdlSchm({ action: "noNextPath", selected: selectedKey, path, idx, });
          setIsValidCatalogue(true);
          if (!isUniqueSelectionDefault) {
            const valueTemp = value ? value : "";
            const splitedArr = valueTemp.split("::");
            const slicedArr = splitedArr.slice(0,((2*(nestNum))));
            const joined = slicedArr.join("::");
            if (joined) {
              hdlChg({target:{name: catalogue, value: `${joined}::type::${selectedKey}`}},idx);
            } else {
              hdlChg({target:{name: catalogue, value: `type::${selectedKey}`}},idx);
            }
          }
        }
      }
    // Solo para cambiar la data cuando los primeros selects sean uniqueSelection
    } else if (scope.selected===selectedKey) {
      if (isUniqueSelectionDefault) {
        const valueTemp = value ? value : "";
        const splitedArr = valueTemp.split("::");
        const slicedArr = splitedArr.slice(0,((2*(nestNum))));
        const joined = slicedArr.join("::");
        if (joined) {
          hdlChg({target:{name: catalogue, value: `${joined}::type::${selectedKey}`}},idx);
        } else {
          hdlChg({target:{name: catalogue, value: `type::${selectedKey}`}},idx);
        }
      }
    }
  }, [selectedKey]);

  const handleDataChange = ({ pathOnBack, scope, acumulatedPath }) => {
    if (scope.length===1) {  // una sola opcion
      if (Array.isArray(scope[0].childs) || Array.isArray(scope.children)) { // una sola opcion y tiene hijo o hijos
        handleDataChange({
          scope: scope[0].childs,
          acumulatedPath: scope[0].path
        })
      } else {  // una sola opcion y no tiene hijos
        if (pathOnBack) {
          hdlChg({ target:{name: catalogue, value: `${pathOnBack}::type::${scope[0].key}`}}, idx);
        } else {
          hdlChg({ target:{name: catalogue, value: `${acumulatedPath}::type::${scope[0].key}`}}, idx);
        }
      }
    } else { // varias opciones
      if (pathOnBack) {
        hdlChg({ target:{name: catalogue, value: pathOnBack}}, idx);
      } else {
        hdlChg({ target:{name: catalogue, value: acumulatedPath}}, idx);
      }
    }
  }

  return (
    <>
      {
        type==="catalog-select"
          ? <>
              <Col md="4" className="fade-in-image preview-input-container" >
                <select className="form-control form-select-input w-100" onChange={(e)=>setSelectedKey(e.target.value)} name={scope.key} value={selectedKey} style={{margin: 0}}>
                  {
                    !isUniqueSelectionDefault &&
                      <option value="">Seleccione una opción</option>
                  }
                  {
                    scope.children &&
                    scope.children.map(item=>(
                      <option key={item.key} value={item.key} name={item.path}>{item.label}</option>
                    ))
                  }
                </select>
              </Col>
              {
                (scope?.next && selectedKey) &&
                  <CatalogueInput
                    scope={scope.next} 
                    value={value}
                    valid={valid}
                    path={`${path}next.`} 
                    antMultiSelect={!isUniqueSelectionDefault}
                    nestNum={nestNum+1}
                    keyData={keyData}
                    idx={idx}
                    type={type} 
                    required={required}
                    catalogue={catalogue} 
                    isOwn={isOwn} 
                    hdlChg={hdlChg}
                    hdlSchm={hdlSchm}
                    isValidCatalogue={isValidCatalogue}
                    setIsValidCatalogue={setIsValidCatalogue}
                  />
              }
            </>
          : <>
              <Col md="4" className="fade-in-image preview-input-container" >
                  {
                    scope.children &&
                    scope.children.map((item,idxx)=>(
                      <div key={item.key} className="form-check">
                        <input className="form-check-input" id={`${item.path}-${item.key}-${nestNum}`} type="radio" value={item.key} name={item.path} checked={selectedKey===item.key} onChange={(e) => setSelectedKey(e.target.value)} />
                        <label className="form-check-label" htmlFor={`${item.path}-${item.key}-${nestNum}`}>{item.label}</label>
                        <br />
                      </div>
                    ))
                  }
              </Col>
              {
                (scope?.next && selectedKey) &&
                  <CatalogueInput
                    scope={scope.next} 
                    value={value}
                    path={`${path}next.`}
                    antMultiSelect={!isUniqueSelectionDefault} 
                    nestNum={nestNum+1}
                    keyData={keyData}
                    idx={idx}
                    type={type} 
                    required={required}
                    catalogue={catalogue} 
                    isOwn={isOwn} 
                    hdlChg={hdlChg}
                    hdlSchm={hdlSchm}
                    isValidCatalogue={isValidCatalogue}
                    setIsValidCatalogue={setIsValidCatalogue}
                  />
              }
            </>
      }
    </>
  )
}

// Render de cada uno de los inputs en el schema
const RenderInput = ({ schema, formData, valid, idx, hdlChg, hdlSchm, hdlIsVal }) => {

  const [isValidCatalogue, setIsValidCatalogue] = useState(false);

  useEffect(() => {
    if (isValidCatalogue) {
      setIsValidCatalogue(false);
    }
    const errors = doValidate();
    hdlIsVal(errors,idx);
  }, [formData]);

  const doValidate = () => {
    let errors = [];
    if (schema.type === "string") {
      if (schema.required===true) {
        if (formData[schema.key].trim()==="") {
          errors.push("This field may not be empty")
        }
      }
    }
    if (schema.type === "number") {
      if (schema.required===true) {
        if (isNaN(formData[schema.key])) {
          errors.push("This field only accept numbers");
        }
      }
    }
    if (schema.type === "textarea") {
      if (schema.required===true) {
        if (formData[schema.key].trim()==="") {
          errors.push("This field may not be empty")
        }
      }
    }
    if (schema.type === "checkbox") {
      if (!typeof formData[schema.key] === "boolean") {
        errors.push("This field is wrong")
      }
    }
    if (schema.type === "file") {
      if (schema.required===true) {
        if (formData[schema.key]===null) {
          errors.push("You must select a file")
        }
      }
    }
    if (schema.type === "date") {
      if (!isValidDate()) {
        errors.push("This is not valid date")
      }
    }
    if (schema.type === "date-range") {
      let dates = formData[schema.key];
      dates = dates.split("__");
      if (dates.length === 2) {
        if (!isValidDate("start")) {
          errors.push("Start date is not valid")
        }
        if (!isValidDate("end")) {
          errors.push("End date is not valid")
        }
      } else {
        errors.push("This is not valid date (dont have two dates)")
      }
    }
    if (schema.type === "catalog-select" || schema.type === "catalog-radio") {
      if (schema.required) {
        if (!isValidCatalogue) {
          errors = ["This catalogue is not completed"];
        }
      }
    }
    return errors;
  }

  // FOR DATES
  const isValidDate = (startend) => {
    if (startend) {
      let dates = formData[schema.key];
      dates = dates.split("__");
      if (startend==="start" && dates.length===2) {
        return !isNaN(new Date(dates[0]).getTime());
      } else if (startend==="end" && dates.length===2) {
        return !isNaN(new Date(dates[1]).getTime());
      }
    }
    return !isNaN(new Date(formData[schema.key]).getTime());
  };
  const returnDateRange = (startend) => {
    let dates = formData[schema.key];
    dates = dates.split("__");
    if (startend==="start" && dates.length===2) {
      let newDate = new Date(dates[0]);
      return newDate;
    } else if (startend==="end" && dates.length===2) {
      let newDate = new Date(dates[1]);
      return newDate;
    }
    return false;
  }

  if (schema.type === "string") {
    return (
      <Col md="6" className="preview-input-container fade-in-image">
          <label className="w-100">{schema.label}{schema.required?"*":""}</label>
          <input autoComplete="off" type="text" className="form-control w-100" name={schema.key} value={formData[schema.key]} onChange={(e)=>hdlChg(e,idx)} required={schema.required} />
      </Col>
    )
  }
  if (schema.type === "number") {
    return (
      <Col md="6" className="preview-input-container fade-in-image">
        <label className="w-100">{schema.label}{schema.required?"*":""}</label>
        <input autoComplete="off" type="number" className="form-control w-100" name={schema.key} value={formData[schema.key]} onChange={(e)=>hdlChg(e,idx)} required={schema.required} />
      </Col>
    )
  }
  if (schema.type === "textarea") {
    return (
      <Col md="6" className="preview-input-container fade-in-image">
        <label className="w-100" >{schema.label}{schema.required?"*":""}</label>
        <textarea autoComplete="off" type="text" className="form-control w-100" name={schema.key} value={formData[schema.key]} onChange={(e)=>hdlChg(e,idx)} required={schema.required} ></textarea>
      </Col>
    )
  }
  if (schema.type === "checkbox") {
    return (
      <Col md="12" className="preview-input-container fade-in-image">
        <div className="form-check">
          <input className="form-check-input" type="checkbox" name={schema.key} defaultChecked={formData[schema.key]} id={schema.key} onChange={(e)=>hdlChg(e,idx,"checkbox")} required={schema.required} />
          <label className="form-check-label" htmlFor={schema.key}>
            {schema.label}{schema.required?"*":""}
          </label>
        </div>
      </Col>
    )
  }
  if (schema.type === "file") {
    return (
      <Col md="12" className="preview-input-container fade-in-image">
        <div className="form-check">
          <label>
            {schema.label}{schema.required?"*":""}
          </label>
          <input className="form-control" name={schema.key} type="file" onChange={(e)=>hdlChg(e,idx)} required={schema.required} />
        </div>
      </Col>
    )
  }
  if (schema.type === "date") {
    const initialDate = new Date();
    return (
      <Col md="6" className="preview-input-container fade-in-image">
        <div className="form-check">
          <label>
            {schema.label}{schema.required?"*":""}
          </label>
          <DatePicker 
            selected={ isValidDate() ? formData[schema.key] : initialDate }
            onChange={(value)=>hdlChg({target:{name: schema.key, value, type: "date"}},idx)} 
          />
        </div>
      </Col>
    )
  }
  if (schema.type === "date-range") {
    const initialDate = new Date();
    return (
      <Col md="12" className="preview-input-container fade-in-image">
        <div>
          <label>
            {schema.label}{schema.required?"*":""}
          </label>
          <Row md="12">
            <Col md="6">
              <label>Initial Date</label>
              <DatePicker 
                selected={ isValidDate("start")?returnDateRange("start"):initialDate}
                onChange={(value)=>hdlChg({target:{name: schema.key, value, type: 'date-range-start'}},idx)}
              />
            </Col>
            <Col md="6">
              <label>Final Date</label>
              <DatePicker 
                selected={ isValidDate("end")?returnDateRange("end"):initialDate}
                onChange={(value)=>hdlChg({target:{name: schema.key, value, type: 'date-range-end'}},idx)}
              />
            </Col>
          </Row>
        </div>
      </Col>
    )
  }
  if (schema.type === "catalog-select" || schema.type === "catalog-radio") {
    return (
      <Col md="12" className="preview-input-container fade-in-image">
        <label>{schema.label}{schema.required?"*":""}</label>
        <Row md="12">
          <CatalogueInput 
            scope={schema} 
            valid={valid}
            value={formData[schema.catalogue]} 
            keyData={schema.key} 
            idx={idx} 
            type={schema.type} 
            required={schema.required}
            catalogue={schema.catalogue} 
            isOwn={schema.isOwn} 
            hdlChg={hdlChg} 
            hdlSchm={hdlSchm} 
            doValidate={doValidate}
            isValidCatalogue={isValidCatalogue}
            setIsValidCatalogue={setIsValidCatalogue}
          />
        </Row>
      </Col>
    )
  }
}

// Vista previa del formulario
export const PreviewForm = ({ formIdentifier, formDescription, steps, schemaState, setSchemaState, formData, setFormData, isValid, setIsValid, showButtons=true }) => {

  const [activeStep, setActiveStep] = useState(0);
  
  const handleSubmit = async() => {
    let isValidForm = true;
    for (const step of isValid) {
      for (const inp of step) {
        if (Array.isArray(inp) && inp.length>0) {
          console.log(inp)
          isValidForm = false;
        }
      }
    }
    if (isValidForm) {
      // Todo: Hacer la conversion a objeto de los steps
      let formAnswers = {};
      for (const [idx, step] of steps.entries()) {
        formAnswers[step.name] = formData[idx];
      }
      const objToSend = {
        folio: "FOL-2022-08-30--10-13-09",
        tracking_code: "REP-02200--2-38",
        metadata: formAnswers,
        attachments_id: [
          "ATL09Ue2HGdd21Z1oZ22088m12018O0653",
          "ATLnw42620j3T7f60u27A1y0gI19211r99",
          "ATI8215MSd6db42JP321i240920l00Y16W",
          "AT03MR311094e104g01m0P6XOD29P222QP"
        ]
      };
      
      // Todo: Hacer la subida de los datos
      try {
        console.log(objToSend)
        const resp = await createReport(objToSend);
        console.log(resp);
      } catch (error) {
        console.log(error)
      }
    } else {
      console.log("El formulario no es válido");
    }
  }

  const handlePrintFormData = () => {
    let formAnswers = {};
    for (const [idx, step] of steps.entries()) {
      formAnswers[step.name] = formData[idx];
    }
    const objToSend = {
      metadata: formAnswers
    };
    console.log(objToSend);
  }

  const hdlChg = (e,idx) => {
    if (e.target.type==="checkbox") {
      setFormData(formData.map((item,index)=>index===activeStep
        ? item.map((item2,index2)=>index2===idx
            ? { ...item2, [e.target.name]: e.target.checked }
            : item2
          )
      : item))
    } else if (e.target.type==="file") {
      setFormData(formData.map((item,index)=>index===activeStep
        ? item.map((item2,index2)=>index2===idx
            ? { ...item2, [e.target.name]: e.target.files }
            : item2
          )
      : item))
    } else if (typeof e.target?.type === 'string' && e.target.type.includes("date-range")) {
      if (e.target.type.includes("start")) {
        setFormData(formData.map((item,index)=>index===activeStep
        ? item.map((item2,index2)=>{
          if (index2===idx) {
            let dates = item2[e.target.name];
            dates = dates.split("__");
            if (dates.length===2) {
              dates[0] = e.target.value.toJSON();
              dates = dates.join("__");
              return { ...item2, [e.target.name]: dates };
            } 
            return item2;
          } 
          return item2;
        })
        : item))
      } else if (e.target.type.includes("end")) {
        setFormData(formData.map((item,index)=>index===activeStep
        ? item.map((item2,index2)=>{
          if (index2===idx) {
            let dates = item2[e.target.name];
            dates = dates.split("__");
            if (dates.length===2) {
              dates[1] = e.target.value.toJSON()
              dates = dates.join("__");
              return { ...item2, [e.target.name]: dates };
            } 
            return item2;
          } 
          return item2;
        })
        : item))
      }
    } else {
      setFormData(formData.map((item,index)=>index===activeStep
        ? item.map((item2,index2)=>index2===idx
            ? { ...item2, [e.target.name]: e.target.value }
            : item2
          )
      : item))
    }
  }

  const hdlSchm = ({ action, path, idx, children, selected }) => {
    const newSchema = _.cloneDeep( schemaState );
    if (action==="selection") {
      _.unset( newSchema, `${activeStep}.${idx}.${path}next` );
      _.set( newSchema, `${activeStep}.${idx}.${path}selected`, selected );
      _.set( newSchema, `${activeStep}.${idx}.${path}next.children`, children );
      _.set( newSchema, `${activeStep}.${idx}.${path}next.selected`, "" );
    }
    if (action==="nullSelection") {
      _.set( newSchema, `${activeStep}.${idx}.${path}selected`, "" );
      _.unset( newSchema, `${activeStep}.${idx}.${path}next`, "" );
    }
    if (action==="noNextPath") {
      _.set( newSchema, `${activeStep}.${idx}.${path}selected`, selected );
      _.unset( newSchema, `${activeStep}.${idx}.${path}next` );
    }
    setSchemaState(newSchema);
  }
  
  const hdlIsVal = (valid,idx) => {
    setIsValid(isValid.map((item,index)=>index===activeStep
      ? item.map((item2,index2)=>index2===idx
          ? valid
          : item2
        )
    : item))
  }

  const hdlActStp = (step) => {
    setActiveStep(step);
  };

  return (
    <>
      <div className={`form-preview`} onSubmit={(e)=>handleSubmit(e)}>
        <div className="form-preview-header">
          <div className="form-preview-header-name">
            <h3>{steps[activeStep].title||"Step sin nombre"}</h3>
            <p>description</p>
          </div>
          <div className="form-preview-header-steper">
            <CDBStepper
              direction="horizontal"
              md="2"
              className="stepWrapper"
              currentStepNumber={0}
              stepColor=""
              steps={[...steps.map((step, index) => index)]}>
              {schemaState.map((step, index) => (
                <CDBStep
                  key={index}
                  id={index}
                  icon={`stack-${index + 1}x`}
                  name={steps[index]?.title || "Sin Nombre"}
                  handleClick={() => hdlActStp(index)}
                  active={activeStep}
                />
              ))}
            </CDBStepper>
          </div>
        </div>
        <div className="form-preview-inputs">
          <Row>
            {
              schemaState[activeStep].map((sch,idx) => (
                <RenderInput key={`form-input-${idx}`}
                  schema={schemaState[activeStep][idx]}
                  formData={formData[activeStep][idx]}
                  valid={isValid[activeStep][idx]}
                  hdlChg={(e)=>hdlChg(e,idx)}
                  hdlSchm={hdlSchm}
                  hdlIsVal={hdlIsVal}
                  activeStep={activeStep}
                  idx={idx}
                />
              ))
            }
          </Row>
        </div>
      </div>
      <pre>
        {/* {JSON.stringify(schemaState,null,2)} */}
        {/* {JSON.stringify(formData,null,2)} */}
        {/* {JSON.stringify(isValid,null,2)} */}
      </pre>
      {
        showButtons &&
          <div>
            {
              activeStep!==0 && 
                <Button className='mt-4 mr-1' onClick={()=>setActiveStep((active)=>active-1)}>Back</Button>
            }
            {
              activeStep===steps.length-1
              ? <>
                  <Button className='mt-4 mr-1' onClick={handlePrintFormData}>Print form data</Button>
                  <Button className='mt-4 mr-1' variant="success" onClick={handleSubmit}>Send</Button>
                </>
              : <Button className='mt-4' onClick={()=>setActiveStep((active)=>active+1)}>Next</Button>
            }
          </div>
      }
    </>
  )
}