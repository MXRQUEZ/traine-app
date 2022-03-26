import React, {FC} from "react";

interface ITagProps {
    name: string,
    index: number,
    onDelete: (index: number, event: React.MouseEvent<HTMLButtonElement>) => void,
    hashtag?: string,
}

const Tag: FC<ITagProps> = ({name, index, onDelete, hashtag}) => {
    const onClickDeleteTag = (event: React.MouseEvent<HTMLButtonElement>) => {
        onDelete(index, event);
    }

    return (
        <li>
            {hashtag && (
                <span style={{color: '#898989', fontWeight: 'bold'}}># </span>
            )}
            {name}
            <button onClick={onClickDeleteTag}>x</button>
        </li>
    );
}

export default Tag;