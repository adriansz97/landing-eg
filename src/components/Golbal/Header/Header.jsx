import { useState } from "react";
import { Link } from "react-router-dom";
import { CDBNavbar, CDBNavBrand, CDBNavItem, CDBBtn, CDBNavToggle, CDBCollapse, CDBNavbarNav } from "cdbreact";
import logo from "../../../assets/images/logo.png";
import SearchBar from '../../SearchBar/SearchBar';
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


                    <CDBBtn className="primary-btn d-md-none d-lg-none btn-movil" color="primary">
                        <Link to="/complaint">DENUNCIAR <span className="txt-hidden">AHORA</span></Link>
                    </CDBBtn>
                    <CDBNavToggle
                        onClick={() => {
                            setCollapse2(!collapse2);
                        }}
                    />
                                       
                    <CDBCollapse id="navbarCollapse1" isOpen={collapse2} navbar>
                        <CDBNavbarNav right>
                            <CDBNavItem>
                                <SearchBar />
                                <CDBBtn className="primary-outline-btn" color="primary" outline> CÓDIGO DE ÉTICA </CDBBtn>
                                <CDBBtn className="primary-btn d-sm-none d-md-block d-lg-block" color="primary">
                                    <Link to="/complaint">DENUNCIAR <span className="txt-hidden">AHORA</span></Link>
                                </CDBBtn>
                            </CDBNavItem>
                        </CDBNavbarNav>
                    </CDBCollapse>
                    
                </CDBNavbar>
            </div>
        </div>
    );
};
export default  ComplaintFormComponent;
