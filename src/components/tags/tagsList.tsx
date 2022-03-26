import React, {FC} from "react";
import classes from "./tags.module.scss";
import Tag from "./tag";

interface ITagsListProps {
    tags: string[],
    onTagDelete: (index: number, event: React.MouseEvent<HTMLButtonElement>) => void,
    hashtag?: string,
}

const TagsList: FC<ITagsListProps> = ({tags, onTagDelete, hashtag}) => {
    const list = tags.map((tag, index) => (
        <Tag
            key={`${tag}-${index}`}
            name={tag}
            onDelete={onTagDelete}
            index={index}
            hashtag={hashtag} />
    ));
    return (
        <ul className={classes.tagsList}>
            {list}
        </ul>
    )
}

export default TagsList;