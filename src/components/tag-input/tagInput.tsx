import React, {FC, useState} from 'react';
import classes from "./tagInput.module.scss";
import TagsList from "../tags/tagsList";

interface ITagInputProps {
    tags: string[],
    setTags: (tags: string[]) => void,
    onFilter: (newTags: string[]) => void;
}

const TagInput: FC<ITagInputProps> = ({tags, setTags, onFilter}) => {
    const [inputValue, setInputValue] = useState<string>("");
    const lowerCaseTags = tags.map((tag) => tag.toLocaleLowerCase());

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.target.value = event.target.value === ',' ? '' : event.target.value;
        setInputValue(event.target.value);
    }

    const addTag = (newTag: string) => {
        if (!lowerCaseTags.includes(newTag)) {
            setInputValue("");
            const newTags = [...tags, newTag];
            setTags(newTags);
            onFilter(newTags);
        }
    }

    const deleteTag = (index: number) => {
        const newTags = tags.slice();

        newTags.splice(index, 1);
        setTags(newTags);
        onFilter(newTags);
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const { key } = event;
        let { currentTarget: {value} } = event;
        switch (key) {
            case 'Enter':
            case ',':
                value = value.trim();
                if (value) {
                    addTag(value);
                    break;
                }
                setInputValue("");
                break;
        }
    }

    return (
        <div className={classes.tagInputWrapper}>
        <TagsList tags={tags} onTagDelete={deleteTag} />
        <input
            name="tagInput"
            className={classes.tagInput}
            placeholder="enter a tag..."
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
        />
      </div>
    );
};

export default TagInput;