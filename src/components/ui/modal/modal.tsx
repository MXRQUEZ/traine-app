import React, { FC, useEffect } from "react";
import ReactDom from "react-dom";
import classes from "./modal.module.scss";

interface IModalProps {
    isActive: boolean;
    onClose: () => void;
}

const Modal: FC<IModalProps> = ({ isActive, onClose, children }) => {
    const onClickHandler = (event: React.MouseEvent<HTMLDivElement>) => event.stopPropagation();

    useEffect(() => {
        document.body.style.overflowY = isActive ? "hidden" : "unset";
    }, [isActive]);

    return ReactDom.createPortal(
        <div aria-hidden className={isActive ? `${classes.modal} ${classes.active}` : classes.modal} onClick={onClose}>
            <div aria-hidden className={classes.modal__content} onClick={onClickHandler}>
                {children}
            </div>
        </div>,
        document.getElementById("modal-root")!
    );
};

export default Modal;