import { useSelector } from "react-redux"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './styles.scss'

export const MCCheckbox = ({ className = "", onChange = () => { }, ...rest }) => {
  return (
    <input
      type="checkbox"
      className={`form-check-input ${className}`}
      onChange={onChange}
      {...rest} 
    />
  );
}


export const MCRadio = ({ className = "", onChange = () => { }, ...rest }) => {
  return (
    <input
      type="radio"
      className={`form-check-input ${className}`}
      onChange={onChange}
      {...rest}
    />
  )
}


export const MCInput = ({ type = "text", className = "", isValid = true, onChange = () => {}, value, ...rest }) => {

  const { gTheme } = useSelector(state => state.theme);

  const buildClassName = () => {
    let classNameString = className;
    if (gTheme === "dark") classNameString += ` ${gTheme}`;
    if (!isValid) classNameString += " is-invalid";
    return classNameString;
  }

  if (type === "textarea") {
    return (
      <textarea
        type="text"
        className={`form-control ${buildClassName()}`}
        onChange={onChange}
        {...rest}
      />
    )
  }

  if (type === "date") {
    return (
      <DatePicker
        className={`${buildClassName()}`}
        selected={value}
        dateFormat="dd/MM/yy"
        onChange={onChange}
        {...rest}
        
      />
    )
  }

  return (
    <input
      type={type}
      className={`form-control ${buildClassName()}`}
      onChange={onChange}
      {...rest}
    />
  )
}

