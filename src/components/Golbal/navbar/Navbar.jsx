import LanguageSelect from "./Language/Language"
import "./styles.scss";

const Navbar = () => {
    return (
        <div className="top_navbar">
            <div className="d-flex align-items-center justify-content-between CDB-container" style={{"height": "40px"}}>
                <p className="m-0"><a href="/dashboard">Powered by Ethics Global</a></p>
                <LanguageSelect />
            </div>
        </div>
    );
};
export default  Navbar;
