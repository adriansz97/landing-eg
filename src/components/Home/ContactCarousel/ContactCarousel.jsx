import Carousel from "react-multi-carousel";
import Icon from '../../Icon/Icon'
import "react-multi-carousel/lib/styles.css";
import "./styles.scss";

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

const ContactCarousel = ({ scrollToRef }) => {
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 5
        },
        tablet: {
            breakpoint: { max: 1024, min: 576 },
            items: 4
        },
        mobile: {
            breakpoint: { max: 576, min: 0 },
            items: 2
        }
    };
    return(
        <div id="contact-carousel">
            <div className="carousel-block">
                <Carousel 
                    arrows={false}
                    responsive={responsive}
                    showDots={true}
                    customLeftArrow={<CustomLeftArrow />}
                    customRightArrow={<CustomRightArrow />}
                >
                    <div className="item">
                        <div className="social-contact">
                            <Icon name="call" />
                        </div>                    
                        <h6>Teléfono</h6>
                    </div>
                    <div className="item">
                        <div className="social-contact" onClick={()=>scrollToRef("BeAgent")}>
                            <Icon name="monitor_mobile" />
                        </div>                    
                        <h6>Sitio Web</h6>
                    </div>
                    <div className="item">
                        <div className="social-contact" onClick={()=>scrollToRef("Download")}>
                            <Icon name="mobile_bold" />
                        </div>                    
                        <h6>App</h6>
                    </div>
                </Carousel>
            </div>
            <div id="noti-message">Si eres testigo de alguna falta a nuestro Código de Ética, no dudes en denunciarlo a través de nuestros canales de denuncia:</div>
        </div>
    )
}

export default ContactCarousel;