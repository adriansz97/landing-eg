import { Row, Col } from "react-bootstrap";
import { CDBBtn, CDBIcon } from "cdbreact";
import App from "../../../assets/images/app.png";
import AppStore from "../../../assets/images/app-store.png";
import GooglePlay from "../../../assets/images/google-play.png";
import "./styles.scss";

const Download = () => {
    return(
        <div id="download">
            <Row>
                <Col lg="6" md="12" className="text-center">
                    <img src={App} alt="Download-App" id="download-app" />
                </Col>
                <Col lg="6" md="12" className="d-flex align-items-center content">
                    <div>
                        <h3>DESCARGA NUESTRA APP</h3>
                        <CDBBtn className="athics-btn w-160 mt-20"><CDBIcon icon="play-circle"></CDBIcon> VER VIDEO</CDBBtn>
                        <p className="my-4">
                            Fusce condimentum dignissim ultrices. Ut ac auctor ligula, eu fermentum dolor. In quis ullamcorper risus. Aliquam vel neque ac metus egestas congue a a nunc. 
                            Fusce velit enim, ullamcorper a feugiat vitae, porttitor vel dolor. 
                        </p>
                        <div className="d-flex align-items-center justify-content-center justify-content-lg-start mb-3">
                            <img src={AppStore} alt="App-Store" className="mr-3" />
                            <img src={GooglePlay} alt="Google-Play" />
                        </div>
                        <small>* Fusce condimentum dignissim ultrices. Ut ac auctor ligula, eu fermentum dolor.</small>
                    </div>
                </Col>
            </Row>
        </div>
    )
}
export default Download;