import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import Swal from "sweetalert2";
import FollowUpIcon1 from "../../../assets/images/icon8.png";
import FollowUpIcon2 from "../../../assets/images/icon9.png";
import FollowUpIcon3 from "../../../assets/images/icon10.png";
import FollowUpIcon4 from "../../../assets/images/icon11.png";
import { SearchBar } from '../../../components/SearchBar/SearchBar';
import { getStatusReport } from "../../../apis";
import "./styles.scss";

export const FollowUp = ({ followUpRef, colors }) => {

    const { primaryColor, secondaryColor, primaryTextColor, secondaryTextColor } = colors;

    const navigate = useNavigate();
    const [tracking_code, setTracking_code] = useState("");

    const searchReport = async() => {
        const resp = await getStatusReport(tracking_code);
        if (resp.error) {
            Swal.fire( 'Error', 'Report not found', 'error');
        } else {
            navigate("/search_grievance", { state: { tracking_code, status: resp.status, message: resp.message }});
        }
    }

    return(
        <div className="follow-up" ref={followUpRef}>
            <div className="title">
                <h3>SEGUIMIENTO A TU DENUNCIA</h3>
                <p>En la Línea Ética, es posible mantenerte en contacto con las personas encargadas de atender tu caso y tener una conversación con ellas de forma anónima. Con tu folio de seguimiento mantente en contacto con tu organización e informado sobre la atención de tu reporte.</p>
            </div>
            <Row className="w-100 m-0 searchbar-container">
                <Col lg="7" md="10" className="mt-20 p-0">
                    <div>
                        <SearchBar 
                            primaryColor={secondaryColor}
                            secondaryColor={primaryColor}
                            primaryColorText={primaryTextColor}
                            secondaryColorText={secondaryTextColor}
                            value={tracking_code}
                            onChange={(e)=>setTracking_code(e.target.value)}
                            placeholder="Escribe tu folio de seguimiento"
                            onClick={searchReport}
                        />
                    </div>                        
                </Col>
            </Row>
            <div id="my-feedback">
                <p className="mt-5 insert">Ingresa tu folio para dar seguimiento a su denuncia:</p>
                <Row className="d-flex justify-content-center">
                    <Col lg="3" md="6" sm="12" className="feedback-item">
                        <img src={FollowUpIcon1} className="complaint_icon" alt="Conoce el status de la investigación" />
                        <small>Conoce el status de la investigación</small>
                    </Col>
                    <Col lg="3" md="6" sm="12" className="feedback-item">
                        <img src={FollowUpIcon2} className="complaint_icon"  alt="Aporta información adicional" />
                        <small>Aporta información adicional</small>
                    </Col>
                    <Col lg="3" md="6" sm="12" className="feedback-item">
                        <img src={FollowUpIcon3} className="complaint_icon" alt="Reincidencias a la denuncia" />
                        <small>Reincidencias a la denuncia</small>
                    </Col>
                    <Col lg="3" md="6" sm="12" className="feedback-item">
                        <img src={FollowUpIcon4} className="complaint_icon" alt="Sube archivos como  evidencias" />
                        <small>Sube archivos como  evidencias</small>
                    </Col>
                </Row>
            </div>
        </div>
    )
}