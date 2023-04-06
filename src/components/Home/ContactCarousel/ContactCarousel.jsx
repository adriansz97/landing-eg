import Carousel from "react-multi-carousel";
import Icon from '../../Icon/Icon'
import "react-multi-carousel/lib/styles.css";
import "./styles.scss";

const ContactCarousel = () => {
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
            <div id="carousel-block">
                <Carousel responsive={responsive}>
                    <div className="item">
                        <div className="social-contact">
                            <Icon name="call" />
                        </div>                    
                        <h6>Teléfono</h6>
                    </div>
                    <div className="item">
                        <div className="social-contact">
                            <Icon name="monitor_mobile" />
                        </div>                    
                        <h6>Sitio Web</h6>
                    </div>
                    <div className="item">
                        <div className="social-contact">
                            <Icon name="outgoing_call" />
                        </div>                    
                        <h6>Whatsapp</h6>
                    </div>
                    <div className="item">
                        <div className="social-contact">
                            <Icon name="outline_messages_3" />
                        </div>                    
                        <h6>Chat</h6>
                    </div>
                    <div className="item">
                        <div className="social-contact">
                            <Icon name="mobile_bold" />
                        </div>                    
                        <h6>App</h6>
                    </div>
                    <div className="item">
                        <div className="social-contact">
                            <Icon name="call" />
                        </div>                    
                        <h6>Teléfono</h6>
                    </div>
                    <div className="item">
                        <div className="social-contact">
                            <Icon name="monitor_mobile" />
                        </div>                    
                        <h6>Sitio Web</h6>
                    </div>
                    <div className="item">
                        <div className="social-contact">
                            <Icon name="outgoing_call" />
                        </div>                    
                        <h6>Whatsapp</h6>
                    </div>
                    <div className="item">
                        <div className="social-contact">
                            <Icon name="outline_messages_3" />
                        </div>                    
                        <h6>Chat</h6>
                    </div>
                    <div className="item">
                        <div className="social-contact">
                            <Icon name="mobile_bold" />
                        </div>                    
                        <h6>App</h6>
                    </div>
                </Carousel>
                <div id="message-noti">
                    <Icon name="bold_message_notif" />
                </div>                
            </div>
        </div>
    )
}

export default ContactCarousel;