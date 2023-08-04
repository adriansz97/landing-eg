import { useSelector } from "react-redux"
import './styles.scss'

export const MCLabel = ({
  text = "",
  className = "",
  isRequired = false,
  ...rest
}) => {
  const { gTheme } = useSelector(state => state.theme);

  const buildClassName = () => {
    let classNameString = className;
    if (gTheme === "dark") classNameString += ` ${gTheme}`;
    if (isRequired) classNameString += " required";
    return classNameString;
  }


  return (
    <label className={buildClassName()} {...rest} >
        {`${text} ${isRequired ? "*" : ""}`}
    </label>
  );
}