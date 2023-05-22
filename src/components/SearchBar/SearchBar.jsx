import { CDBBtn } from 'cdbreact';
import { useIsHovering } from '../../hooks/useIsHovering';
import Icon from '../Icon/Icon';
import './styles.scss';

export const SearchBar = ({ value, onChange, onClick, placeholder, primaryColor, secondaryColor, primaryColorText, secondaryColorText }) => {

    const [ isHovering, handleMouseOver, handleMouseOut ] = useIsHovering();

    return (
        <div className="search-bar-container">
            <div className="search-input-container">
                <div className="search-icon">
                    <Icon name="search2" />
                </div>
                <input
                    className="search-input" 
                    value={value}
                    onChange={onChange}
                    type="text" 
                    placeholder={placeholder}
                    id="header-search"
                    autoComplete='off'
                />
            </div>
            <CDBBtn
                className="search-button"
                style={{ backgroundColor: isHovering ? primaryColor : secondaryColor, color: isHovering ? secondaryColorText : primaryColorText, border: 'none' }} 
                onMouseOver={handleMouseOver} 
                onMouseOut={handleMouseOut}
                onClick={onClick}    
            > 
                CONTINUAR 
            </CDBBtn>
        </div>
  );
}