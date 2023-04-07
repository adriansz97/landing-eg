import { Row, Col } from "react-bootstrap";
import { CDBFooter, CDBIcon } from "cdbreact";
import Logo from "../../../assets/images/EthicsGlobal_Blanco.png";
import "./styles.scss";

const Footer = () => {
    return (
        <>
            <CDBFooter className="footer-container">
                <Row className="mx-auto py-5" style={{width:"90%"}}>
                    {/* <Col lg="3" md="12">
                        <div className="border-bottom-1 py-2">
                            <h4 className="mt-5">Cónocenos</h4>
                            <p className="my-2">www.ethicsglobal.com</p>
                            <p className="my-2">latam@ethicsglobal.com</p>
                        </div>
                        <hr />
                        <div className="border-bottom-1 py-2">
                            <p className="my-2">México: 800 04 38422</p>
                            <p className="my-2">CDMX: (+52) 5234 7777</p>
                        </div>
                        <hr />
                        <div className="py-2">
                            <p className="my-2">WTC México oficina 9, Montecito 38, piso 42</p>
                            <p className="my-2">Col. Napoles C.P. 03810 Mexico D.F.</p>
                        </div>
                    </Col> */}
                    <Col xs="12">
                        <div className="footer-logo">
                            <img alt="logo" src={Logo} />
                        </div>
                    </Col>
                    <Col md="4">
                        <h4 className="border-bottom-1 pt-5 pb-3">Denuncias</h4>
                        <hr />
                        <ul style={{listStyle:"none", cursor:"pointer", padding:"0"}}>
                            <a href="/">Nuevo reporte</a>
                            <a href="/">Código de Ética</a>
                            <a href="/">Seguimiento del caso</a>
                        </ul>
                    </Col>
                    <Col md="4">
                        <h4 className="border-bottom-1 pt-5 pb-3">Ayuda</h4>
                        <hr />
                        <ul style={{listStyle:"none", cursor:"pointer", padding:"0"}}>
                            <a href="/">¿Como informar?</a>
                            <a href="/">Preguntas Frecuentes</a>
                            <a href="/">Politica de Privacidad</a>
                        </ul>
                    </Col>
                    <Col md="4">
                        <h4 className="border-bottom-1 pt-5 pb-3">Social</h4>
                        <hr />
                        <ul style={{listStyle:"none", cursor:"pointer", padding:"0"}}>
                            <a href="/"><CDBIcon fab icon="linkedin" className="mr-2" />LinkedIn</a>
                            <a href="/"><CDBIcon fab icon="facebook" className="mr-2" />Facebook</a>
                            <a href="/"><CDBIcon fab icon="twitter" className="mr-2" />Twitter</a>
                            <a href="/"><CDBIcon fab icon="youtube" className="mr-2" />Youtube</a>
                            <a href="/"><CDBIcon fab icon="blogger" className="mr-2" />Blog</a>
                        </ul>
                    </Col>
                </Row>
            </CDBFooter>
            <div className="copyright">
                <p>Copyright © 2021 Ethics Global</p>
                <p>Términos y Condiciones  I  Política de Privacidad</p>
            </div>
        </>
    );
};

export default Footer