import { CDBBtn } from "cdbreact";
import HeroImg from "../../../assets/images/surdep-pp.png";
import { useIsHovering } from "../../../hooks/useIsHovering";
import "./styles.scss";

export const Hero = ({ clientName, scrollToRef, primaryColor, secondaryColor }) => {

    const [ isHovering, handleMouseOver, handleMouseOut ] = useIsHovering();

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
                            <h1 className="my-4 title">LÍNEA ÉTICA <br /> <span className="text-uppercase">{clientName}</span></h1>
                            <div className="hero-btns">
                                <CDBBtn 
                                    className="hero-btn" 
                                    outline 
                                    style={{ border: "none", backgroundColor: primaryColor, color: 'white' }}
                                    onClick={()=>scrollToRef("BeAgent")}>
                                    DENUNCIAR AHORA
                                </CDBBtn>
                                <CDBBtn 
                                    className="hero-btn" 
                                    outline 
                                    style={{ border: "none", backgroundColor: isHovering ? primaryColor : "white", color: isHovering ? "white" : "black" }}
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
