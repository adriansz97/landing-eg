import { Row, Col } from "react-bootstrap";
import { CDBFooter, CDBIcon } from "cdbreact";
import Logo from "../../../assets/images/logotipo-ethics-copy.png";
import "./styles.scss";

const Footer = () => {
    return (
        <>
            <CDBFooter>
                <Row className="mx-auto py-5" style={{width:"80%"}}>
                    <Col lg="3" md="12">
                        <div className="border-bottom-1 py-2">
                            <img alt="logo" src={Logo} />
                            <h4 className="mt-5">Cónocenos</h4>
                            <p className="my-2">www.ethicsglobal.com</p>
                            <p className="my-2">latam@ethicsglobal.com</p>
                        </div>
                        <div className="border-bottom-1 py-2">
                            <p className="my-2">México: 8000438422</p>
                            <p className="my-2">CDMX: (55) 5234 7777</p>
                        </div>
                        <div className="py-2">
                            <p className="my-2">WTC México oficina 9, Montecito 38, piso 42</p>
                            <p className="my-2">Col. Napoles C.P. 03810 Mexico D.F.</p>
                        </div>
                    </Col>
                    <Col lg="3" md="4">
                        <h4 className="border-bottom-1 pt-5 pb-3">Denuncias</h4>
                        <ul style={{listStyle:"none", cursor:"pointer", padding:"0"}}>
                            <a href="/">Nueva denuncia</a>
                            <a href="/">Código de ética</a>
                            <a href="/">Consultar denuncia</a>
                            <a href="/">Canales para denunciar</a>
                        </ul>
                    </Col>
                    <Col lg="3" md="4">
                        <h4 className="border-bottom-1 pt-5 pb-3">Ayuda</h4>
                        <ul style={{listStyle:"none", cursor:"pointer", padding:"0"}}>
                            <a href="/">¿Como denunciar?</a>
                            <a href="/">Preguntas Frecuentes</a>
                            <a href="/">Videos de ayuda</a>
                            <a href="/">Blog</a>
                        </ul>
                    </Col>
                    <Col lg="3" md="4">
                        <h4 className="border-bottom-1 pt-5 pb-3">Social</h4>
                        <ul style={{listStyle:"none", cursor:"pointer", padding:"0"}}>
                            <a href="/"><CDBIcon fab icon="linkedin" className="mr-2" />LinkedIn</a>
                            <a href="/"><CDBIcon fab icon="facebook" className="mr-2" />Facebook</a>
                            <a href="/"><CDBIcon fab icon="twitter" className="mr-2" />Twitter</a>
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