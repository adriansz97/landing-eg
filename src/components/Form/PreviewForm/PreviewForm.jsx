import { useEffect, useRef, useState } from "react";
import _ from "lodash";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';
import { Col, Row, Button } from "react-bootstrap";
import { CDBStep, CDBStepper } from "cdbreact";
import { createAttachment, createReport } from "../../../apis";
import Icon from "../../Icon/Icon";
import { CatalogueInput } from './CatalogueInput'
import { ConditionalInputs } from './ConditionalInputs'
import './styles.scss'

export const hdlSchm = ({ action, path, children, selected, pathSchema, inputs, entireSchema, setSchemaState}) => {
  const newSchema = _.cloneDeep(entireSchema);
  if (action==="selection") {
    _.unset( newSchema, `${pathSchema}.${path}next` );
    _.set( newSchema, `${pathSchema}.${path}selected`, selected );
    _.set( newSchema, `${pathSchema}.${path}next.children`, children );
    _.set( newSchema, `${pathSchema}.${path}next.selected`, "" );
    _.set( newSchema, `${pathSchema}.${path}lastChild`, false );
  }
  if (action==="nullSelection") {
    _.set( newSchema, `${pathSchema}.${path}selected`, "" );
    _.set( newSchema, `${pathSchema}.${path}lastChild`, false );
    _.unset( newSchema, `${pathSchema}.${path}next`, "" );
  }
  if (action==="noNextPath") {
    _.set( newSchema, `${pathSchema}.${path}selected`, selected );
    _.set( newSchema, `${pathSchema}.${path}lastChild`, true );
    _.unset( newSchema, `${pathSchema}.${path}next` );
  }
  if (action==="resetInputs") {
    _.set( newSchema, `${pathSchema}`, inputs );
    // console.log({ pathSchema: `${pathSchema}.nestChildren`, inputs });
  }
  setSchemaState(newSchema);
}

export const hdlChg = ({ e, entirePathData, entirePathDataWithKey, params, entireFormData, setFormData }) => {
  const newFromData = _.cloneDeep(entireFormData);
  if (e.target.type==="checkbox") {
    _.set(newFromData, entirePathDataWithKey, e.target.checked);
  } else if (e.target.type==="file") {
    _.set(newFromData, entirePathDataWithKey, e.target.files);
  } else if (typeof e.target?.type === 'string' && e.target.type.includes("date-range")) {
    if (e.target.type.includes("start")) {
      let dates = _.get(newFromData, entirePathDataWithKey);
      dates = dates.split("__");
      if (dates.length===2) {
        dates[0] = e.target.value.toJSON();
        dates = dates.join("__");
        _.set(newFromData, entirePathDataWithKey, e.target.value);
      } 
    } else if (e.target.type.includes("end")) {
      let dates = _.get(newFromData, entirePathDataWithKey);
      dates = dates.split("__");
      if (dates.length===2) {
        dates[1] = e.target.value.toJSON();
        dates = dates.join("__");
        _.set(newFromData, entirePathDataWithKey, e.target.value);
      } 
    }
  } else if ( params && "catalogue" in params && "isOwn" in params ) {
    _.set(newFromData, entirePathData, {...params});
    _.set(newFromData, `${entirePathData}.${params.catalogue}`, e.target.value);
  } else if ( params && "conditionals" in params ) {
    _.set(newFromData, `${entirePathData}.conditionals`, params.conditionals);
  } else {
    _.set(newFromData, entirePathData, {...params});
    _.set(newFromData, entirePathDataWithKey, e.target.value);
  }
  setFormData(newFromData);
}

export const hdlIsVal = ({ errors, entirePathDataWithKey, entireIsValid, setIsValid }) => {
  const newIsValid = _.cloneDeep(entireIsValid);
  _.set(newIsValid, `${entirePathDataWithKey}`, errors);
  setIsValid(newIsValid);
}

