import { Row, Col } from "react-bootstrap";
import { CDBFooter, CDBIcon } from "cdbreact";
import { Icon } from "../../Icon/Icon";
import "./styles.scss";

export const Footer = ({ scrollToRef }) => {
    return (
        <div className="footer-container">
            <CDBFooter className="footer">
                <Row className="mx-auto py-5 container" style={{width:"90%"}}>
                    <Col xs="12">
                        <div className="footer-logo">
                            <a href="https://www.ethicsglobal.com/es/index.html" target="_blank">
                                <Icon name="eg_blanco" />
                            </a>
                        </div>
                    </Col>
                    <Col md="4">
                        <h4 className="border-bottom-1 pt-5 pb-3">Denuncias</h4>
                        <hr />
                        <ul style={{listStyle:"none", cursor:"pointer", padding:"0"}}>
                            <a onClick={()=>scrollToRef("BeAgent")}>Nuevo reporte</a>
                            <a>Código de Ética</a>
                            <a onClick={()=>scrollToRef("FollowUp")}>Seguimiento del caso</a>
                        </ul>
                    </Col>
                    <Col md="4">
                        <h4 className="border-bottom-1 pt-5 pb-3">Ayuda</h4>
                        <hr />
                        <ul style={{listStyle:"none", cursor:"pointer", padding:"0"}}>
                            <a onClick={()=>scrollToRef("HowWorks")}>¿Como informar?</a>
                            <a onClick={()=>scrollToRef("FrequentQuestions")}>Preguntas Frecuentes</a>
                            <a target="_blank" href="https://www.ethicsglobal.com/es/registro-de-avisos-de-privacidad.html">Politica de Privacidad</a>
                        </ul>
                    </Col>
                    <Col md="4">
                        <h4 className="border-bottom-1 pt-5 pb-3">Social</h4>
                        <hr />
                        <ul style={{listStyle:"none", cursor:"pointer", padding:"0"}}>
                            <a href="https://www.linkedin.com/company/ethicsglobal" target="_blank" ><CDBIcon fab icon="linkedin" className="mr-2" />LinkedIn</a>
                            <a href="https://www.facebook.com/ethicsglobal" target="_blank" ><CDBIcon fab icon="facebook" className="mr-2" />Facebook</a>
                            <a href="https://twitter.com/ethicsglobal" target="_blank" ><CDBIcon fab icon="twitter" className="mr-2" />Twitter</a>
                            <a href="https://www.youtube.com/@ethicsglobal" target="_blank" ><CDBIcon fab icon="youtube" className="mr-2" />Youtube</a>
                            <a href="https://blog.ethicsglobal.com/" target="_blank" ><CDBIcon fab icon="blogger" className="mr-2" />Blog</a>
                        </ul>
                    </Col>
                </Row>
            </CDBFooter>
            <div className="copyright">
                <p><a className="link" href="https://www.ethicsglobal.com/es/index.html" target="_blank">© Copyright 1996-2022 ethicsglobal.com</a></p>
                <p>Todos los derechos reservados. Las distintas marcas comerciales pertenecen a sus respectivos propietarios.</p>
            </div>
        </div>
    );
};