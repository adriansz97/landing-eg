import { CDBBtn } from "cdbreact";
import Carousel from "react-multi-carousel";
import announcement_desktop from "../../../assets/images/ilustracion.png";
import announcement_tablet from "../../../assets/images/ilustracion-tablet.png";
import "react-multi-carousel/lib/styles.css";
import "./styles.scss";

const Announcement = () => {
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1
        },
        tablet: {
            breakpoint: { max: 1024, min: 576 },
            items: 1
        },
        mobile: {
            breakpoint: { max: 576, min: 0 },
            items: 1
        }
    };
    return(
        <div id="announcement">
            <div id="announcement-block">
                <Carousel responsive={responsive}>
                    <div className="item">
                        <img src={announcement_desktop} className="d-none d-lg-block" alt="announcement" />
                        <img src={announcement_tablet} className="d-block d-lg-none" alt="announcement" />
                        <div className="ml-0 ml-md-3">
                            <h3>ANUNCIOS ETHICSGLOBAL</h3>
                            <p className="my-4">
                                Mediante el uso del código de seguimiento proporcionado cuando presentó su denuncia, la persona puede en cualquier momento llamar a la línea, o ingresar a esta página en 
                                el campo de dar seguimiento a su denuncia.
                            </p>
                            <CDBBtn outline>CONOCER MÁS </CDBBtn>
                        </div>
                    </div>
                    <div className="item">
                        <img src={announcement_desktop} className="d-none d-lg-block" alt="announcement" />
                        <img src={announcement_tablet} className="d-block d-lg-none" alt="announcement" />
                        <div className="ml-0 ml-md-3">
                            <h3>ANUNCIOS ETHICSGLOBAL</h3>
                            <p className="my-4">
                                Mediante el uso del código de seguimiento proporcionado cuando presentó su denuncia, la persona puede en cualquier momento llamar a la línea, o ingresar a esta página en 
                                el campo de dar seguimiento a su denuncia.
                            </p>
                            <CDBBtn outline>CONOCER MÁS </CDBBtn>
                        </div>
                    </div>
                    <div className="item">
                        <img src={announcement_desktop} className="d-none d-lg-block" alt="announcement" />
                        <img src={announcement_tablet} className="d-block d-lg-none" alt="announcement" />
                        <div className="ml-0 ml-md-3">
                            <h3>ANUNCIOS ETHICSGLOBAL</h3>
                            <p className="my-4">
                                Mediante el uso del código de seguimiento proporcionado cuando presentó su denuncia, la persona puede en cualquier momento llamar a la línea, o ingresar a esta página en 
                                el campo de dar seguimiento a su denuncia.
                            </p>
                            <CDBBtn outline>CONOCER MÁS </CDBBtn>
                        </div>
                    </div>
                </Carousel>
            </div>
        </div>
    )
}

export default Announcement;