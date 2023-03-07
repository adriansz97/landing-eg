import { Link } from "react-router-dom";
import { CDBBtn} from "cdbreact";
import HeroImg from "../../../assets/images/hero.png";
import "./styles.scss";

const Hero = () => {
	return(
		<div className="home-hero">
			<div id="contents">
                <div style={{maxWidth:"1320px", margin:"0 auto"}}>                        
                    <div id="main-text">
                        <img src={HeroImg} alt="hero" />
                        <div className="ml-0 ml-md-5">
                            <h1 className="my-4">LALA TE ESCUCHA</h1>
                            <CDBBtn className="primary-white-outline-btn w-160" outline><Link to="/report/complaints">DENUNCIAR</Link></CDBBtn>
                            <CDBBtn className="primary-white-outline-btn w-160" outline><Link to="/report/questions">PREGUNTAR</Link></CDBBtn>
                            <CDBBtn className="primary-white-outline-btn w-160" outline><Link to="/report/suggestions">SUGERIR</Link></CDBBtn>
                            <a className="text-white d-block mt-4" href="{() => false}">¿Como hacer una buena denuncia?</a>
                        </div>
                    </div>
                </div>
            </div>
		</div>
	);
}

export default Hero;