import { useState } from "react";
import { Link } from "react-router-dom";
import { CDBNavbar, CDBNavBrand, CDBNavItem, CDBBtn, CDBNavToggle, CDBCollapse, CDBNavbarNav } from "cdbreact";
import logo from "../../../assets/images/surdep-logo.png";
import SearchBar from '../../SearchBar/SearchBar';
import { ThemeContext } from "../../../context/AppContext";
import LogoEg from "../../../assets/images/logotipo-ethics-copy.png";
import "./styles.scss";

const ComplaintFormComponent = () => {

    const [collapse2, setCollapse2] = useState(false);

    return (
        <div style={{ width: "100%" }}>
            <div className="header">
                <CDBNavbar className="CDB-container border-0" light expand="md" scrolling>
                    <Link to="/home">
                        <CDBNavBrand >
                            <img src={logo} alt="logo" />
                        </CDBNavBrand>
                    </Link>


                    {/* <CDBBtn className="primary-btn d-md-none d-lg-none btn-movil" color="primary">
                        <Link to="/complaint">DENUNCIAR <span className="txt-hidden">AHORA</span></Link>
                    </CDBBtn>
                    <CDBNavToggle
                        onClick={() => {
                            setCollapse2(!collapse2);
                        }}
                    /> */}
                                       
                    <CDBCollapse id="navbarCollapse1" isOpen={collapse2} navbar>
                        <CDBNavbarNav right>
                            <CDBNavItem>
                                {/* <SearchBar /> */}
                                {/* <CDBBtn className="header-btn-outline" style={{ color: primaryColor, borderColor: primaryColor }} > CÓDIGO DE ÉTICA </CDBBtn>
                                <CDBBtn className="header-btn d-sm-none d-md-block d-lg-block" style={{ backgroundColor: primaryColor, borderColor: secondaryColor }}>
                                    DENUNCIAR <span className="txt-hidden">AHORA</span>
                                </CDBBtn> */}
                                <div className="d-flex">
                                    <span className="mr-2">Powered by</span>
                                    <div>
                                        <img src={LogoEg} alt="logoeg" />
                                    </div>
                                </div>
                            </CDBNavItem>
                        </CDBNavbarNav>
                    </CDBCollapse>
                    
                </CDBNavbar>
            </div>
        </div>
    );
};
export default  ComplaintFormComponent;
