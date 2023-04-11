import { Col, Row } from "react-bootstrap";
import Concept from "../../../assets/images/concept.png";
import Monitor from "../../../assets/images/monitor.png";
import Complaint from "../../../assets/images/complaint.png";
import Person from "../../../assets/images/person.png";
import "./styles.scss";

const HowWorks = () => {
    return(
        <div className="how-works-container">
            <h3 className="text-center mb-5">¿CÓMO FUNCIONA?</h3>
            <Row>
                <Col lg="3" md="6" sm="12" className="how-works-item">
                    <img src={Concept} alt="concept" />
                    <h4 className="mt-5 mb-3">¿Qué es?</h4>
                    <p>Es el medio, fácil de usar, para comunicar cualquier conducta que vaya en contra de nuestro Código de Ética, aquí te sentirás escuchado sin temor a represalias.</p>
                </Col>
                <Col lg="3" md="6" sm="12" className="how-works-item">
                    <img src={Monitor} alt="monitor" />
                    <h4 className="mt-5 mb-3">Procedimiento para reportar</h4>
                    <p>Usa el medio donde te sientas más cómodo, ya sea que requieras atención personalizada en tiempo real o si quieres hacerlo por tu propia cuenta.</p>
                </Col>
                <Col lg="3" md="6" sm="12" className="how-works-item">
                    <img src={Complaint} alt="complaint" />
                    <h4 className="mt-5 mb-3">Genera tu reporte</h4>
                    <p>Ten a la mano la siguiente información: involucrados, ¿cómo sucedieron los hechos?, ¿hace cuanto tiempo, ¿dónde sucedieron los hechos?</p>
                    {/* <a href="/" className="how-works-link">¿Como hacer una buena denuncia?</a> */}
                </Col>
                <Col lg="3" md="6" sm="12" className="how-works-item">
                    <img src={Person} alt="person" />
                    <h4 className="mt-5 mb-3">Consulta y da seguimiento</h4>
                    <p>Involúcrate en el proceso de atención de tu caso haciendo un seguimiento constante de los mensajes que los encargados de atenderlo pudieran enviarte.</p>
                </Col>
            </Row>
        </div>
    )
}
export default HowWorks;