import { useSelector } from "react-redux"
import Select from 'react-select';

export const MCSelect = ({ options, onChange = () => { }, ...rest }) => {

    const { gTheme } = useSelector(state => state.theme);

    return (
        <Select
            styles={{
                control: (baseStyles, state) => ({
                    ...baseStyles,
                    border: gTheme === "light" ? "solid 1px #e3ebf5" : "solid 1px #363742",
                    backgroundColor: gTheme === "light" ? "#fff" : "#242836",
                }),
                option: (provided, state) => ({
                    ...provided,
                    color: state.isSelected ? state.isFocused ? gTheme === "light" ? "#78909c !important" : "#bdcad0 !important" : '#fff !important' : gTheme === "light" ? "#78909c !important" : "#bdcad0 !important",
                    background: state.isFocused ? gTheme === "light" ? "#f3f7fa" : "#32384d" : '32384d',
                }),
                singleValue: (styles, { data }) => ({
                    ...styles,
                    color: gTheme === "light" ? "#324148 !importtant" : "#b0bec5 !important",
                }),
                placeholder: (provider, state) => ({
                    ...provider,
                    color: gTheme === "light" ? "#324148 !important" : "#b0bec5 !important",
                }),
                menu: (provided, state) => ({
                    ...provided,
                    backgroundColor: gTheme === "light" ? "#fff" : "#242836",
                }),
                menuPortal: base => ({ ...base, zIndex: 9999 })
            }}
            placeholder={<div>Seleccione una opción</div>}
            options={options}
            onChange={(e) => onChange(e)}
            {...rest}
        />
    );
}