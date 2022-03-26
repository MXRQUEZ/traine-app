import React, {FC, useState} from 'react';
import classes from "./tagInput.module.scss";
import TagsList from "../tags/tagsList";

interface ITagInputProps {
    tags?: string[],
    onTagChange: (tags: string[]) => void,
    hashtag?: string,
}

const TagInput: FC<ITagInputProps> = ({tags, onTagChange, hashtag}) => {
    const [inputTags, setTags] = useState<string[]>(tags || []);
    const [inputValue, setInputValue] = useState<string>("");

    const notDuplicate = (tags: string[], newTag: string) => !tags.includes(newTag);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.target.value = event.target.value === ',' ? '' : event.target.value;
        setInputValue(event.target.value);
    }

    const addTag = (tag: string) => {
        if (notDuplicate(inputTags, tag)) {
            setInputValue("");
            setTags([...inputTags, tag]);
            onTagChange(inputTags);
        }
    }

    const deleteTag = (index: number) => {
        const tags = inputTags.slice();

        tags.splice(index, 1);
        setTags(tags);
        onTagChange(inputTags);
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const { key } = event;
        let { currentTarget: {value} } = event;
        switch (key) {
            case 'Enter':
            case ',':
                value = value.trim();
                if (value && notDuplicate(inputTags, value)) {
                    addTag(value);
                    break;
                }
                setInputValue("");
                break;
        }
    }

    return (
        <div className={classes.tagInputWrapper}>
        <TagsList
            tags={inputTags}
            onTagDelete={deleteTag}
            hashtag={hashtag}
        />
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