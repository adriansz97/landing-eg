import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { useSelector } from "react-redux";
import './tooltip.scss';


export const MCTooltip = ({ children, text, position="right", helptip }) => {
    const { gTheme } = useSelector(state => state.theme);

    const renderTooltip = (props) => (
        <Tooltip className={
            gTheme === "dark" ? `dark ${helptip ? "helptip": ""}` : helptip ? "helptip" : ""
        } {...props}>
            {text}
        </Tooltip>
    );

    return (
        <OverlayTrigger
            placement={position}
            overlay={renderTooltip}
        >
            {children}
        </OverlayTrigger>
    )
}