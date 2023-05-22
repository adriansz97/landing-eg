import { useState } from "react";
import { Row, Col, Modal } from "react-bootstrap";
import { CDBBtn, CDBIcon } from "cdbreact";
import { useIsHovering } from "../../../hooks/useIsHovering";
import App from "../../../assets/images/app.png";
import Qr from "../../../assets/images/1-Surtidora.png";
import AppStore from "../../../assets/images/app-store.png";
import GooglePlay from "../../../assets/images/google-play.png";
import "./styles.scss";

const ModalVideo = ({ infoClient, show, onHide }) => {
    return (
        <Modal show={show} onHide={onHide} size="xl" className="modal-video-container">
            <div className="modal-video">
                <div className="text-center">
                    <h3>Bienvenido a Línea Ética {infoClient.clientName}</h3>
                </div>
                <div className="text-center">
                    <iframe width="840" height="472,5" src="https://www.youtube.com/embed/G29SCxMILdo" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                </div>
                <div className="text-center mt-4">
                    <h6>Ver Aviso de Privacidad</h6>
                </div>
            </div>
        </Modal>
    )
}

export const Download = ({infoClient, primaryColor, secondaryColor, downloadRef }) => {

    const [ isHovering, handleMouseOver, handleMouseOut ] = useIsHovering();
    const [showModalVideo, setShowModalVideo] = useState(false);

    return(
        <div className="download" ref={downloadRef}>
            <Row className="w-100">
                <Col lg="6" md="12" className="text-center">
                    <div className="download-app-img">
                        <img src={App} alt="Download-App" />
                    </div>
                </Col>
                <Col lg="6" md="12" className="download-info-container">
                    <div className="download-info">
                        <h3>DESCARGA NUESTRA APP</h3>
                        <div className="download-app-img2">
                            <img src={App} alt="Download-App" />
                        </div>
                        <CDBBtn 
                            style={{ backgroundColor: isHovering ? '#00bbff' : '#009ED7' }} 
                            onMouseOver={handleMouseOver} 
                            onMouseOut={handleMouseOut}
                            onClick={()=>setShowModalVideo(true)}
                        >
                            <CDBIcon icon="play-circle"></CDBIcon> VER VIDEO
                        </CDBBtn>
                        <div className="mt-4">
                            Nuestra App ReportChannel es única para que la puedas utilizar las 24 horas, los 365 días del año. Aquí podrás realizar llamadas o conversar en un chat, pero si lo deseas también puedes llenar el cuestionario que te llevará de la mano. Úsala, es el momento de escucharte.
                        </div>
                        <div className="download-methods mt-3">
                            <div className="mr-1rem">
                                <img src={AppStore} alt="App-Store" />
                            </div>
                            <div>
                                <img src={GooglePlay} alt="Google-Play" />
                            </div>
                        </div>
                        <small className="d-block mt-4">* App operada por EthicsGlobal.</small>
                        <b className="d-block mt-4 mb-4">Entra a la App, escanea el QR o escribe el Código para utilizar la línea.</b>
                        <div className="mt-4 qr-container">
                            <div>
                                <img src={Qr} alt="qr" />
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
            <ModalVideo infoClient={infoClient} show={showModalVideo} onHide={()=>setShowModalVideo(false)}  />
        </div>
    )
}