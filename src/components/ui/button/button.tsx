import React, {FC} from 'react';
import classes from "./button.module.scss";

interface IButtonProps {
    text?: string;
    icon?: string;
    disabled?: boolean;
    onClick?: () => void;
    type?: "submit" | "reset" | "button"
}


const Button: FC<IButtonProps> = ({text, icon, onClick, type= "button", disabled = false }) => (
    <button className={classes.button} onClick={onClick} type={type} disabled={disabled}>
        {icon && <i className={icon} />}
        {text}
    </button>
);

export default Button;