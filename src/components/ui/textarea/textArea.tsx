import React, {FC} from 'react';
import classes from "./textArea.module.scss";

interface ITextAreaProps {
    onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder?: string;
    defaultValue?: string;
    maxLength?: number;
    required?: boolean;
}

const TextArea: FC<ITextAreaProps> = ({onChange, placeholder, defaultValue, required, maxLength}) => {
    return (
        <textarea
            className={classes.textarea}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            maxLength={maxLength}
            defaultValue={defaultValue}
        />
    );
};

export default TextArea;