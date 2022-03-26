import React, {FC} from 'react';
import classes from "./textArea.module.scss";

interface ITextAreaProps {
    onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    value?: string;
    placeholder?: string;
    defaultValue?: string;
    maxLength?: number;
    required?: boolean;
}

const TextArea: FC<ITextAreaProps> = ({onChange, value, placeholder, defaultValue, required, maxLength}) => {
    return (
        <textarea
            className={classes.textarea}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            maxLength={maxLength}
            defaultValue={defaultValue}
        />
    );
};

export default TextArea;