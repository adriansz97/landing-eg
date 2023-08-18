import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import _ from "lodash";
import { components } from 'react-select';
import { Col, Modal } from "react-bootstrap";
import { catalogByPart } from "../../../apis";
import { MCButton } from "../../MainComponents/Button/Button";
import Icon from "../../Icon/Icon";
import { hdlSchm, hdlChg } from "./PreviewForm";
import { MCSelect } from "../../MainComponents/Select/Select";
import { INPUT_TYPE_CATALOGUE_RADIO, INPUT_TYPE_CATALOGUE_RADIO_CONDITIONAL, INPUT_TYPE_CATALOGUE_RADIO_DESCRIPTION, INPUT_TYPE_CATALOGUE_RADIO_DESCRIPTION_CONDITIONAL, INPUT_TYPE_CATALOGUE_SELECT, INPUT_TYPE_CATALOGUE_SELECT_CONDITIONAL } from "../consts";

const ModalExamples = ({ itemExamples, setShowExampleModal, styleDark }) => {
  const {gTheme} = useSelector(state=>state.theme)
  return (
    <Modal
      show
      onHide={()=>setShowExampleModal(false)}
      backdrop="static"
      keyboard={false}
      centered
      // contentClassName={`modal-example-dialog ${styleDark}`}
      className={`${gTheme!=="light"?"dark-mode":""}`}
    >
    <Modal.Header closeButton className={styleDark === "dark-mode" ? "btn-close-white":""} >
      <Modal.Title bsPrefix={styleDark === "dark-mode" ? "modal-title cus-modal-title" : "modal-title"} >Estos son los ejemplos</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {itemExamples.map((itemTxt) => (
        <Col lg="12" key={itemTxt}>
          <p>{itemTxt}</p>
        </Col>
      ))}
    </Modal.Body>
  </Modal>
  )
}

const CatalogueRadioInput = ({ 
  scope,
  pathData,
  type,
  nestNum,
  returnValidClass,
  showErrorLastChild,
  GetDescritionAndExamples,
  handleKeyChange,
  selectedKey,
  isSelected,
  orderChildren,
  styleDark,
}) => {
  if (type===INPUT_TYPE_CATALOGUE_RADIO || type===INPUT_TYPE_CATALOGUE_RADIO_CONDITIONAL) {
    return (
      <div className="container-checkbox2">
      {
        scope.children &&
        orderChildren(scope.children).map((item, idxx) => {
          if (item.is_active) {
            return (
              <div role="button" className={`p-3 m-2 ${styleDark} ${isSelected(selectedKey === item.key)}`} key={idxx} onClick={(e) => (selectedKey !== item.key) ? handleKeyChange(item.key) : ()=>{} } >
                <div key={item.key} className="form-check">
                  <input className={`form-check-input  ${showErrorLastChild ? returnValidClass() : ""}`} id={`${pathData}-${nestNum}-${idxx}`} type="radio" value={item.key} name={item.path} checked={selectedKey === item.key} onChange={(e) => handleKeyChange(e.target.value)} />
                  <label role="button" className={`form-check-label mb-1 ${styleDark} ${isSelected(selectedKey === item.key)}`} htmlFor={`${pathData}-${nestNum}-${idxx}`}>{item.label}</label>
                </div>
              </div>
            )
          } else {
            return <></>;
          }
        })
      }
      </div>
    )
  } else {
    return (
      <>
      {
        scope.children &&
        orderChildren(scope.children).map((item, idxx) => {
          if (item.is_active) {
            return (
              <div role="button" className={`container-checkbox p-3 m-2 ${styleDark} ${isSelected(selectedKey === item.key)}`} key={idxx} onClick={(e) => (selectedKey !== item.key) ? handleKeyChange(item.key) : ()=>{} } >
                <div key={item.key} className="form-check">
                  <input className={`form-check-input  ${showErrorLastChild ? returnValidClass() : ""}`} id={`${pathData}-${nestNum}-${idxx}`} type="radio" value={item.key} name={item.path} checked={selectedKey === item.key} onChange={(e) => handleKeyChange(e.target.value)} />
                  <label role="button" className={`form-check-label mb-1 ${styleDark} ${isSelected(selectedKey === item.key)}`} htmlFor={`${pathData}-${nestNum}-${idxx}`}>{item.label}</label>
                  {
                    (type===INPUT_TYPE_CATALOGUE_RADIO_DESCRIPTION || type===INPUT_TYPE_CATALOGUE_RADIO_DESCRIPTION_CONDITIONAL) &&
                    <GetDescritionAndExamples item={item} />
                  }
                </div>
              </div>
            )
          } else {
            return <></>;
          }
        })
      }
      </>
    )
  }
}

