import { useSelector } from "react-redux"
import Button from 'react-bootstrap/Button';
import Icon from "../../Icon/Icon";
import './styles.scss'

export const MCButton = ({
  className = "",
  label="Button",
  variant="",
  outline=false,
  width,
  size,
  icon,
  style,
  onClick=()=>{},
  disabled=false
}) => {

  const { gTheme } = useSelector(state=>state.theme);

  const theme = gTheme!=="light"?"dark":"";

  return (
    <Button 
      className={`mcbtn text-center ${theme} ${className} ${outline?"outline":""}`}
      variant={variant}
      size={size}
      onClick={(e)=>onClick(e)}
      disabled={disabled===true?true:false}
      style={{ 
        ...(!isNaN(width) && { width }),
        ...style
      }}
    >
      { icon && <span className="btn-icon"><Icon name={icon} size={width-6} /></span> }
      {label}
    </Button>
  )
}
