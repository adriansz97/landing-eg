import { CDBBtn } from "cdbreact";
// import HeroImg from "../../../assets/images/hero.png";
import HeroImg from "../../../assets/images/surdep-pp.jpg";
import "./styles.scss";

const Hero = ({ clientName, scrollToRef }) => {
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
                            {/* <CDBBtn className="hero-btn" outline style={{ borderColor: "white" }}>DENUNCIAR</CDBBtn>
                            <CDBBtn className="hero-btn" outline style={{ borderColor: "white" }}>PREGUNTAR</CDBBtn>
                            <CDBBtn className="hero-btn" outline style={{ borderColor: "white" }}>SUGERIR</CDBBtn> */}
                            <CDBBtn className="hero-btn" outline style={{ borderColor: "white" }} onClick={()=>scrollToRef("HowItWorks")}>SEGUIMIENTO DE LA DENUNCIA</CDBBtn>
                            <CDBBtn className="hero-btn" outline style={{ borderColor: "white" }} onClick={()=>scrollToRef("FollowUp")}>DENUNCIAR AHORA</CDBBtn>
                            {/* <a className="text-white d-block mt-4" href="{() => false}">¿Como hacer una buena denuncia?</a> */}
                        </div>
                    </div>
                </div>
            </div>
		</div>
	);
}

export default Hero;