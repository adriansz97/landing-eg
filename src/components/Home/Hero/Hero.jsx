import { CDBBtn } from "cdbreact";
import HeroImg from "../../../assets/images/surdep-pp.jpg";
import "./styles.scss";
import { useIsHovering } from "../../../hooks/useIsHovering";

const Hero = ({ clientName, scrollToRef, primaryColor, secondaryColor }) => {

    const { isHovering, handleMouseOver, handleMouseOut } = useIsHovering();
    const { isHovering: isHovering2, handleMouseOver: handleMouseOver2, handleMouseOut: handleMouseOut2 } = useIsHovering();

	return(
		<div className="home-hero">
            <div className="bg-image"></div>
			<div id="contents">
                <div style={{maxWidth:"1320px", margin:"0 auto"}}>                        
                    <div id="main-text">
                        <div className="main-img-container">
                            <img src={HeroImg} alt="hero" />
                        </div>
                        <div className="ml-0 ml-md-5">
                            <h1 className="my-4 title">LÍNEA ÉTICA <span className="text-uppercase">{clientName}</span></h1>
                            <CDBBtn 
                                className="hero-btn" 
                                outline 
                                style={{ border: "none", backgroundColor: isHovering ? primaryColor : "white", color: 'black' }}
                                onMouseOver={handleMouseOver} 
                                onMouseOut={handleMouseOut}
                                onClick={()=>scrollToRef("BeAgent")}>
                                DENUNCIAR AHORA
                            </CDBBtn>
                            <CDBBtn 
                                className="hero-btn" 
                                outline 
                                style={{ border: "none", backgroundColor: isHovering2 ? primaryColor : "white", color: 'black' }}
                                onMouseOver={handleMouseOver2} 
                                onMouseOut={handleMouseOut2}
                                onClick={()=>scrollToRef("FollowUp")}>
                                SEGUIMIENTO DE LA DENUNCIA
                            </CDBBtn>
                        </div>
                    </div>
                </div>
            </div>
		</div>
	);
}

export default Hero;