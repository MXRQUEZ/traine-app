import React, {FC, useState} from 'react';
import Button from "../../button/button";
import Modal from "../../modal/modal";
import classes from "./editNote.module.scss";
import { v4 as getUniqueId } from "uuid";
import {INote} from "../../../../types/INote";
import Input from "../../input/input";
import TextArea from "../../textarea/textArea";

interface IEditFormProps {
    editNote?: INote;
    text?: string;
    icon?: string;
    currentNotes: INote[];
    setNotes: (newNotes: INote[]) => void;
}

const EditNoteForm: FC<IEditFormProps> = ({editNote, text, icon, currentNotes, setNotes}) => {
    const [isModalActive, setModalActive] = useState(false);
    const [title, setTitle] = useState<string>(editNote?.title || "");
    const [description, setDescription] = useState<string>(editNote?.description || "");
    const handleOpen = (): void => setModalActive(true);
    const handleClose = (): void => setModalActive(false);

    const onChangeTitle = (event: React.ChangeEvent<HTMLInputElement>): void => setTitle(event.target.value);
    const onChangeDescription = (event: React.ChangeEvent<HTMLTextAreaElement>): void => setDescription(event.target.value);

    const createTags = () => {
        const descriptionWords = description
            .replace(/[.,/!$%^&*;:{}=\-_`~()]/g,"")
            .split(" ")
            .filter((word) => word);
        const hashTags = descriptionWords.filter((word) => word.startsWith("#") && !word.startsWith("##"));
        return hashTags.map((tag) => tag.substring(1).toLocaleLowerCase());
    }

    const onSubmitCreateNote = (event: React.FormEvent): void => {
        event.preventDefault();
        const tags = createTags();
        const newNote: INote = {
            id: getUniqueId(),
            title,
            description,
            tags,
        }
        setNotes([...currentNotes, newNote]);
        setTitle("");
        setDescription("");
        handleClose();
    }

    const onSubmitUpdateNote = (event: React.FormEvent): void => {
        event.preventDefault();
        const tags = createTags();
        const existingNoteIndex = currentNotes.findIndex((note: INote) => note.id === editNote!.id);
        currentNotes[existingNoteIndex] = {
            id: currentNotes[existingNoteIndex].id,
            title,
            description,
            tags,
        }
        setNotes([...currentNotes]);
        handleClose();
    }

    const disabled = (!title.length || !description.length);

    return (
        <>
            <Button text={text} icon={icon} onClick={handleOpen} />
            <Modal isActive={isModalActive} onClose={handleClose}>
                <form className={classes.form} onSubmit={editNote ? onSubmitUpdateNote : onSubmitCreateNote}>
                    <h3>Note Edit</h3>
                    {editNote ? (
                        <>
                            <Input
                                onChange={onChangeTitle}
                                defaultValue={editNote?.title}
                                placeholder="Title"
                                required
                            />
                            <TextArea
                                onChange={onChangeDescription}
                                defaultValue={editNote?.description}
                                placeholder="Description"
                                maxLength={300}
                                required
                            />
                            <ul className={classes.form__tags}>
                                {editNote.tags?.map((tag, index) =>
                                    <li key={`${tag}-${index}`}>
                                        {tag}
                                    </li>
                                )}
                            </ul>
                        </>
                    ) : (
                        <>
                            <Input
                                onChange={onChangeTitle}
                                value={title}
                                placeholder="Title"
                                required
                            />
                            <TextArea
                                onChange={onChangeDescription}
                                value={description}
                                placeholder="Description"
                                maxLength={300}
                                required
                            />
                        </>
                    )}
                    <Button disabled={disabled} text="Confirm" type="submit" />
                </form>
            </Modal>
        </>
    );
};

export default EditNoteForm;