// Render de cada uno de los inputs en el schema
export const RenderInput = ({ 
  entireSchema,
  entireFormData,
  entireIsValid,
  entirePathSchema,
  entirePathData,
  attachments,
  setAttachments,
  tryToNext,
  activeStep,
  idx,
  land,
  colsLg=4,
  setSchemaState,
  setFormData,
  setIsValid
}) => {

  const schema = _.get(entireSchema, entirePathSchema);
  const key = schema.type.includes("catalog") ? schema.catalogue : schema.key;
  const inputAttachment = useRef(null);

  const entirePathDataWithKey = `${entirePathData}.${key}`;
  const value = _.get(entireFormData, entirePathDataWithKey);
  const valid = _.get(entireIsValid, entirePathDataWithKey);
  const tryNext = _.get(tryToNext, activeStep);

  const utilHdlChg = { entireFormData, entirePathData, entirePathDataWithKey, setFormData };

  const doValidate = (test) => {
    let errors = [];
    if (schema.type === "string") {
      if (schema.required===true) {
        if (test.trim()==="") {
          errors.push("Este campo es requerido")
        }
      }
    }
    if (schema.type === "number") {
      const tempNum = Number(test);
      if (schema.required===true) {
        if (test==="") {
          errors.push("Este campo es requerido")
          console.log(test)
        } else if (isNaN(tempNum)) {
          errors.push("No es un numero válido");
        } else if (tempNum<0) {
          errors.push("No deberia ser menor a cero");
        }
      } else {
        if (isNaN(tempNum)) {
          errors.push("No es un numero válido");
        } else if (tempNum<0) {
          errors.push("No deberia ser menor a cero");
        }
      }
    }
    if (schema.type === "textarea") {
      if (schema.required===true) {
        if (test.trim()==="") {
          errors.push("Este campo es requerido")
        }
      }
    }
    if (schema.type.includes("checkbox")) {
      if (!typeof test === "boolean") {
        errors.push("Este campo no es válido (reportar)")
      }
    }
    if (schema.type === "file") {
      if (schema.required===true) {
        if (test===null) {
          errors.push("Este campo debe de llevar un archivo")
        }
      }
    }
    if (schema.type === "date") {
      if (!isValidDate()) {
        errors.push("Fecha no válida (reportar)")
      }
    }
    if (schema.type === "date-range") {
      let dates = test;
      dates = dates.split("__");
      if (dates.length === 2) {
        if (!isValidDate("start")) {
          errors.push("Fecha inicial no válida (reportar)")
        }
        if (!isValidDate("end")) {
          errors.push("Fecha final no válida (reportar)")
        }
      } else {
        errors.push("Campo no válido (reportar)")
      }
    }
    if (schema.type === "subject") {
      if (schema.required===true) {
        if (test.trim()==="") {
          errors.push("Este campo es requerido")
        }
      }
    }
    if (schema.type === "description") {
      if (schema.required===true) {
        if (test.trim()==="") {
          errors.push("Este campo es requerido")
        }
      }
    }
    if (schema.type.includes("catalog")) {
      if (schema.required) {
        if (!test) {
          errors.push("El catalogo debe estar completo");
        }
      }
    }
    return errors;
  };
  
  const handleChange = (e) => {
    hdlChg({ e, params: { sensitive: schema.sensitive }, ...utilHdlChg })
    const errors = doValidate(e.target.value);
    if ((typeof schema.type === 'string') && !(schema.type.includes('catalog'))) {
      hdlIsVal({errors, entirePathDataWithKey, entireIsValid, setIsValid});
    }
  };
  
  const handleValidate = (validCat) => {
    const errors = doValidate(validCat);
    hdlIsVal({errors, entirePathDataWithKey, entireIsValid, setIsValid});
  };

  const ReturnErrorMesages = () => {
    return (
      <>
        { tryNext && Array.isArray(valid) && valid.length>0 &&
          valid.map((err,idx)=>(
            <div key={idx} className="invalid-msg">
              {err} <br />
            </div>
          ))
        }
      </>
    )
  };

  const returnValidClass = () => {
    if (Array.isArray(valid) && valid.length>0 && tryNext) {
      return "is-invalid"
    }
    return ""
  };

  // FOR ATTACHMENTS
  const hdlAttch = (e) => {
    const formData = new FormData();
    for (let i = 0; i < e.target.files.length; i++) {
      formData.append("attachments", e.target.files[i]);
    } 
    setAttachments(formData)
  };

  const hdlDragOvAttch = (e) => {
    e.preventDefault();
  };

  const hdlDropAttch = (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let i = 0; i < e.dataTransfer.files.length; i++) {
      formData.append("attachments", e.dataTransfer.files[i]);
    }
    setAttachments(formData);
  };

  // FOR DATES
  const isValidDate = (startend) => {
    if (startend) {
      let dates = value;
      dates = dates.split("__");
      if (startend==="start" && dates.length===2) {
        return !isNaN(new Date(dates[0]).getTime());
      } else if (startend==="end" && dates.length===2) {
        return !isNaN(new Date(dates[1]).getTime());
      }
    }
    return !isNaN(new Date(value).getTime());
  };
  const returnDateRange = (startend) => {
    let dates = value;
    dates = dates.split("__");
    if (startend==="start" && dates.length===2) {
      let newDate = new Date(dates[0]);
      return newDate;
    } else if (startend==="end" && dates.length===2) {
      let newDate = new Date(dates[1]);
      return newDate;
    }
    return false;
  };

  if (schema.type === "string") {
    return (
      <Col lg="6" className={`preview-input-container fade-in-image ${!land?"quit-pl":""}`}>
          <label className="w-100">{schema.label}{schema.required?"*":""}</label>
          <div className="preview-input-container-inp">
            <input autoComplete="off" type="text" className={`form-control ${returnValidClass()} w-100`} name={schema.key} defaultValue={value} onChange={handleChange} />
          </div>
          <div className="preview-input-err-msg">
            <ReturnErrorMesages />
          </div>
      </Col>
    )
  }
  if (schema.type === "number") {
    return (
      <Col lg="6" className={`preview-input-container fade-in-image ${!land?"quit-pl":""}`}>
        <label className="w-100">{schema.label}{schema.required?"*":""}</label>
        <div className="preview-input-container-inp">
          <input autoComplete="off" type="number" className={`form-control ${returnValidClass()} w-100`} name={schema.key} defaultValue={value} onChange={handleChange} />
        </div>
        <div className={`preview-input-err-msg ${!land?"quit-pl":""}`}>
          <ReturnErrorMesages />
        </div>
      </Col>
    )
  }
  if (schema.type === "textarea") {
    return (
      <Col lg="6" className={`preview-input-container fade-in-image ${!land?"quit-pl":""}`}>
        <label className="w-100" >{schema.label}{schema.required?"*":""}</label>
        <div className="preview-input-container-inp">
          <textarea autoComplete="off" type="text" className={`form-control ${returnValidClass()} w-100`} name={schema.key} defaultValue={value} onChange={handleChange} ></textarea>
        </div>
        <div className={`preview-input-err-msg ${!land?"quit-pl":""}`}>
          <ReturnErrorMesages />
        </div>
      </Col>
    )
  }
  if (schema.type === "checkbox") {
    return (
      <Col lg="12" className={`preview-input-container fade-in-image ${!land?"quit-pl":""}`}>
        <div className="form-check">
          <input className="form-check-input" type="checkbox" id={`${entirePathDataWithKey}-${idx}`} name={schema.key} defaultChecked={value} value={value} onChange={handleChange} />
          <label className="form-check-label" htmlFor={`${entirePathDataWithKey}-${idx}`}>
            {schema.label}{schema.required?"*":""}
          </label>
        </div>
        <div className={`preview-input-err-msg ${!land?"quit-pl":""}`}>
          <ReturnErrorMesages />
        </div>
      </Col>
    )
  }
  if (schema.type === "checkbox-conditional") {
    return (
      <Col lg="12" className={`preview-input-container fade-in-image ${!land?"quit-pl":""} quit-mb`}>
        <Col lg="12" className={`preview-input-container fade-in-image ${!land?"quit-pl":""}`}>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" name={schema.key} id={schema.key} defaultChecked={value} value={value} onChange={handleChange} />
            <label className="form-check-label" htmlFor={schema.key}>
              {schema.label}{schema.required?"*":""}
            </label>
          </div>
          <div className={`preview-input-err-msg ${!land?"quit-pl":""}`}>
            <ReturnErrorMesages />
          </div>
        </Col>
        <Row className={`${!land?"quit-pl":""}`}>
          <ConditionalInputs 
            parentValue={value}
            conditionals={schema.conditionals}
            pathData={entirePathDataWithKey}
            entireSchema={entireSchema}
            entireFormData={entireFormData}
            entireIsValid={entireIsValid}
            entirePathSchema={entirePathSchema}
            entirePathData={entirePathData}
            attachments={attachments}
            setAttachments={setAttachments}
            tryToNext={tryToNext}
            activeStep={activeStep}
            land={land}
            setSchemaState={setSchemaState}
            setFormData={setFormData}
            setIsValid={setIsValid}
          />
        </Row>
      </Col>
    )
  }
  if (schema.type === "file") {
    return (
      <Col lg="12" className={`preview-input-container fade-in-image ${!land?"quit-pl":""}`} onDrop={hdlDropAttch} onDragOver={hdlDragOvAttch}>
        <label className="form-check-label">
          {schema.label}
        </label>
        <div className="attachments pointer" onClick={()=>inputAttachment.current.click()} >

          <div className="attachments-icon-container">
            <Icon name="gallery" />
            <Icon name="outline_clipboard_text" />
            <Icon name="volume_high" />
            <Icon name="outline_video" />
            <Icon name="outline_document" />
          </div>
          
          <div className="attachments-instructions">
            <p>Arrastre sus archivos</p>
            <button className="btn attachments-btn">O haga click aquí</button>
          </div>

        </div>
        <input className={`form-control ${returnValidClass()} w-100`} name={schema.key} type="file" onChange={hdlAttch} multiple hidden ref={inputAttachment} />
        <div className={`preview-input-err-msg ${!land?"quit-pl":""}`}>
          {
            attachments !== null &&
            [...attachments.entries()].map((item,idx) => {
              return <li key={idx}>{item[1].name}</li>
            })
          }
        </div>
        <div className={`preview-input-err-msg ${!land?"quit-pl":""}`}>
          <ReturnErrorMesages />
        </div>
      </Col>
    )
  }
  if (schema.type === "date") {
    const initialDate = new Date();
    return (
      <Col lg="6" className={`preview-input-container fade-in-image ${!land?"quit-pl":""}`}>
        <div>
          <label>
            {schema.label}{schema.required?"*":""}
          </label>
          <div className="preview-input-container-inp">
            <DatePicker
              className={`form-control ${returnValidClass()} w-100`}
              selected={ isValidDate() ? value : initialDate }
              onChange={(value)=>hdlChg({e:{target:{name: schema.key, value, type: "date"}}, ...utilHdlChg})}
            />
          </div>
        </div>
        <div className={`preview-input-err-msg ${!land?"quit-pl":""}`}>
          <ReturnErrorMesages />
        </div>
      </Col>
    )
  }
  if (schema.type === "date-range") {
    const initialDate = new Date();
    return (
      <Col lg="12" className="preview-input-container fade-in-image">
        <div>
          <label>
            {schema.label}{schema.required?"*":""}
          </label>
          <Row>
            <Col md="6">
              <label>Fecha inicial</label>
              <div className="preview-input-container-inp">
                <DatePicker
                  className={`form-control ${returnValidClass()} w-100`}
                  selected={isValidDate("start")?returnDateRange("start"):initialDate}
                  onChange={(value)=>hdlChg({e:{target:{name: schema.key, value, type: "date-range-start"}}, ...utilHdlChg})}
                />
              </div>
            </Col>
            <Col md="6">
              <label>Fecha final</label>
              <div className="preview-input-container-inp">
                <DatePicker 
                  className={`form-control ${returnValidClass()} w-100`}
                  selected={ isValidDate("end")?returnDateRange("end"):initialDate}
                  onChange={(value)=>hdlChg({e:{target:{name: schema.key, value, type: "date-range-end"}}, ...utilHdlChg})}
                />
              </div>
            </Col>
          </Row>
        </div>
      </Col>
    )
  }
  if (schema.type === "subject") {
    return (
      <Col lg="6" className={`preview-input-container fade-in-image ${!land?"quit-pl":""}`}>
          <label className="w-100">{schema.label}{schema.required?"*":""}</label>
          <div className="preview-input-container-inp">
            <input autoComplete="off" type="text" className={`form-control ${returnValidClass()} w-100`} name={schema.key} defaultValue={value} onChange={handleChange} />
          </div>
          <div className={`preview-input-err-msg ${!land?"quit-pl":""}`}>
            <ReturnErrorMesages />
          </div>
      </Col>
    )
  }
  if (schema.type === "description") {
    return (
      <Col lg="6" className={`preview-input-container fade-in-image ${!land?"quit-pl":""}`}>
        <label className="w-100" >{schema.label}{schema.required?"*":""}</label>
        <div className="preview-input-container-inp">
          <textarea autoComplete="off" type="text" className={`form-control ${returnValidClass()} w-100`} name={schema.key} defaultValue={value} onChange={handleChange} ></textarea>
        </div>
        <div className={`preview-input-err-msg ${!land?"quit-pl":""}`}>
          <ReturnErrorMesages />
        </div>
      </Col>
    )
  }
  if (schema.type === "catalog-select" || schema.type === "catalog-radio") {
    return (
      <Col md="12" className={`${!land?"quit-pl":""}`}>
        <label>{schema.label}{schema.required?"*":""}</label>
        <Row>
          <CatalogueInput 
            schema={schema}
            scope={schema}
            valid={valid}
            value={value}
            idx={idx}
            handleValidate={handleValidate}
            returnValidClass={returnValidClass}
            ReturnErrorMesages={ReturnErrorMesages}
            pathSchema={entirePathSchema}
            pathData={entirePathData}
            entirePathDataWithKey={entirePathDataWithKey}
            land={land}
            colsLg={colsLg}
            entireSchema={entireSchema}
            entireFormData={entireFormData}
            setSchemaState={setSchemaState}
            setFormData={setFormData}
          />
          <div className={`preview-input-err-msg ${!land?"quit-pl":""}`}>
            <ReturnErrorMesages />
          </div>
        </Row>
      </Col>
    )
  }
  if (schema.type === "catalog-select-conditional") {
    return (
      <Col md="12" className={`${!land?"quit-pl":""} quit-mb`}>
        <label>{schema.label}{schema.required?"*":""}</label>
        <Row>
          <Col md="12" className={`${!land?"quit-pl":""}`}>
            <CatalogueInput 
              schema={schema}
              scope={schema}
              valid={valid}
              value={value}
              idx={idx}
              handleValidate={handleValidate}
              returnValidClass={returnValidClass}
              ReturnErrorMesages={ReturnErrorMesages}
              pathSchema={entirePathSchema}
              pathData={entirePathData}
              entirePathDataWithKey={entirePathDataWithKey}
              land={land}
              colsLg={colsLg}
              entireSchema={entireSchema}
              entireFormData={entireFormData}
              setSchemaState={setSchemaState}
              setFormData={setFormData}
            />
            <div className="preview-input-err-msg">
              <ReturnErrorMesages />
            </div>
          </Col>
          <Row className={`${!land?"quit-pl":""}`}>
            <ConditionalInputs 
              parentValue={value}
              conditionals={schema.conditionals}
              pathData={entirePathDataWithKey}
              entireSchema={entireSchema}
              entireFormData={entireFormData}
              entireIsValid={entireIsValid}
              entirePathSchema={entirePathSchema}
              entirePathData={entirePathData}
              attachments={attachments}
              setAttachments={setAttachments}
              tryToNext={tryToNext}
              activeStep={activeStep}
              land={land}
              colsLg={12}
              setSchemaState={setSchemaState}
              setFormData={setFormData}
              setIsValid={setIsValid}
            />
          </Row>
        </Row>
      </Col>
    )
  }
  if (schema.type === "catalog-error") {
    return (
      <></>
    )
  }
}

