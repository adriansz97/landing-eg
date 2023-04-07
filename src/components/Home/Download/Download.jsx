import { Row, Col } from "react-bootstrap";
import { CDBBtn, CDBIcon } from "cdbreact";
import App from "../../../assets/images/app.png";
import AppStore from "../../../assets/images/app-store.png";
import GooglePlay from "../../../assets/images/google-play.png";
import "./styles.scss";
import { useIsHovering } from "../../../hooks/useIsHovering";

const Download = ({ primaryColor, secondaryColor }) => {

    const { isHovering, handleMouseOver, handleMouseOut } = useIsHovering();

    return(
        <div className="download">
            <Row className="w-100">
                <Col lg="6" md="12" className="text-center">
                    <div className="download-app-img">
                        <img src={App} alt="Download-App" />
                    </div>
                </Col>
                <Col lg="6" md="12" className="download-info-container">
                    <div className="download-info">
                        <h3>DESCARGA NUESTRA APP</h3>
                        <CDBBtn 
                            style={{ backgroundColor: isHovering ? primaryColor : secondaryColor }} 
                            onMouseOver={handleMouseOver} 
                            onMouseOut={handleMouseOut}
                        >
                            <CDBIcon icon="play-circle"></CDBIcon> VER VIDEO
                        </CDBBtn>
                        <div className="mt-4">
                            Fusce condimentum dignissim ultrices. Ut ac auctor ligula, eu fermentum dolor. In quis ullamcorper risus. Aliquam vel neque ac metus egestas congue a a nunc. 
                            Fusce velit enim, ullamcorper a feugiat vitae, porttitor vel dolor. 
                        </div>
                        <div className="download-methods">
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