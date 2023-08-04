import { CDBBtn } from "cdbreact";
import Pp from "../../../assets/images/pp.png";
import { useIsHovering } from "../../../hooks/useIsHovering";
import "./styles.scss";

export const Hero = ({ infoClient, scrollToRef, primaryColor, secondaryColor, primaryColorText, secondaryColorText }) => {

    const [ isHovering, handleMouseOver, handleMouseOut ] = useIsHovering();

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
                                infoClient?.hero?.title
                                ?   <h1 className="my-4 ms-lg-2 title">{infoClient?.hero?.title}</h1>
                                :   <h1 className="my-4 ms-lg-2 title text-uppercase">Línea Ética de <br /> {infoClient.clientName}</h1>
                            }
                            <div className="hero-btns">
                                <CDBBtn 
                                    className="hero-btn" 
                                    outline 
                                    style={{ border: "none", backgroundColor: primaryColor, color: primaryColorText }}
                                    onClick={()=>scrollToRef("BeAgent")}>
                                    DENUNCIAR AHORA
                                </CDBBtn>
                                <CDBBtn 
                                    className="hero-btn" 
                                    outline 
                                    style={{ border: "none", backgroundColor: isHovering ? primaryColor : "white", color: isHovering ? primaryColorText : "black" }}
                                    onMouseOver={handleMouseOver} 
                                    onMouseOut={handleMouseOut}
                                    onClick={()=>scrollToRef("FollowUp")}>
                                    SEGUIMIENTO DE LA DENUNCIA
                                </CDBBtn>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
		</div>
	);
}
