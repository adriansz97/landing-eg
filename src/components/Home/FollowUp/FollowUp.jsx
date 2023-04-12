import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import FollowUpIcon1 from "../../../assets/images/icon8.png";
import FollowUpIcon2 from "../../../assets/images/icon9.png";
import FollowUpIcon3 from "../../../assets/images/icon10.png";
import FollowUpIcon4 from "../../../assets/images/icon11.png";
import SearchBar from '../../SearchBar/SearchBar';
import "./styles.scss";
import { getReportStatus } from "../../../apis";
import Swal from "sweetalert2";
import { Navigate, useNavigate } from "react-router-dom";

const FollowUp = ({ clientName, followUpRef, primaryColor, secondaryColor }) => {

    const navigate = useNavigate();
    const [tracking_code, setTracking_code] = useState("");

    const searchReport = async() => {
        const resp = await getReportStatus(tracking_code);
        if (resp.error) {
            Swal.fire(
                'Error',
                'Report not found',
                'error'
            )
        } else {
            navigate("/search_grievance", { state: { tracking_code, status: resp.message }});
            // Swal.fire(
            //     `${tracking_code}`,
            //     `The report status is: ${resp.message}`,
            //     'success'
            // )
        }
    }

    return(
        <div id="follow-up">
            <div id="title">
                <h3 ref={followUpRef}>SEGUIMIENTO A TU DENUNCIA</h3>
                <p>Por medio de este sitio podrás denunciar aquellas conductas no éticas de manera sencilla, confidencial, segura y con la opción de hacerlo de forma anónima.
                    El sistema es operado por un tercero independiente a {clientName}, líder en el país y especialista en la gestión de denuncias y reportes (EthicsGlobal).</p>
                <Row>
                    <Col lg="6" md="10" className="mt-20 p-0">
                        <div className="follow-btns w-100">
                            <SearchBar 
                                primaryColor={secondaryColor}
                                secondaryColor={primaryColor}
                                value={tracking_code}
                                onChange={(e)=>setTracking_code(e.target.value)}
                                placeholder="Escribe tu folio de seguimiento"
                                onClick={searchReport}
                            />
                        </div>                        
                    </Col>
                </Row>
            </div>
            <div id="my-feedback">
                <p className="mt-5">Ingresa tu folio para dar seguimiento a su denuncia:</p>
                <Row>
                    <Col lg="3" md="6" sm="12" className="d-flex align-items-center justify-xs-content-center justify-content-start mt-20">
                        <img src={FollowUpIcon1} className="complaint_icon mr-3" alt="Conoce el status de la investigación" />
                        <small>Conoce el status de la investigación</small>
                    </Col>
                    <Col lg="3" md="6" sm="12" className="d-flex align-items-center justify-xs-content-center justify-content-start mt-20">
                        <img src={FollowUpIcon2} className="complaint_icon mr-3"  alt="Aporta información adicional" />
                        <small>Aporta información adicional</small>
                    </Col>
                    <Col lg="3" md="6" sm="12" className="d-flex align-items-center justify-xs-content-center justify-content-start mt-20">
                        <img src={FollowUpIcon3} className="complaint_icon mr-3" alt="Reincidencias a la denuncia" />
                        <small>Reincidencias a la denuncia</small>
                    </Col>
                    <Col lg="3" md="6" sm="12" className="d-flex align-items-center justify-xs-content-center justify-content-start mt-20">
                        <img src={FollowUpIcon4} className="complaint_icon mr-3" alt="Sube archivos como  evidencias" />
                        <small>Sube archivos como  evidencias</small>
                    </Col>
                </Row>
            </div>
        </div>
    )
}
export default FollowUp;