// Vista previa del formulario
export const PreviewForm = ({ 
  formIdentifier,
  steps,
  schemaState,
  formData,
  isValid,
  setSchemaState,
  setFormData,
  setIsValid,
  showButtons=true,
  stepClick=false,
  land=false
}) => {

  const refContainer = useRef(null);

  const [activeStep, setActiveStep] = useState(0);
  const [rerender, setRerender] = useState(false);
  const [allowStepClick, setAllowStepClick] = useState(stepClick);
  const [tryToNext, setTryToNext] = useState(null);
  const [attachments, setAttachments] = useState(null);

  useEffect(() => {
    if (refContainer.current) {
      const ps = new PerfectScrollbar(refContainer.current, {
        wheelSpeed: .4,
        minScrollbarLength: 20,
        suppressScrollX: true,
        swipeEasing: 'ease-in-out'
      });
    }
  }, [refContainer.current]);

  useEffect(() => {
    setRerender(true);
  }, [activeStep]);

  useEffect(() => {
    if (rerender) {
      setRerender(false);
    }
  }, [rerender]);

  useEffect(() => {
    const newTryToNext = steps.map(item=>false);
    setTryToNext(newTryToNext);
  }, [steps]);
  
  const handleSubmit = async() => {
    let isValidForm = hdlValidStep({ lastStep: true });
    if (!(isValidForm===false)) {
      try {
        let formAnswers = {};
        var attachments_id = [];
        if (attachments) {
          const attachmentsRes = await createAttachment(attachments);
          attachments_id = attachmentsRes.attachments_id;
        }
        for (const [idx, step] of steps.entries()) {
          formAnswers[step.name] = formData[idx];
        }
        const objToSend = {
          folio: "FOL-2022-08-30--10-13-09",
          tracking_code: "REP-02200--2-38",
          metadata: formAnswers,
          attachments_id
        };
        console.log(objToSend);
        const resp = await createReport(objToSend);
        Swal.fire({
          title: 'Reporte enviado con exito',
          text: `Su codigo de rastreo es: ${resp.tracking_code}`,
          icon: 'success',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonText: 'Ok',
          confirmButtonText: 'Send to my email'
        }).then((result) => {
          // if (result.isConfirmed) {
          //   Swal.fire(
          //     'Deleted!',
          //     'Your file has been deleted.',
          //     'success'
          //   )
          // }
        })
        // console.log(resp);
      } catch (error) {
        Swal.fire( 'Error', 'An error has occurred while sending the form', 'error');
        console.log(error);
      }
    } else {
      setAllowStepClick(true);
    }
  }

  const hdlActStp = (step) => {
    setActiveStep(step);
  };

  const hdlValidStep = ({ lastStep }) => {
  
    const validForNextStep = (item, pathSchema, pathData, nestNum = 0) => {
      let key = _.get(schemaState, `${activeStep}.${pathSchema}`);
      key = key.type.includes("catalog") ? key.catalogue : key.key;

      if (item[key].length>0) return false;

      if ("conditionals" in item) {
        const parentValue = _.get(formData, `${activeStep}.${pathData}.${key}`);
        const conditionals = _.get(schemaState, `${activeStep}.${pathSchema}.conditionals`);
        const nextValid = conditionals.find(item2=>item2.caseOf===parentValue);
        const nextValidIdx = conditionals.findIndex(item2=>item2.caseOf===parentValue);

        if (nextValid) {
          const validConditionals = item.conditionals.map((item2, idx2)=> {
            return validForNextStep(
              item2, 
              `${pathSchema}.conditionals.${nextValidIdx}.nestChildren.${idx2}`,
              `${pathData}.conditionals`,
              nestNum = nestNum + 1
            )
          })
          if (validConditionals.includes(false)) return false;
        }
      }
    }

    const isValidStep = isValid[activeStep].map((item, idx)=> {
      const validatedStep = validForNextStep(item, `${idx}`, `${idx}`);
      return validatedStep;
    })

    setTryToNext(tryToNext.map((item,idx)=>idx===activeStep ? true : item));

    // Siguiente step en caso de que no sea el ultimo
    if (!isValidStep.includes(false)) {
      if (!lastStep) {
        hdlActStp(activeStep+1);
      }
    } else {
      if (lastStep) {
        return false;
      }
    }

  }

  return (
    <>
      <div className={`form-preview`} onSubmit={(e)=>handleSubmit(e)}>
        <div className="form-preview-header">
          <div className="form-preview-header-name">
            <h3>{steps[activeStep].title||"Step sin nombre"}</h3>
            {/* <p>Description</p> */}
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
                  handleClick={allowStepClick?()=>hdlActStp(index):()=>{}}
                  active={activeStep}
                />
              ))}
            </CDBStepper>
          </div>
        </div>
        {
          !rerender && schemaState &&
          <div className="form-preview-inputs" ref={refContainer} style={{height: land && 480, marginBottom: land && 16}}>
            <Row className="pr-3 pl-1">
              {
                schemaState[activeStep].map((sch,idx) => (
                  <RenderInput 
                    key={`form-input-${idx}`}
                    entireSchema={schemaState}
                    entireFormData={formData}
                    entireIsValid={isValid}
                    entirePathSchema={`${activeStep}.${idx}`}
                    entirePathData={`${activeStep}.${idx}`}
                    setSchemaState={setSchemaState}
                    setFormData={setFormData}
                    setIsValid={setIsValid}
                    tryToNext={tryToNext}
                    activeStep={activeStep}
                    idx={idx}
                    land={land}
                    attachments={attachments}
                    setAttachments={setAttachments}
                  />
                ))
              }
            </Row>
          </div>
        }
      </div>
      {
        showButtons &&
          <div className="form-buttons">
            <pre>
              {/* {JSON.stringify(schemaState,null,2)} */}
              {/* {JSON.stringify(formData,null,2)} */}
              {/* {JSON.stringify(isValid,null,2)} */}
              {/* {JSON.stringify(tryToNext,null,2)} */}
            </pre>
            {
              activeStep!==0 && 
                <Button 
                  style={{ backgroundColor: "#009ED7" }}
                  className='btn-form' 
                  onClick={()=>setActiveStep((active)=>active-1)}>
                  Anterior
                </Button>
            }
            {
              activeStep===steps.length-1
              ? <>
                  <Button 
                    style={{ backgroundColor: "#152235" }}
                    className='btn-send' 
                    onClick={handleSubmit}>
                    Enviar
                  </Button>
                </>
              : <Button
                  style={{ backgroundColor: "#009ED7" }}
                  className='btn-form' 
                  onClick={hdlValidStep}>
                  Siguiente
                </Button>
            }
          </div>
      }
    </>
  )
}