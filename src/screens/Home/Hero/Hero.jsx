import { CDBBtn } from "cdbreact";
import Pp from "../../../assets/images/pp.png";
import { useIsHovering } from "../../../hooks/useIsHovering";
import "./styles.scss";
import { useNavigate } from "react-router-dom";

export const Hero = ({ campaingName, content, colors, scrollToRef, formType }) => {

    const [ isHovering, handleMouseOver, handleMouseOut ] = useIsHovering();
    const navigate =  useNavigate();

    const handleFormClick = () => {
        if (formType === "page") {
            navigate("/form");
        } else {
            scrollToRef("BeAgent");
        }
    }

	return(
		<div className="home-hero">
            <div className="bg-image"></div>
			<div className="contents">
                <div style={{maxWidth:"1320px", margin:"0 auto"}}>                        
                    <div className="main-text">
                        <div className="main-img-container">
                            <img src={Pp} alt="hero" />
                        </div>
                        <div className="ml-0 ml-md-5">
                            {
                                campaingName
                                ?   <h1 className="my-4 ms-lg-2 title">{campaingName}</h1>
                                :   <h1 className="my-4 ms-lg-2 title text-uppercase">Línea Ética</h1>
                            }
                            <div className="hero-btns">
                                <CDBBtn 
                                    className="hero-btn" 
                                    outline 
                                    style={{ border: "none", backgroundColor: colors.primaryColor, color: colors.primaryTextColor }}
                                    onClick={handleFormClick}>
                                    {content?.grievanceBtn || "Denunciar ahora"}
                                </CDBBtn>
                                <CDBBtn 
                                    className="hero-btn" 
                                    outline 
                                    style={{ border: "none", backgroundColor: isHovering ? colors.primaryColor : "white", color: isHovering ? colors.primaryTextColor : "black" }}
                                    onMouseOver={handleMouseOver} 
                                    onMouseOut={handleMouseOut}
                                    onClick={()=>scrollToRef("FollowUp")}>
                                    {content?.trackBtn || "Seguimiento de la denuncia"}
                                </CDBBtn>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
		</div>
	);
}
