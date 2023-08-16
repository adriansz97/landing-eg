import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useIsHovering } from "../../../hooks/useIsHovering";
import Icon from '../../../components/Icon/Icon';
import "./styles.scss";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

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

const getCarouselJustified = (activeChannels) => {

    const { size } = useSelector(state=>state.app);
    
    if ((size==="lg" || size==="xl" || size==="xxl") && activeChannels<5) {
        return "justify-content-center";
    }
    if (size==="md" && activeChannels<4) {
        return "justify-content-center";
    }
    if ((size==="xs" || size==="sm") && activeChannels<2) {
        return "justify-content-center";
    }
    return ""
}

const ItemCarousel = ({ title, icon, iconHover, onClick=()=>{}, colors }) => {

    const [ isHovering, handleMouseOver, handleMouseOut ] = useIsHovering();

    return (
        <div className="item">
            <div className="social-contact" onClick={onClick} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}
            style={{ ...(isHovering && { backgroundColor: colors.primaryColor })  }}>
            {
                isHovering
                ?   <Icon name={iconHover} />
                :   <Icon name={icon} />
            }
            </div>                    
            <h6>{title}</h6>
        </div>
    )
}

// "channels": {
//     "website"
//     "phones"
//     "email"
//     "whatsapp"
//     "chat"
//     "app_mobile"
//     "phone_app"
//     "chat_app"
// },

export const ContactCarousel = ({ content, colors, scrollToRef, formType, channels, infoClient, primaryColor, secondaryColor, }) => {

    const navigate = useNavigate();
    const [activeChannels, setActiveChannels] = useState([]);

    useEffect(() => {
        const newActiveChannels = Object.entries(channels)
        .filter((item) => {
            const [, value] = item;
            if (value === true) return true;
            if (value?.isActive === true) return true;
            return false;
        })
        .map(([key]) => key);
        setActiveChannels(newActiveChannels);
    }, []);

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
                    className={`${getCarouselJustified(activeChannels.length)}`}
                    arrows={false}
                    responsive={responsive}
                    showDots={true}
                    customLeftArrow={<div>izq</div>}
                    customRightArrow={<div>der</div>}
                >
                    {
                        activeChannels.includes("phones") &&
                        <ItemCarousel 
                            title="Teléfono" 
                            icon="call" 
                            iconHover="call_bold2" 
                            colors={colors}
                        />
                    }
                    {
                        activeChannels.includes("website") &&
                        <ItemCarousel 
                            title="Sitio Web" 
                            icon="monitor_mobile" 
                            iconHover="monitor_mobile_bold" 
                            colors={colors}
                            onClick={handleFormClick} 
                        />
                    }
                    {
                        activeChannels.includes("phoneApp") &&
                        <ItemCarousel 
                            title="App" 
                            icon="mobile" 
                            iconHover="mobile_bold" 
                            colors={colors}
                            onClick={()=>scrollToRef("Download")}
                        />
                    }
                </Carousel>
            </div>
            {
                content?.welcomeMsg
                ?   <div className="noti-message">{content?.welcomeMsg}</div>
                :   <div className="noti-message">Si eres testigo de alguna falta a nuestro Código de Ética, no dudes en denunciarlo a través de nuestros canales de denuncia:</div>
            }
            <br />
        </div>
    )
}