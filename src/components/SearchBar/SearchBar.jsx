import { CDBBtn } from 'cdbreact';
import Icon from '../Icon/Icon';
import { useIsHovering } from '../../hooks/useIsHovering';
import './styles.scss';

function SearchBar ({ value, onChange, onClick, placeholder, primaryColor, secondaryColor }) {

    const [ isHovering, handleMouseOver, handleMouseOut ] = useIsHovering();

    return (
        <div className="search-bar-container">
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
            <CDBBtn
                className="search-button"
                style={{ backgroundColor: isHovering ? primaryColor : secondaryColor, border: 'none' }} 
                onMouseOver={handleMouseOver} 
                onMouseOut={handleMouseOut}
                onClick={onClick}    
            > 
                CONTINUAR 
            </CDBBtn>
        </div>
  );
}

export default SearchBar;
