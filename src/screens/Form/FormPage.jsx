import { useEffect, useState } from "react";
import _ from "lodash";
import { getDetailCurrentReport } from "../../apis";
import { formStarter } from "../../components/Form/PreviewForm/formStarter";
import { PreviewForm } from "../../components/Form/PreviewForm/PreviewForm";
import { useSelector } from "react-redux";
import "./styles.scss";
import Icon from "../../components/Icon/Icon";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../components/Golbal/navbar/Navbar";
import { Header } from "../../components/Golbal/Header/Header";
import { NavbarForm } from "../../components/Golbal/NavbarForm/NavbarForm";

export const FormPage = () => {

  const { infoClient } = useSelector(state=>state.app);
  const navigate = useNavigate();

  const [formLoaded, setFormLoaded] = useState(null);
  const [formIdentifier, setFormIdentifier] = useState(null);
  const [formDescription, setFormDescription] = useState(null);
  const [steps, setSteps] = useState(null);
  const [schemaState, setSchemaState] = useState(null);
  const [formData, setFormData] = useState(null);
  const [isValid, setIsValid] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getDetailCurrentReport()
    .then(resp=>{
      setFormLoaded(resp);
    })
    .catch(console.log)
  }, []);

  useEffect(() => {
    setIsLoading(true);
    if (formLoaded) {
      formStarter(formLoaded).
      then(({ initFormIdentifier, initSteps, initSchemaState, initFormData, initIsValid })=>{
        setFormIdentifier(initFormIdentifier);
        setSteps(initSteps);
        setSchemaState(initSchemaState);
        setFormData(initFormData);
        setIsValid(initIsValid);
        setIsLoading(false);
      })
      .catch(console.log)
    }
  }, [formLoaded]);

  return(
    <>
      <Navbar />
      <Header />
      <NavbarForm />
      <div className="form-page">
        <div className="title">
          <div className="d-flex align-items-center mb-3">
            <small role="button" onClick={()=>navigate("/")} ><Icon name="arrow_left_3" /> </small>
            <h3 className="m-0">SEAMOS AGENTES DE CAMBIO</h3>
          </div>
          {
            infoClient?.beAgent?.description
            ? <p>{infoClient?.beAgent?.description}</p>
            : <p>Por medio de este sitio podrás denunciar aquellas conductas no éticas de manera sencilla, confidencial, segura y con la opción de hacerlo de forma anónima. El sistema es operado por un tercero independiente a {infoClient.clientName}, líder en el país y especialista en la gestión de denuncias y reportes (EthicsGlobal).</p>
          }
        </div>
        <div className="form-container mt-5" id="main-form-container">
          {
            isLoading 
            ? <div>Loading...</div>
            : <PreviewForm
                formIdentifier={formIdentifier}
                formDescription={formDescription}
                steps={steps}
                schemaState={schemaState}
                setSchemaState={setSchemaState}
                formData={formData}
                setFormData={setFormData}
                isValid={isValid}
                setIsValid={setIsValid}
                showButtons={true}
                stepClick={false}
                land={true}
              />
          }
        </div>
      </div>
    </>
  )
}