import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useIsHovering } from "../../../hooks/useIsHovering";
import Icon from '../../../components/Icon/Icon';
import "./styles.scss";
import { useNavigate } from "react-router-dom";

const CustomLeftArrow = () => {
  return (
    <div>izq</div>
  )
}
const CustomRightArrow = () => {
  return (
    <div>der</div>
  )
}

export const ContactCarousel = ({ infoClient, primaryColor, secondaryColor, scrollToRef, formType }) => {

    const navigate = useNavigate();
    const [ isHoveringTel, handleMouseOverTel, handleMouseOutTel ] = useIsHovering();
    const [ isHoveringWeb, handleMouseOverWeb, handleMouseOutWeb ] = useIsHovering();
    const [ isHoveringApp, handleMouseOverApp, handleMouseOutApp ] = useIsHovering();

    const responsive = {
        desktop: {
            breakpoint: { max: 4000, min: 992},
            items: 5
        },
        tablet: {
            breakpoint: { max: 992, min: 768 },
            items: 4
        },
        mobile: {
            breakpoint: { max: 768, min: 0 },
            items: 2
        }
    };

    const handleFormClick = () => {
        if (formType === "page") {
            navigate("/form")
        } else {
            scrollToRef("BeAgent");
        }
    }

    return(
        <div className="contact-carousel">
            <div className="carousel-block">
                <Carousel 
                    arrows={false}
                    responsive={responsive}
                    showDots={true}
                    customLeftArrow={<CustomLeftArrow />}
                    customRightArrow={<CustomRightArrow />}
                >
                    <div className="item">
                        <a href={`tel:${infoClient.phone}`}>
                            <div className="social-contact" onMouseOver={handleMouseOverTel} onMouseOut={handleMouseOutTel}
                                style={{ ...(isHoveringTel && { backgroundColor: primaryColor })  }}>
                                {
                                    isHoveringTel
                                    ?   <Icon name="call_bold2" />
                                    :   <Icon name="call" />
                                }
                            </div>                    
                        </a>
                        <h6>Teléfono</h6>
                    </div>
                    <div className="item">
                        <div className="social-contact" onClick={handleFormClick} onMouseOver={handleMouseOverWeb} onMouseOut={handleMouseOutWeb}
                            style={{ ...(isHoveringWeb && { backgroundColor: primaryColor })  }}>
                            {
                                isHoveringWeb
                                ?   <Icon name="monitor_mobile_bold" />
                                :   <Icon name="monitor_mobile" />
                            }
                        </div>                    
                        <h6>Sitio Web</h6>
                    </div>
                    <div className="item">
                        <div className="social-contact" onClick={()=>scrollToRef("Download")} onMouseOver={handleMouseOverApp} onMouseOut={handleMouseOutApp}
                            style={{ ...(isHoveringApp && { backgroundColor: primaryColor })  }}>
                            {
                                isHoveringApp
                                ?   <Icon name="mobile_bold" />
                                :   <Icon name="mobile" />
                            }
                        </div>
                        <h6>App</h6>
                    </div>
                </Carousel>
            </div>
            {
                infoClient?.carousel?.downText
                ?   <div className="noti-message">{infoClient.carousel.downText}</div>
                :   <div className="noti-message">Si eres testigo de alguna falta a nuestro Código de Ética, no dudes en denunciarlo a través de nuestros canales de denuncia:</div>
            }
            <br />
        </div>
    )
}