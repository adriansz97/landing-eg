import { useEffect, useRef, useState } from "react";
import _ from "lodash";
import Swal from "sweetalert2";
import Container from "react-bootstrap/Container";
import { Col, Row, Button, Tab, Nav } from "react-bootstrap";
import { CDBStep, CDBStepper } from "cdbreact";
import { createAttachment, createReport } from "../../../apis";
import { MCInput } from "../../MainComponents/Input/Input";
import Icon from "../../Icon/Icon";
import { CatalogueInput } from "./CatalogueInput"
import { ConditionalInputs } from "./ConditionalInputs"
import { CATALOGUES_PREFIX, INPUT_TYPE_CATALOGUE_ERROR, INPUT_TYPE_CATALOGUE_RADIO, INPUT_TYPE_CATALOGUE_RADIO_CONDITIONAL, INPUT_TYPE_CATALOGUE_RADIO_DESCRIPTION, INPUT_TYPE_CATALOGUE_RADIO_DESCRIPTION_CONDITIONAL, INPUT_TYPE_CATALOGUE_SELECT, INPUT_TYPE_CATALOGUE_SELECT_CONDITIONAL, INPUT_TYPE_CHECKBOX, INPUT_TYPE_CHECKBOX_CONDITIONAL, INPUT_TYPE_DATE, INPUT_TYPE_DATE_RANGE, INPUT_TYPE_DESCRIPTION, INPUT_TYPE_FILE, INPUT_TYPE_NUMBER, INPUT_TYPE_SUBJECT, INPUT_TYPE_TEXT, INPUT_TYPE_TEXTAREA } from "../consts";
import "./styles.scss"


export const hdlSchm = ({ action, path, children, selected, pathSchema, inputs, entireSchema, setSchemaState }) => {
  const newSchema = _.cloneDeep(entireSchema);
  if (action === "selection") {
    _.unset(newSchema, `${pathSchema}.${path}next`);
    _.set(newSchema, `${pathSchema}.${path}lastChild`, false);
    _.set(newSchema, `${pathSchema}.${path}selected`, selected);
    _.set(newSchema, `${pathSchema}.${path}next.children`, children);
    _.set(newSchema, `${pathSchema}.${path}next.selected`, "");
    _.set(newSchema, `${pathSchema}.${path}next.lastChild`, true);
  }
  if (action === "nullSelection") {
    _.set(newSchema, `${pathSchema}.${path}selected`, "");
    _.set(newSchema, `${pathSchema}.${path}lastChild`, false);
    _.unset(newSchema, `${pathSchema}.${path}next`, "");
  }
  if (action === "noNextPath") {
    _.set(newSchema, `${pathSchema}.${path}selected`, selected);
    _.set(newSchema, `${pathSchema}.${path}lastChild`, true);
    _.unset(newSchema, `${pathSchema}.${path}next`);
  }
  if (action === "resetInputs") {
    _.set(newSchema, `${pathSchema}`, inputs);
    // console.log({ pathSchema: `${pathSchema}.nestChildren`, inputs });
  }
  setSchemaState(newSchema);
}

