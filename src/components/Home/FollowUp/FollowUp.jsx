import { Col, Row } from "react-bootstrap";
import { CDBBtn } from "cdbreact";
import FollowUpIcon1 from "../../../assets/images/icon8.png";
import FollowUpIcon2 from "../../../assets/images/icon9.png";
import FollowUpIcon3 from "../../../assets/images/icon10.png";
import FollowUpIcon4 from "../../../assets/images/icon11.png";
import SearchBar from '../../SearchBar/SearchBar';
import "./styles.scss";

const FollowUp = () => {
    return(
        <div id="follow-up">
            <div id="title">
                <h3 className="mb-5">SEGUIMIENTO A TU DENUNCIA</h3>
                <p>Por medio de este sitio podrás denunciar aquellas conductas no éticas de manera sencilla, confidencial, segura y con la opción de hacerlo de forma anónima.
                    El sistema es operado por un tercero independiente a Grupo Lala, líder en el país y especialista en la gestión de denuncias y reportes (EthicsGlobal).</p>
                <Row>
                    <Col lg="6" md="10" className="mt-20 p-0 mx-lg-0 mx-auto">
                        <div className="follow-btns">
                            <SearchBar /><CDBBtn className="primary-btn w-160"> CONTINUAR </CDBBtn>
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