// Render de un input asociado a un catalogo
export const CatalogueInput = ({
  schema,
  scope,
  value,
  valid,
  origin,
  pathSchema,
  pathData,
  entireSchema,
  entireFormData,
  setSchemaState,
  setFormData,
  tryToNext,
  handleValidate,
  returnValidClass,
  path = "",
  nestNum = 0,
  forEdition = false,
}) => {

  const { gTheme } = useSelector((state) => state.theme);

  const [showEditLabelModal, setShowEditLabelModal] = useState(false);

  const [selectedKey, setSelectedKey] = useState(scope.selected||"");
  const [showExampleModal, setShowExampleModal] = useState(false);
  const [itemExamples, setitemExamples] = useState([]);
  const [rerenderChild, setRerenderChild] = useState(false);
  const isUniqueSelectionDefault = Array.isArray(scope.children) && scope.children.length===1;
  const showErrorLastChild = scope.selected ? false : true;
  const isLastChild = scope.lastChild;
  const styleDark = gTheme === "light" ? "" : "dark-mode";

  const type = schema.type;
  const grid = schema.grid;
  const sensitive = schema.sensitive;
  const catalogue = schema.catalogue;
  const isOwn = schema.isOwn;
  const conditionals = "conditionals" in schema;

  const utilHdlSch = { entireSchema, setSchemaState };
  const utilHdlChg = { entireFormData, setFormData };
  const params = { catalogue, sensitive, isOwn, origin, ...(conditionals&&{conditionals}) }
  

  useEffect(() => {
    setRerenderChild(true);
  }, [selectedKey]);

  useEffect(() => {
    if (rerenderChild) {
      setRerenderChild(false);
    }
  }, [rerenderChild]);

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
      if (!scope.selected && scope.children && scope.lastChild) {
        // handleValidate(false);
      } else if (scope.selected && !scope.children && scope.lastChild) {
        // handleValidate(true); 
      }
      setSelectedKey(scope.selected);
    }
  }, [scope]);

  const handleKeyChange = (newKey) => {
    if (!newKey) { // Cuando la llave cambia a un string vacio o cuando se crea el componente
      if (scope.selected!==newKey) { // Cuando el selectedKey tiene valor y cambia a ""
        hdlSchm({ action: "nullSelection", path, pathSchema, ...utilHdlSch });
        handleDataNull();
        handleValidate(false);
      }
    } else if (scope.selected !== newKey) { // Cuando la selectedKey es diferente a la seleccionada en el schema
      const actualScope = scope.children.find(obj => obj.key === newKey);
      if (isUniqueSelectionDefault) {
        if (Array.isArray(scope.children[0].childs)) {
          if (!scope.next && !scope.selected) {
            hdlSchm({ action: "selection", children: scope.children[0].childs, selected: scope.children[0].key, path, pathSchema, ...utilHdlSch });
            handleValidate(false);
          }
        } else { // Cuando el ultimo hijo es unico
          hdlSchm({ action: "noNextPath", selected: newKey, path, pathSchema, ...utilHdlSch });
          handleValidate(true);
          handleDataNormal(newKey);
        }
      } else {
        const pathOnBack = actualScope?.path;
        if (pathOnBack) {
          catalogByPart({ is_own: isOwn, catalogue, path: pathOnBack })
          .then( resp => {
            hdlSchm({ action: "selection", children: resp.data, selected: newKey, path, pathSchema, ...utilHdlSch });
            handleValidate(false);
            handleDataEndpoint({ pathOnBack, scope: resp.data });
          })
          .catch(console.log);
        } else {
          hdlSchm({ action: "noNextPath", selected: newKey, path, pathSchema, ...utilHdlSch });
          handleValidate(true);
          handleDataNormal(newKey);
        }
      }
    }
  }

  const handleDataEndpoint = ({ pathOnBack, scope, acumulatedPath }) => {
    if (scope.length === 1) {  // una sola opcion
      if (Array.isArray(scope[0].childs) || Array.isArray(scope.children)) { // una sola opcion y tiene hijo o hijos
        handleDataEndpoint({
          scope: scope[0].childs,
          acumulatedPath: scope[0].path
        })
      } else {  // una sola opcion y no tiene hijos
        if (pathOnBack) {
          hdlChg({ e: { target: { name: catalogue, value: `${pathOnBack}::type::${scope[0].key}` } }, entirePathData: pathData, params, ...utilHdlChg });
        } else {
          hdlChg({ e: { target: { name: catalogue, value: `${acumulatedPath}::type::${scope[0].key}` } }, entirePathData: pathData, params, ...utilHdlChg });
        }
      }
    } else { // varias opciones
      if (pathOnBack) {
        hdlChg({ e: { target: { name: catalogue, value: pathOnBack } }, entirePathData: pathData, params, ...utilHdlChg });
      } else {
        hdlChg({ e: { target: { name: catalogue, value: acumulatedPath } }, entirePathData: pathData, params, ...utilHdlChg });
      }
    }
  }

  const handleDataNormal = (newKey) => {
    const valueTemp = value ? value : "";
    const splitedArr = valueTemp.split("::");
    const slicedArr = splitedArr.slice(0, ((2 * (nestNum))));
    const joined = slicedArr.join("::");
    if (joined) {
      hdlChg({ e: { target: { name: catalogue, value: `${joined}::type::${newKey}` } }, entirePathData: pathData, params, ...utilHdlChg });
    } else {
      hdlChg({ e: { target: { name: catalogue, value: `type::${newKey}` } }, entirePathData: pathData, params, ...utilHdlChg });
    }
  }

  const handleDataNull = () => {
    const valueTemp = value ? value : "";
    const splitedArr = valueTemp.split("::");
    const slicedArr = splitedArr.slice(0, ((2 * (nestNum))));
    const joined = slicedArr.join("::");
    if (joined) {
      hdlChg({ e: { target: { name: catalogue, value: `${joined}` } }, entirePathData: pathData, params, ...utilHdlChg });
    } else {
      hdlChg({ e: { target: { name: catalogue, value: `` } }, entirePathData: pathData, params, ...utilHdlChg });
    }
  }

  const handleStartData = () => {
    const valueTemp = value ? value : "";
    const splitedArr = valueTemp.split("::");
    const slicedArr = splitedArr.slice(0, ((2 * (nestNum))));
    const joined = slicedArr.join("::");
    if (joined) {
      hdlChg({e:{target:{name: catalogue, value: `${joined}::type::${scope.children[0].key}`}}, entirePathData: pathData, params, ...utilHdlChg});
    } else {
      hdlChg({e:{target:{name: catalogue, value: `type::${scope.children[0].key}`}}, entirePathData: pathData, params, ...utilHdlChg});
    }
  }

  const orderChildren = (children) => {
    const orderedChildren = children.sort((a, b) => a.label - b.label);
    const orderOther = orderedChildren.sort((a, b) => {
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

  const getOptions = () => {
    var options = [];
    const childrens = orderChildren(scope.children);

    for (var i = 0; i < childrens.length; i++) {
      if (childrens[i].is_active) {
        options.push({ value: childrens[i].key, name: childrens[i].path, label: childrens[i].label, description: childrens[i].description, examples: childrens[i].examples });
      }
    }

    return options;
  }

  const isSelected = (condition) => {
    return condition ? "selected" : "";
  };

  const handleSetExamples = (examplesOfItem) => {
    setitemExamples(examplesOfItem);
    setShowExampleModal(true)
  };

  const GetDescritionAndExamples = ({ item }) => {
    const description = item.description ? item.description : null;
    const examples = item.examples ? item.examples : null;

    return (
      <>
        {description && typeof description === "string" &&
          <p className={`${styleDark} ${isSelected(selectedKey === item.key)}`} >
            {description}
          </p>
        }
        {examples && Array.isArray(examples) &&
          <MCButton label="Ejemplos" variant="primary" outline size="sm" onClick={()=>handleSetExamples(examples)}  />
        }
      </>
    );
  };

  const Option = ({ ...props }) => (
    <components.Option {...props}>
      <div>
        <div>{props.data.label}</div>
        <GetDescritionAndExamples item={props.data} />
      </div>
    </components.Option>
  );


  if (type===INPUT_TYPE_CATALOGUE_SELECT || type===INPUT_TYPE_CATALOGUE_SELECT_CONDITIONAL) {
    return (
      <>
        {
          forEdition && showEditLabelModal &&
          <EditCatalogueModal 
            objSelection={getOptions().find(item=>item.value===selectedKey)}
            catalogue={catalogue} 
            is_own={isOwn}
            onHide={()=>setShowEditLabelModal(false)}
            path={value} 
            nestNum={nestNum} 
          /> 
        }
        {
          showExampleModal &&
          <ModalExamples 
            itemExamples={itemExamples}
            setShowExampleModal={setShowExampleModal}
            styleDark={styleDark}
          />
        }
        <div className={`preview-input-container py-2 ${(isLastChild&&tryToNext&&valid.length>0)?"pb-0":""}`}>
          <div className={`preview-input-container-inp`}>
            {
              scope.children &&
              <div className={` ${showErrorLastChild ? returnValidClass("container") : ""}`}>
                <div className="catalog-for-edition">
                  <MCSelect 
                    menuPortalTarget={document.body}
                    placeholder={ <div>Seleccione una opción</div> }
                    options={getOptions(scope.children)}
                    onChange={(sel)=>handleKeyChange(sel.value)} 
                    components={{ Option }}
                    value={getOptions().find(item=>item.value===selectedKey)}
                  />
                </div>
                {
                  selectedKey && forEdition &&
                  <div className="catalogue-icon-for-edition pointer" onClick={()=>setShowEditLabelModal(true)}>
                    <Icon name="outline_edit" />
                  </div>
                }
              </div>
            }
          </div>
        </div>
        {
          (scope?.next && selectedKey) && !rerenderChild &&
            <CatalogueInput
              schema={schema}
              scope={scope.next} 
              value={value}
              valid={valid}
              origin={origin}
              path={`${path}next.`}
              pathSchema={pathSchema}
              pathData={pathData}
              nestNum={nestNum+1}
              handleValidate={handleValidate}
              returnValidClass={returnValidClass}
              tryToNext={tryToNext}
              entireSchema={entireSchema}
              entireFormData={entireFormData}
              setSchemaState={setSchemaState}
              setFormData={setFormData}
              forEdition={forEdition}
            />
        }
      </>
    )
  }
  if (type===INPUT_TYPE_CATALOGUE_RADIO || type===INPUT_TYPE_CATALOGUE_RADIO_DESCRIPTION || type===INPUT_TYPE_CATALOGUE_RADIO_CONDITIONAL || type===INPUT_TYPE_CATALOGUE_RADIO_DESCRIPTION_CONDITIONAL) {
    return (
      <>
        {
          showExampleModal &&
          <ModalExamples 
            itemExamples={itemExamples}
            setShowExampleModal={setShowExampleModal}
            styleDark={styleDark}
          />
        }
        <div className={`preview-input-container p-0 ${showErrorLastChild ? returnValidClass("container"):""} ${(schema.type.includes(INPUT_TYPE_CATALOGUE_RADIO)&&grid!==12)?"dyBorder1 rounded":""}`}>
          <div className={`preview-input-container-inp ${(isLastChild&&tryToNext&&valid.length>0)?"pb-0":""}`}>
            <CatalogueRadioInput 
              scope={scope}
              pathData={pathData}
              type={type}
              nestNum={nestNum}
              grid={grid}
              returnValidClass={returnValidClass}
              showErrorLastChild={showErrorLastChild}
              GetDescritionAndExamples={GetDescritionAndExamples}
              handleKeyChange={handleKeyChange}
              selectedKey={selectedKey}
              isSelected={isSelected}
              orderChildren={orderChildren}
              styleDark={styleDark}
            />
          </div>
          {
            !isLastChild && grid === 12 &&
            <hr className="my-2" />
          }
        </div>
        {
          (scope?.next && selectedKey) && !rerenderChild &&
          <CatalogueInput
            schema={schema}
            scope={scope.next}
            value={value}
            valid={valid}
            origin={origin}
            path={`${path}next.`}
            pathSchema={pathSchema}
            pathData={pathData}
            nestNum={nestNum + 1}
            handleValidate={handleValidate}
            returnValidClass={returnValidClass}
            tryToNext={tryToNext}
            entireSchema={entireSchema}
            entireFormData={entireFormData}
            setSchemaState={setSchemaState}
            setFormData={setFormData}
          />
        }
      </>
    )
  }
  return <></>
}