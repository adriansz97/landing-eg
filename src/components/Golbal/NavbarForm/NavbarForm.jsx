import { CDBBtn } from "cdbreact";
import logo from "../../../assets/images/logo.png";
import './styles.scss'
import { useIsHovering } from "../../../hooks/useIsHovering";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const NavbarForm = () => {

  const navigate = useNavigate();
  const { primaryColor, primaryColorText } = useSelector(st=>st.theme);
  const [ isHovering, handleMouseOver, handleMouseOut ] = useIsHovering();

  return (
    <div className="navbar-form">
      <div className="logo-containerr">
        <img src={logo} alt="" />
      </div>
      <div className="navbar-form-btns">
          {/* <CDBBtn
            className="hero-btn me-2"
            outline
            style={{
              border: "none",
              backgroundColor: primaryColor,
              color: primaryColorText,
            }}
            // onClick={handleFormClick}
          >
            Seguimiento
          </CDBBtn> */}
          <CDBBtn
            className="hero-btn"
            outline
            style={{
              border: "none",
              backgroundColor: isHovering ? primaryColor : "white",
              color: isHovering ? primaryColorText : "black",
            }}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            onClick={()=>navigate("/")}
          >
            Seguimiento
          </CDBBtn>
      </div>
    </div>
  );
}
