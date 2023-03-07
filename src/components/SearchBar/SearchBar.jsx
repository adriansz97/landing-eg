import Icon from '../Icon/Icon';
import './styles.scss';

function SearchBar ({placeholder}) {
    return (
        <div className="search">
            <form className="searchsInputs w-100">
                <div className="searchIcon">
                    <Icon name="search2" />
                </div>
                <input 
                    type="text" 
                    placeholder="Buscar recursos…" 
                    id="header-search"
                    autoComplete='off'
                />
            </form>
        </div>
  );
}

export default SearchBar;
