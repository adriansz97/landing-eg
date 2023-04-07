import Icon from '../Icon/Icon';
import './styles.scss';

function SearchBar ({ value, onChange, placeholder}) {
    return (
        <div className="search">
            <form className="searchsInputs w-100">
                <div className="searchIcon">
                    <Icon name="search2" />
                </div>
                <input 
                    value={value}
                    onChange={onChange}
                    type="text" 
                    placeholder="Consulta aquí tu denuncia" 
                    id="header-search"
                    autoComplete='off'
                />
            </form>
        </div>
  );
}

export default SearchBar;
