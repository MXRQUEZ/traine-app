import React, {FC} from "react";
import classes from "./tags.module.scss";

interface ITagProps {
    name: string,
    index: number,
    onDelete: (index: number, event: React.MouseEvent<HTMLButtonElement>) => void,
}

const Tag: FC<ITagProps> = ({name, index, onDelete}) => {
    const onClickDeleteTag = (event: React.MouseEvent<HTMLButtonElement>) => {
        onDelete(index, event);
    }

    return (
        <li>
            {name}
            <button className={classes.remove__btn} onClick={onClickDeleteTag}>x</button>
        </li>
    );
}

export default Tag;