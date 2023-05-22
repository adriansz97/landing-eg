import { useEffect, useState } from "react";
import _ from "lodash";
import { Col } from "react-bootstrap";
import { catalogByPart } from "../../../apis";
import { hdlSchm, hdlChg } from "./PreviewForm";

// Render de un input asociado a un catalogo
export const CatalogueInput = ({ 
  schema,
  scope,
  value,
  valid,
  path = "",
  pathSchema,
  pathData,
  nestNum = 0,
  idx,
  handleValidate,
  returnValidClass,
  tryToSend,
  colsLg=4,
  land,
  entireSchema,
  entireFormData,
  setSchemaState,
  setFormData,
}) => {

  const [selectedKey, setSelectedKey] = useState(scope.selected||"");
  const isUniqueSelectionDefault = Array.isArray(scope.children) && scope.children.length===1;

  const type = schema.type;
  const sensitive = schema.sensitive;
  const required = schema.required;
  const catalogue = schema.catalogue;
  const isOwn = schema.isOwn;

  const utilHdlSch = { entireSchema, setSchemaState };
  const utilHdlChg = { entireFormData, setFormData };

  useEffect(() => {
    if (isUniqueSelectionDefault && !scope.selected) {
      if (Array.isArray(scope.children[0].childs)) {
        hdlSchm({ action: "selection", children: scope.children[0].childs, selected: scope.children[0].key, path, pathSchema, ...utilHdlSch });
        handleValidate(false);
      } else {
        hdlSchm({ action: "noNextPath", selected: scope.children[0].key, path, pathSchema, ...utilHdlSch });
        handleValidate(true);
      }
      handleStartData();
    } else {
      if (scope.lastChild) {
        handleValidate(true);
      }
      setSelectedKey(scope.selected);
    }
  }, [scope]);

  const handleKeyChange = (newKey) => {
    if (!newKey) { // Cuando la llave cambia a un string vacio o cuando se crea el componente
      if (scope.selected!==newKey) { // Cuando el selectedKey tiene valor y cambia a ""
        hdlSchm({ action: "nullSelection", path, idx, pathSchema, ...utilHdlSch });
        handleDataNull();
        handleValidate(false);
      }
    } else if (scope.selected!==newKey) { // Cuando la selectedKey es diferente a la seleccionada en el schema
      const actualScope = scope.children.find(obj=>obj.key===newKey);
      if (isUniqueSelectionDefault) {
        if (Array.isArray(scope.children[0].childs)) {
          if (!scope.next && !scope.selected) {
            hdlSchm({ action: "selection", children: scope.children[0].childs, selected: scope.children[0].key, path, idx, pathSchema, ...utilHdlSch });
            handleValidate(false);
          }
        } else { // Cuando el ultimo hijo es unico
          hdlSchm({ action: "noNextPath", selected: newKey, path, idx, pathSchema, ...utilHdlSch });
          handleValidate(true);
          handleDataNormal(newKey);
        }
      } else {
        const pathOnBack = actualScope?.path;
        if (pathOnBack) {
          catalogByPart({ is_own: isOwn, catalogue, path: pathOnBack })
          .then( resp => {
            hdlSchm({ action: "selection", children: resp.data, selected: newKey, path, idx, pathSchema, ...utilHdlSch });
            handleValidate(false);
            handleDataEndpoint({ pathOnBack, scope: resp.data });
          })
          .catch(console.log);
        } else {
          hdlSchm({ action: "noNextPath", selected: newKey, path, idx, pathSchema, ...utilHdlSch });
          handleValidate(true);
          handleDataNormal(newKey);
        }
      }
    }
  }

  const handleDataEndpoint = ({ pathOnBack, scope, acumulatedPath }) => {
    if (scope.length===1) {  // una sola opcion
      if (Array.isArray(scope[0].childs) || Array.isArray(scope.children)) { // una sola opcion y tiene hijo o hijos
        handleDataEndpoint({
          scope: scope[0].childs,
          acumulatedPath: scope[0].path
        })
      } else {  // una sola opcion y no tiene hijos
        if (pathOnBack) {
          hdlChg({e: { target:{name: catalogue, value: `${pathOnBack}::type::${scope[0].key}`}}, entirePathData: pathData, params: { catalogue, sensitive, isOwn }, ...utilHdlChg });
        } else {
          hdlChg({e: { target:{name: catalogue, value: `${acumulatedPath}::type::${scope[0].key}`}}, entirePathData: pathData, params: { catalogue, sensitive, isOwn }, ...utilHdlChg});
        }
      }
    } else { // varias opciones
      if (pathOnBack) {
        hdlChg({e: { target:{name: catalogue, value: pathOnBack}}, entirePathData: pathData, params: { catalogue, sensitive, isOwn }, ...utilHdlChg});
      } else {
        hdlChg({e: { target:{name: catalogue, value: acumulatedPath}}, entirePathData: pathData, params: { catalogue, sensitive, isOwn }, ...utilHdlChg});
      }
    }
  }

  const handleDataNormal = (newKey) => {
    const valueTemp = value ? value : "";
    const splitedArr = valueTemp.split("::");
    const slicedArr = splitedArr.slice(0,((2*(nestNum))));
    const joined = slicedArr.join("::");
    if (joined) {
      hdlChg({e: {target:{name: catalogue, value: `${joined}::type::${newKey}`}}, entirePathData: pathData, params: { catalogue, sensitive, isOwn }, ...utilHdlChg});
    } else {
      hdlChg({e: {target:{name: catalogue, value: `type::${newKey}`}}, entirePathData: pathData, params: { catalogue, sensitive, isOwn }, ...utilHdlChg});
    }
  }

  const handleDataNull = () => {
    const valueTemp = value ? value : "";
    const splitedArr = valueTemp.split("::");
    const slicedArr = splitedArr.slice(0,((2*(nestNum))));
    const joined = slicedArr.join("::");
    if (joined) {
      hdlChg({e: {target:{name: catalogue, value: `${joined}`}}, entirePathData: pathData, params: { catalogue, sensitive, isOwn }, ...utilHdlChg});
    } else {
      hdlChg({e:{target:{name: catalogue, value: ``}}, entirePathData: pathData, params: { catalogue, sensitive, isOwn }, ...utilHdlChg});
    }
  }

  const handleStartData = () => {
    const valueTemp = value ? value : "";
    const splitedArr = valueTemp.split("::");
    const slicedArr = splitedArr.slice(0,((2*(nestNum))));
    const joined = slicedArr.join("::");
    if (joined) {
      hdlChg({e:{target:{name: catalogue, value: `${joined}::type::${scope.children[0].key}`}}, entirePathData: pathData, params: { catalogue, sensitive, isOwn }, ...utilHdlChg});
    } else {
      hdlChg({e:{target:{name: catalogue, value: `type::${scope.children[0].key}`}}, entirePathData: pathData, params: { catalogue, sensitive, isOwn }, ...utilHdlChg});
    }
  }

  const ReturnErrorMesages = () => {
    return (
      <>
        { tryToSend && Array.isArray(valid) && valid.length>0 && !valid &&
          valid.map((err,idx)=>(
          <div key={idx} className="invalid-msg">
            {err} <br />
          </div>
        ))}
      </>
    )
  }

  const orderChildren = (children) => {
    const orderedChildren = children.sort((a,b)=>a.label-b.label);
    const orderOther = orderedChildren.sort((a, b)=>{
      if (a.label.toLowerCase() === "other" || a.label.toLowerCase() === "otro") {
        return 1; // si a es "other", lo coloca al final
      } else if (b.label.toLowerCase() === "other" || b.label.toLowerCase() === "otro") {
        return -1; // si b es "other", lo coloca al final
      } else {
        return 0; // si a y b son iguales, no cambia el orden
      }
    });
    return orderOther;
  }

  return (
    <>
      {
        (typeof type === 'string' && type.includes("select"))
          ? <>
              <Col lg={`${colsLg}`} className={`fade-in-image preview-input-container ${!land?"quit-pl":""}`}>
              <div className="preview-input-container-inp">
                <select className={`form-control form-select-input ${returnValidClass()}  w-100`} onChange={(e)=>handleKeyChange(e.target.value)} name={scope.key} value={selectedKey} style={{margin: 0}}>
                  {
                    !isUniqueSelectionDefault &&
                      <option value="">Seleccione una opción</option>
                  }
                  {
                    scope.children &&
                    orderChildren(scope.children).map(item=>{
                      if (item.is_active) {
                        return <option key={item.key} value={item.key} name={item.path}>{item.label}</option>
                      } else {
                        return <></>;
                      }  
                    })
                  }
                </select>
                <ReturnErrorMesages />
              </div>
              </Col>
              {
                (scope?.next && selectedKey) &&
                  <CatalogueInput
                    schema={schema}
                    scope={scope.next} 
                    value={value}
                    valid={valid}
                    path={`${path}next.`}
                    pathSchema={pathSchema}
                    pathData={pathData}
                    nestNum={nestNum+1}
                    idx={idx}
                    handleValidate={handleValidate}
                    returnValidClass={returnValidClass}
                    tryToSend={tryToSend}
                    colsLg={colsLg}
                    land={land}
                    entireSchema={entireSchema}
                    entireFormData={entireFormData}
                    setSchemaState={setSchemaState}
                    setFormData={setFormData}
                  />
              }
            </>
          : <>
              <Col lg={`${colsLg}`} className={`fade-in-image preview-input-container ${!land?"quit-pl":""}`}>
                <div className="preview-input-container-inp">
                  {
                    scope.children &&
                    orderChildren(scope.children).map((item,idxx)=>{
                      if (item.is_active) {
                        return (
                          <div key={item.key} className="form-check">
                            <input className={`form-check-input ${returnValidClass()}`} id={`${pathData}-${nestNum}-${idxx}`} type="radio" value={item.key} name={item.path} checked={selectedKey===item.key} onChange={(e) => handleKeyChange(e.target.value)} />
                            <label className="form-check-label" htmlFor={`${pathData}-${nestNum}-${idxx}`}>{item.label}</label>
                            <br />
                          </div>
                        )
                      } else {
                        return <></>;
                      }
                    })
                  }
                  <ReturnErrorMesages />
                </div>
              </Col>
              {
                (scope?.next && selectedKey) &&
                  <CatalogueInput
                    schema={schema}
                    scope={scope.next} 
                    value={value}
                    valid={valid}
                    path={`${path}next.`}
                    pathSchema={pathSchema}
                    pathData={pathData}
                    nestNum={nestNum+1}
                    idx={idx}
                    handleValidate={handleValidate}
                    returnValidClass={returnValidClass}
                    tryToSend={tryToSend}
                    colsLg={colsLg}
                    land={land}
                    entireSchema={entireSchema}
                    entireFormData={entireFormData}
                    setSchemaState={setSchemaState}
                    setFormData={setFormData}
                  />
              }
            </>
      }
    </>
  )
}