import React, {FC} from 'react';
import classes from "./input.module.scss";

interface IInputProps {
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    defaultValue?: string;
    required?: boolean;
}

const Input: FC<IInputProps> = ({onChange, placeholder, defaultValue, required = false}) => {
    return (
        <input
            className={classes.input}
            onChange={onChange}
            required={required}
            placeholder={placeholder}
            defaultValue={defaultValue}
        />
    );
};

export default Input;