export const hdlChg = ({ e, entirePathData, entirePathDataWithKey, params, entireFormData, setFormData }) => {
  const newFromData = _.cloneDeep(entireFormData);
  if (e.target.type === "checkbox") {
    _.set(newFromData, entirePathDataWithKey, e.target.checked);
  } else if (e.target.type === "file") {
    _.set(newFromData, entirePathDataWithKey, e.target.files);
  } else if (typeof e.target?.type === 'string' && e.target.type.includes("date-range")) {
    if (e.target.type.includes("start")) {
      let dates = _.get(newFromData, entirePathDataWithKey);
      dates = dates.split("__");
      if (dates.length === 2) {
        dates[0] = e.target.value.toJSON();
        dates = dates.join("__");
        _.set(newFromData, entirePathDataWithKey, dates);
      }
    } else if (e.target.type.includes("end")) {
      let dates = _.get(newFromData, entirePathDataWithKey);
      dates = dates.split("__");
      if (dates.length === 2) {
        dates[1] = e.target.value.toJSON();
        dates = dates.join("__");
        _.set(newFromData, entirePathDataWithKey, dates);
      }
    }
  } else if (params && "catalogue" in params && "isOwn" in params) {
    if ("conditionals" in params) {
      const temp = _.get(newFromData, entirePathData);
      _.set(newFromData, entirePathData, { ...params, conditionals: temp?.conditionals || [] });
    } else {
      _.set(newFromData, entirePathData, { ...params });
    }
    _.set(newFromData, `${entirePathData}.${params.catalogue}`, e.target.value);
  } else if (params && "conditionals" in params) {
    _.set(newFromData, `${entirePathData}.conditionals`, params.conditionals);
  } else {
    _.set(newFromData, entirePathData, { ...params });
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
  entirePathSchema,
  setSchemaState,
  entireFormData,
  entirePathData,
  setFormData,
  entireIsValid,
  setIsValid,
  attachments,
  setAttachments,
  tryToNext,
  activeStep,
  origin,
}) => {

  const schema = _.get(entireSchema, entirePathSchema);
  const key = schema.type.includes(CATALOGUES_PREFIX) ? schema.catalogue : schema.key;
  
  const entirePathDataWithKey = `${entirePathData}.${key}`;
  const value = _.get(entireFormData, entirePathDataWithKey);
  const valid = _.get(entireIsValid, entirePathDataWithKey);
  const tryNext = _.get(tryToNext, activeStep);
  
  const utilHdlChg = { entireFormData, entirePathData, entirePathDataWithKey, setFormData };
  
  const inputAttachment = useRef(null);

  const doValidate = (test) => {
    let errors = [];
    if (schema.type === INPUT_TYPE_TEXT) {
      if (schema.required === true) {
        if (test.trim() === "") {
          errors.push("Este campo es requerido")
        }
      }
    }
    if (schema.type === INPUT_TYPE_NUMBER) {
      const tempNum = Number(test);
      if (schema.required === true) {
        if (test === "") {
          errors.push("Este campo es requerido")
        } else if (isNaN(tempNum)) {
          errors.push("No es un numero válido");
        } else if (tempNum < 0) {
          errors.push("No deberia ser menor a cero");
        }
      } else {
        if (isNaN(tempNum)) {
          errors.push("No es un numero válido");
        } else if (tempNum < 0) {
          errors.push("No deberia ser menor a cero");
        }
      }
    }
    if (schema.type === INPUT_TYPE_TEXTAREA) {
      if (schema.required === true) {
        if (test.trim() === "") {
          errors.push("Este campo es requerido")
        }
      }
    }
    if (schema.type.includes(INPUT_TYPE_CHECKBOX)) {
      if (schema.required === true) {
        if (test === false) {
          errors.push("Asegurese de marcar esta casilla")
        }
      }
    }
    if (schema.type === INPUT_TYPE_FILE) {
      if (schema.required === true) {
        if (test === null) {
          errors.push("Este campo debe de llevar un archivo")
        }
      }
    }
    if (schema.type === INPUT_TYPE_DATE) {
      if (!isValidDate()) {
        errors.push("Fecha no válida (reportar)")
      }
    }
    if (schema.type === INPUT_TYPE_DATE_RANGE) {
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
    if (schema.type === INPUT_TYPE_SUBJECT) {
      if (schema.required === true) {
        if (test.trim() === "") {
          errors.push("Este campo es requerido")
        }
      }
    }
    if (schema.type === INPUT_TYPE_DESCRIPTION) {
      if (schema.required === true) {
        if (test.trim() === "") {
          errors.push("Este campo es requerido")
        }
      }
    }
    if (schema.type.includes(CATALOGUES_PREFIX)) {
      if (schema.catalogue==="RC-100") {
        // console.log(schema)
        // console.log(test)
      }
      if (schema.required) {
        if (!test) {
          errors.push("Este campo es requerido");
        }
      }
    }
    return errors;
  };

  const handleChange = (e) => {
    hdlChg({ e, params: { sensitive: schema.sensitive, origin }, ...utilHdlChg })
    const value = schema.type.includes(INPUT_TYPE_CHECKBOX) ? e.target.checked : e.target.value
    const errors = doValidate(value);
    if ((typeof schema.type.includes(INPUT_TYPE_CHECKBOX)) && !(schema.type.includes(CATALOGUES_PREFIX))) {
      hdlIsVal({ errors, entirePathDataWithKey, entireIsValid, setIsValid });
    }
  };

  const handleValidate = (validCat) => {
    const errors = doValidate(validCat);
    hdlIsVal({ errors, entirePathDataWithKey, entireIsValid, setIsValid });
  };

  const ReturnErrorMesages = () => {
    return (
      <>
        {tryNext && Array.isArray(valid) && valid.length > 0 &&
          valid.map((err, idx) => (
            <div key={idx} className="invalid-msg">
              {err} <br />
            </div>
          ))
        }
      </>
    )
  };

  const returnValidClass = (type) => {
    if (Array.isArray(valid) && valid.length > 0 && tryNext && type === "container") {
      return "is-invalid-container"
    }
    if (Array.isArray(valid) && valid.length > 0 && tryNext) {
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
      console.log(value);
      dates = dates.split("__");
      if (startend === "start" && dates.length === 2) {
        return !isNaN(new Date(dates[0]).getTime());
      } else if (startend === "end" && dates.length === 2) {
        return !isNaN(new Date(dates[1]).getTime());
      }
    }
    return !isNaN(new Date(value).getTime());
  };
  const returnDateRange = (startend) => {
    let dates = value;
    dates = dates.split("__");
    if (startend === "start" && dates.length === 2) {
      let newDate = new Date(dates[0]);
      return newDate;
    } else if (startend === "end" && dates.length === 2) {
      let newDate = new Date(dates[1]);
      return newDate;
    }
    return false;
  };

  if (schema.type === INPUT_TYPE_TEXT) {
    return (
      <Col lg={schema.grid || 12} className={`preview-input-container`}>
        <label className={`${schema.required?"label-required":""}`}>{schema.label}{schema.required ? "*" : ""}</label>
        <div className={`preview-input-container-inp ${returnValidClass("container")}`}>
          <MCInput 
            autoComplete="off"
            type="text"
            className={`${returnValidClass()}`}
            name={schema.key} 
            defaultValue={value}
            onChange={handleChange}
            placeholder={schema.placeholder}
          />
        </div>
        <div className="preview-input-err-msg">
          <ReturnErrorMesages />
        </div>
      </Col>
    )
  }
  if (schema.type === INPUT_TYPE_NUMBER) {
    return (
      <Col lg={schema.grid || 12} className={`preview-input-container`}>
        <label className={`${schema.required?"label-required":""}`}>{schema.label}{schema.required ? "*" : ""}</label>
        <div className={`preview-input-container-inp ${returnValidClass("container")}`}>
          <MCInput 
            autoComplete="off"
            type="number"
            className={`${returnValidClass()}`}
            name={schema.key}
            defaultValue={value}
            onChange={handleChange}
            placeholder={schema.placeholder}
          />
        </div>
        <div className={`preview-input-err-msg`}>
          <ReturnErrorMesages />
        </div>
      </Col>
    )
  }
  if (schema.type === INPUT_TYPE_TEXTAREA) {
    return (
      <Col lg={schema.grid || 12} className={`preview-input-container`}>
        <label className={`${schema.required?"label-required":""}`} >{schema.label}{schema.required ? "*" : ""}</label>
        <div className={`preview-input-container-inp ${returnValidClass("container")}`}>
          <MCInput 
            type="textarea"
            rows={3}
            autoComplete="off"
            className={`${returnValidClass()}`}
            name={schema.key}
            defaultValue={value}
            onChange={handleChange}
            placeholder={schema.placeholder}
          />
        </div>
        <div className={`preview-input-err-msg`}>
          <ReturnErrorMesages />
        </div>
      </Col>
    )
  }
  if (schema.type === INPUT_TYPE_CHECKBOX) {
    return (
      <Col lg={schema.grid || 12} className={`preview-input-container`}>
        <div className={`form-check ${returnValidClass("container")}`}>
          <input className="form-check-input" type="checkbox" id={origin} name={schema.key} defaultChecked={value} value={value} onChange={handleChange} />
          <label className={`${schema.required?"label-required":""} form-check-label`} htmlFor={origin}>
            {schema.label}{schema.required ? "*" : ""}
          </label>
        </div>
        <div className={`preview-input-err-msg`}>
          <ReturnErrorMesages />
        </div>
      </Col>
    )
  }
  if (schema.type === INPUT_TYPE_CHECKBOX_CONDITIONAL) {
    return (
      <>
        <Col lg={schema.grid || 12} className={`preview-input-container`}>
          <div className={`form-check ${returnValidClass("container")}`}>
            <input className="form-check-input" type="checkbox" name={schema.key} id={schema.key} defaultChecked={value} value={value} onChange={handleChange} />
            <label className={`${schema.required?"label-required":""} form-check-label`} htmlFor={schema.key}>
              {schema.label}{schema.required ? "*" : ""}
            </label>
          </div>
          <div className={`preview-input-err-msg`}>
            <ReturnErrorMesages />
          </div>
        </Col>
        <div></div>
        <ConditionalInputs
          entireSchema={entireSchema}
          entirePathSchema={entirePathSchema}
          setSchemaState={setSchemaState}
          entireFormData={entireFormData}
          entirePathData={entirePathData}
          setFormData={setFormData}
          entireIsValid={entireIsValid}
          setIsValid={setIsValid}
          conditionals={schema.conditionals}
          parentValue={value}
          parentOrigin={origin}
          attachments={attachments}
          setAttachments={setAttachments}
          tryToNext={tryToNext}
          activeStep={activeStep}
        />
          <div></div>
      </>
    )
  }
  if (schema.type === INPUT_TYPE_FILE) {
    return (
      <Col lg={schema.grid || 12} className={`preview-input-container`} onDrop={hdlDropAttch} onDragOver={hdlDragOvAttch}>
        <label className={`${schema.required?"label-required":""}`}>
          {schema.label}
        </label>
        <div className="attachments pointer" onClick={() => inputAttachment.current.click()} >

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
        <div className={`preview-input-err-msg`}>
          {
            attachments !== null &&
            [...attachments.entries()].map((item, idx) => {
              return <li key={idx}>{item[1].name}</li>
            })
          }
        </div>
        <div className={`preview-input-err-msg`}>
          <ReturnErrorMesages />
        </div>
      </Col>
    )
  }
  if (schema.type === INPUT_TYPE_DATE) {
    const initialDate = new Date();
    return (
      <Col lg={schema.grid || 12} className={`preview-input-container`}>
        <div className={`${returnValidClass("container")}`}>
          <label className={`${schema.required?"label-required":""}`} >
            {schema.label}{schema.required ? "*" : ""}
          </label>
          <div className="preview-input-container-inp">
            <MCInput 
              type="date" 
              className={`${returnValidClass()}`}
              selected={isValidDate() ? value : initialDate}
              dateFormat="dd/MM/yy"
              onChange={(value) => hdlChg({ e: { target: { name: schema.key, value, type: "date" } }, ...utilHdlChg })}
            />
          </div>
        </div>
        <div className={`preview-input-err-msg`}>
          <ReturnErrorMesages />
        </div>
      </Col>
    )
  }
  if (schema.type === INPUT_TYPE_DATE_RANGE) {
    const initialDate = new Date();
    return (
      <>
        {
          schema.grid !== 12
          ? <>
              <Col lg={schema.grid || 12} className={`preview-input-container`}>
                <label className={`${schema.required?"label-required":""}`}>
                  {schema.label}{schema.required ? "*" : ""} <br />
                  Fecha inicial
                </label>
                <div className="preview-input-container-inp">
                  <MCInput 
                    type="date" 
                    className={`${returnValidClass()}`}
                    selected={isValidDate("start") ? returnDateRange("start") : initialDate}
                    dateFormat="dd/MM/yy"
                    onChange={(value) => hdlChg({ e: { target: { name: schema.key, value, type: "date-range-start" } }, ...utilHdlChg })}
                  />
                </div>
                <div className={`preview-input-err-msg`}>
                  <ReturnErrorMesages />
                </div>
              </Col>
              <Col lg={schema.grid || 12} className={`preview-input-container`}>
                <br />
                <label>Fecha final</label>
                <div className="preview-input-container-inp">
                  <MCInput 
                    type="date" 
                    className={`${returnValidClass()}`}
                    selected={isValidDate("end") ? returnDateRange("end") : initialDate}
                    dateFormat="dd/MM/yy"
                    onChange={(value) => hdlChg({ e: { target: { name: schema.key, value, type: "date-range-end" } }, ...utilHdlChg })}
                  />
                </div>
              </Col>
            </>
          : <Col lg={schema.grid || 12} className="preview-input-container">
              <div className={`${returnValidClass("container")}`}>
                <label className={`${schema.required?"label-required":""}`}>
                  {schema.label}{schema.required ? "*" : ""}
                </label>
                <Row>
                  <Col md="6" className="ps-lg-0">
                    <label>Fecha inicial</label>
                    <div className="preview-input-container-inp">
                    <MCInput 
                      type="date" 
                      className={`${returnValidClass()}`}
                      selected={isValidDate("start") ? returnDateRange("start") : initialDate}
                      dateFormat="dd/MM/yy"
                      onChange={(value) => hdlChg({ e: { target: { name: schema.key, value, type: "date-range-start" } }, ...utilHdlChg })}
                    />
                    </div>
                  </Col>
                  <Col md="6" className="pe-lg-0">
                    <label>Fecha final</label>
                    <div className="preview-input-container-inp">
                    <MCInput 
                      type="date" 
                      className={`${returnValidClass()}`}
                      selected={isValidDate("end") ? returnDateRange("end") : initialDate}
                      dateFormat="dd/MM/yy"
                      onChange={(value) => hdlChg({ e: { target: { name: schema.key, value, type: "date-range-end" } }, ...utilHdlChg })}
                    />
                    </div>
                  </Col>
                </Row>
              </div>
              <div className={`preview-input-err-msg`}>
                <ReturnErrorMesages />
              </div>
            </Col>
        }
      </>
    )
  }
  if (schema.type === INPUT_TYPE_SUBJECT) {
    return (
      <Col lg={schema.grid || 12} className={`preview-input-container`}>
        <label className={`${schema.required?"label-required":""}`}>{schema.label}{schema.required ? "*" : ""}</label>
        <div className={`preview-input-container-inp ${returnValidClass("container")}`}>
          <MCInput 
            autoComplete="off" 
            type="text" 
            className={`${returnValidClass()}`} 
            name={schema.key} 
            defaultValue={value} 
            onChange={handleChange}
            placeholder={schema.placeholder}
          />
        </div>
        <div className={`preview-input-err-msg`}>
          <ReturnErrorMesages />
        </div>
      </Col>
    )
  }
  if (schema.type === INPUT_TYPE_DESCRIPTION) {
    return (
      <Col lg={schema.grid || 12} className={`preview-input-container`}>
        <label className={`${schema.required?"label-required":""}`}>{schema.label}{schema.required ? "*" : ""}</label>
        <div className={`preview-input-container-inp ${returnValidClass("container")}`}>
          <MCInput 
            type="textarea"
            autoComplete="off" 
            className={`${returnValidClass()}`} 
            name={schema.key} 
            defaultValue={value} 
            onChange={handleChange}
            placeholder={schema.placeholder}
          />
        </div>
        <div className={`preview-input-err-msg`}>
          <ReturnErrorMesages />
        </div>
      </Col>
    )
  }
  if (schema.type === INPUT_TYPE_CATALOGUE_SELECT || schema.type === INPUT_TYPE_CATALOGUE_RADIO || schema.type === INPUT_TYPE_CATALOGUE_RADIO_DESCRIPTION) {
    return (
      <>
        <div></div>
        <label className={`${schema.required?"label-required":""} ${schema.type.includes(INPUT_TYPE_CATALOGUE_SELECT)?"m-0":""}`}>{schema.label}{schema.required ? "*" : ""}</label>
        <div className={`catalogue-container p-0 t-col-${schema.grid || 12} ${(schema.type.includes(INPUT_TYPE_CATALOGUE_RADIO)&&schema.grid!==12)?"row-gap":""}`}>
          <CatalogueInput
            schema={schema}
            scope={schema}
            value={value}
            valid={valid}
            origin={origin}
            pathSchema={entirePathSchema}
            pathData={entirePathData}
            entireSchema={entireSchema}
            entireFormData={entireFormData}
            setSchemaState={setSchemaState}
            setFormData={setFormData}
            tryToNext={tryNext}
            handleValidate={handleValidate}
            returnValidClass={returnValidClass}
          />
        </div>
        <div className="preview-input-err-msg">
          <ReturnErrorMesages />
        </div>
        <div></div>
      </>
    )
  }
  if (schema.type === INPUT_TYPE_CATALOGUE_SELECT_CONDITIONAL || schema.type === INPUT_TYPE_CATALOGUE_RADIO_CONDITIONAL || schema.type === INPUT_TYPE_CATALOGUE_RADIO_DESCRIPTION_CONDITIONAL) {
    return (
      <>
        <div></div>
        <label className={`${schema.required?"label-required":""} ${schema.type.includes(INPUT_TYPE_CATALOGUE_SELECT)?"m-0":""}`}>{schema.label}{schema.required ? "*" : ""}</label>
        <div className={`catalogue-container p-0 t-col-${schema.grid || 12}  ${(schema.type.includes(INPUT_TYPE_CATALOGUE_RADIO)&&schema.grid!==12)?"row-gap":""}`}>
        <CatalogueInput
            schema={schema}
            scope={schema}
            value={value}
            valid={valid}
            origin={origin}
            pathSchema={entirePathSchema}
            pathData={entirePathData}
            entireSchema={entireSchema}
            entireFormData={entireFormData}
            setSchemaState={setSchemaState}
            setFormData={setFormData}
            tryToNext={tryNext}
            handleValidate={handleValidate}
            returnValidClass={returnValidClass}
          />
        </div>
        <div className="preview-input-err-msg">
          <ReturnErrorMesages />
        </div>
        <ConditionalInputs
          entireSchema={entireSchema}
          entirePathSchema={entirePathSchema}
          setSchemaState={setSchemaState}
          entireFormData={entireFormData}
          entirePathData={entirePathData}
          setFormData={setFormData}
          entireIsValid={entireIsValid}
          setIsValid={setIsValid}
          conditionals={schema.conditionals}
          parentValue={value}
          parentOrigin={origin}
          attachments={attachments}
          setAttachments={setAttachments}
          tryToNext={tryToNext}
          activeStep={activeStep}
        />
        <div></div>
      </>

    )
  }
  if (schema.type === INPUT_TYPE_CATALOGUE_ERROR) {
    return (
      <></>
    )
  }
}

// Vista previa del formulario
export const PreviewForm = ({
  steps,
  schemaState,
  formData,
  isValid,
  setSchemaState,
  setFormData,
  setIsValid,
  showButtons = true,
  stepClick = false,
}) => {

  const [activeStep, setActiveStep] = useState(0);
  const [allowStepClick, setAllowStepClick] = useState(stepClick);
  const [tryToNext, setTryToNext] = useState(null);
  const [attachments, setAttachments] = useState(null);
  const formRef = useRef(null)

  useEffect(() => {
    const newTryToNext = steps.map(item => false);
    setTryToNext(newTryToNext);
  }, [steps]);

  const handleSubmit = async () => {
    let isValidForm = handleValidStep({ lastStep: true });
    if (!(isValidForm === false)) {
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
        Swal.fire('Error', 'An error has occurred while sending the form', 'error');
        console.log(error);
      }
    } else {
      // setAllowStepClick(true);
    }
  }

  const handleValidStep = ({ lastStep }) => {

    const validForNextStep = (inputs) => {
      for (const inp of inputs) {
        const { conditionals, ...rest} = inp
        for (const key in rest) {
          const valor = rest[key];
          if (valor.length > 0) {
            return false;
          }
        }
        if (conditionals) {
          const conditionalsValid = validForNextStep(conditionals);
          if (!conditionalsValid) {
            return false;
          }
        }
      }
      return true;
    };

    const tempIsValid = _.cloneDeep(isValid[activeStep]);
    const isValidStep = validForNextStep(tempIsValid);

    setTryToNext(tryToNext.map((item, idx) => idx === activeStep ? true : item));

    if (isValidStep) {
      if (!lastStep) {
        setActiveStep(activeStep + 1);
        handleScroll()
      }
      return true;
    } else {
      return false;
    }

  }

  const handleScroll = () => {
    if (formRef.current) {
      const rect = formRef.current.getBoundingClientRect();
      const offset = 50;
      window.scrollBy({ top: rect.top - offset, behavior: "smooth" });
    }
  };

  return (
    <div className="mt-20" ref={formRef}>
      <Container fluid="md" className={`dyTheme1 dyBorder1 p-5`}>

        <div className={`form-preview`} onSubmit={(e) => handleSubmit(e)}>
          {
            schemaState &&
            <div className="form-preview-inputs animation">

              <Tab.Container activeKey={activeStep} >

                <div className="form-preview-header-steper">
                  <Nav>
                    <CDBStepper
                      direction="horizontal"
                      md="2"
                      currentStepNumber={0}
                      stepColor=""
                      steps={[...steps.map((step, index) => index)]}>
                      {schemaState.map((step, index) => (
                          <CDBStep
                            key={index + 1}
                            id={index + 1}
                            name={steps[index]?.title || "Sin Nombre"}
                            handleClick={allowStepClick ? () => setActiveStep(index) : () => { }}
                            active={activeStep + 1}
                            activeBgColor='#009ed7'
                            activeTextColor='#009ed7'
                            incompleteBgColor='#ffaf00'
                            incompleteTextColor='#ffefc0'
                            completeBgColor='#44cb67'
                            completeTextColor='white'
                            children={<Nav.Link eventKey={index}></Nav.Link>}
                          />
                      ))}
                    </CDBStepper>

                  </Nav>
                </div>

                <Tab.Content>
                  {schemaState.map((step, idxStep) => (
                    <Tab.Pane eventKey={idxStep} >
                      <div className="form-preview-header mb-30 ">
                        <div className="form-preview-header-name">
                          <h3>{steps[idxStep].title || "Step sin nombre"}</h3>
                        </div>
                      </div>
                      <Row>
                        {step.map((input, idxInput)=>(
                          <RenderInput
                            key={`form-input-${idxStep}-${idxInput}`}
                            entireSchema={schemaState}
                            entireFormData={formData}
                            entireIsValid={isValid}
                            entirePathSchema={`${idxStep}.${idxInput}`}
                            entirePathData={`${idxStep}.${idxInput}`}
                            setSchemaState={setSchemaState}
                            setFormData={setFormData}
                            setIsValid={setIsValid}
                            tryToNext={tryToNext}
                            activeStep={idxStep}
                            idx={idxInput}
                            attachments={attachments}
                            setAttachments={setAttachments}
                            origin={`stepers::${idxInput}::form::json-schema::${idxInput}`}
                          />
                        ))}
                      </Row>
                    </Tab.Pane>
                  ))} 
                </Tab.Content>

              </Tab.Container>

            </div>
          }
          <pre>
            {/* {JSON.stringify(schemaState,null,2)} */}
            {/* {JSON.stringify(formData,null,2)} */}
            {/* {JSON.stringify(isValid,null,2)} */}
            {/* {JSON.stringify(tryToNext,null,2)} */}
          </pre>
        </div>
        {
          showButtons &&
          <div className="form-buttons">
            {
              activeStep !== 0 &&
              <Button
                style={{ backgroundColor: "#009ED7" }}
                className='btn-form ant'
                onClick={() => setActiveStep((active) => active - 1)}>
                Anterior
              </Button>
            }
            {
              activeStep === steps.length - 1
                ? <Button
                    style={{ backgroundColor: "#152235" }}
                    className='btn-send'
                    onClick={handleSubmit}>
                    Enviar
                  </Button>
                : <Button
                    style={{ backgroundColor: "#009ED7" }}
                    className='btn-form'
                    onClick={handleValidStep}>
                    Siguiente
                  </Button>
            }
          </div>
        }
      </Container>
    </div>
  )
}