import { Link } from "react-router-dom";
import { CDBNavbar, CDBNavBrand, CDBNavItem, CDBBtn, CDBNavToggle, CDBCollapse, CDBNavbarNav } from "cdbreact";
import logo from "../../../assets/images/surdep-logo.png";
import { Icon } from "../../Icon/Icon";
import "./styles.scss";

export const Header = () => {


    return (
        <div className="header-container">
            <div className="header">
                <CDBNavbar className="CDB-container border-0" light expand="md" scrolling>
                    <CDBNavBrand >
                        <div className="navbrand-container">
                            <img src={logo} alt="logo" />
                        </div>
                    </CDBNavBrand>
                    <CDBCollapse navbar>
                        <CDBNavbarNav right>
                            <CDBNavItem>
                                <div className="d-flex">
                                    <span className="mr-2">Powered by</span>
                                    <a href="https://www.ethicsglobal.com/es/index.html" target="_blank">
                                        <div className="logo-ethicsglobal">
                                            <Icon name="eg_color" />
                                        </div>
                                    </a>
                                </div>
                            </CDBNavItem>
                        </CDBNavbarNav>
                    </CDBCollapse>
                    
                </CDBNavbar>
            </div>
        </div>
    );
};
