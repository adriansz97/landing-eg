import { CDBBtn } from "cdbreact";
import Surtidora from "../../../assets/images/surdep-pp.png";
import Larrabezua from "../../../assets/images/larr-pp.jpg";
import { useIsHovering } from "../../../hooks/useIsHovering";
import "./styles.scss";

export const Hero = ({ infoClient, scrollToRef, primaryColor, secondaryColor, primaryColorText, secondaryColorText }) => {

    const [ isHovering, handleMouseOver, handleMouseOut ] = useIsHovering();

    let HeroImg = Surtidora;
    if (infoClient.clientName.toLowerCase()==="larrabezua grupo empresarial") {
        HeroImg = Larrabezua;
    }

	return(
		<div className="home-hero">
            <div className="bg-image"></div>
			<div className="contents">
                <div style={{maxWidth:"1320px", margin:"0 auto"}}>                        
                    <div className="main-text">
                        <div className="main-img-container">
                            <img src={HeroImg} alt="hero" />
                        </div>
                        <div className="ml-0 ml-md-5">
                            {
                                infoClient?.hero?.title
                                ?   <h1 className="my-4 title">{infoClient?.hero?.title}</h1>
                                :   <h1 className="my-4 title">Línea Ética de <br /> {infoClient.clientName}</h1>
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
