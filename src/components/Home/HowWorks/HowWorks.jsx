import { Col, Row } from "react-bootstrap";
import Concept from "../../../assets/images/concept.png";
import Monitor from "../../../assets/images/monitor.png";
import Complaint from "../../../assets/images/complaint.png";
import Person from "../../../assets/images/person.png";
import "./styles.scss";

const HowWorks = () => {
    return(
        <div id="how-works">
            <h3 className="text-center mb-5">¿CÓMO FUNCIONA?</h3>
            <Row>
                <Col lg="3" md="6" sm="12" className="text-center my-3">
                    <img src={Concept} alt="concept" />
                    <h4 className="mt-5 mb-3">¿Qué es?</h4>
                    <p>Es el medio para denunciar violaciones al Código de Ética de manera confidencial, anónima, segura y fácil de usar.</p>
                </Col>
                <Col lg="3" md="6" sm="12" className="text-center my-3">
                    <img src={Monitor} alt="monitor" />
                    <h4 className="mt-5 mb-3">Método de deuncia</h4>
                    <p>Elige el método más cómodo para ti como chat, sitio web, app y teléfono.</p>
                </Col>
                <Col lg="3" md="6" sm="12" className="text-center my-3">
                    <img src={Complaint} alt="complaint" />
                    <h4 className="mt-5 mb-3">Genera tu denuncia</h4>
                    <p>Fusce condimentum dignissim ultrices. Ut ac auctor ligula</p>
                    <a href="{() => false}">¿Como hacer una buena denuncia?</a>
                </Col>
                <Col lg="3" md="6" sm="12" className="text-center my-3">
                    <img src={Person} alt="person" />
                    <h4 className="mt-5 mb-3">Consulta y da seguimiento</h4>
                    <p>Fusce condimentum dignissim ultrices. Ut ac auctor ligula</p>
                </Col>
            </Row>
        </div>
    )
}
export default HowWorks;