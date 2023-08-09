import { CDBNavbar, CDBNavBrand, CDBNavItem, CDBBtn, CDBNavToggle, CDBCollapse, CDBNavbarNav } from "cdbreact";
import Logo from "../../../assets/images/logo.png";
import Icon from "../../Icon/Icon";
import "./styles.scss";

export const Header = ({ infoClient }) => {
    return (
        <div className="header-container mt-1">
            <div className="header">
                <CDBNavbar className="CDB-container border-0" light expand="md" scrolling>
                    <CDBNavBrand >
                        <div className="navbrand-container">
                            <img src={Logo} alt="logo" />
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
