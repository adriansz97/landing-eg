import {useState} from 'react'
import { SearchIcon2 }  from "../Icon";
import './styles.scss';
import { getReportDetail } from '../../apis/apiReports';
const SearchBar = ({placeholder}) => {
    const [search, setSearch] = useState({})
    const handleChange = (e) => {
        setSearch({ ...search, [e.target.name]: e.target.value})
    }
    // const filteredReports = reports.filter ((report) => {
    //     if(report.title.toUpperCase().inlcudes(search.toUpperCase())){
    //         return true;
    //     }
    //     return false;
    // })
    return (
        <div className="custom-search">
            <form className="searchsInputs w-100">
                <div className="searchIcon">
                    <SearchIcon2  />
                </div>
                <input 
                    type="text" 
                    placeholder={placeholder} 
                    id="header-search"
                    name='report'
                    autoComplete='off'
                    onChange={handleChange}
                />
            </form>
        </div>
    );
}

export default SearchBar;
     