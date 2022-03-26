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

    const onChangeTitle = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setTitle(event.target.value)
    }

    const onChangeDescription = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
        setDescription(event.target.value)
    }

    const onSubmitCreateNote = (event: React.FormEvent): void => {
        event.preventDefault();
        const newNote: INote = {
            id: getUniqueId(),
            title,
            description,
        }
        setNotes([...currentNotes, newNote]);
    }

    const onSubmitUpdateNote = (event: React.FormEvent): void => {
        event.preventDefault();
        const existingNoteIndex = currentNotes.findIndex((note: INote) => note.id === editNote!.id);
        currentNotes[existingNoteIndex] = {
            id: currentNotes[existingNoteIndex].id,
            title,
            description,
        }
        setNotes([...currentNotes]);
    }

    const disabled = (!title.length || !description.length)

    return (
        <>
            <Button text={text} icon={icon} onClick={handleOpen} />
            <Modal isActive={isModalActive} onClose={handleClose}>
                <form className={classes.form} onSubmit={editNote ? onSubmitUpdateNote : onSubmitCreateNote}>
                    <h3>Create Note</h3>
                    <Input
                        onChange={onChangeTitle}
                        placeholder="Title"
                        defaultValue={editNote?.title}
                        required
                    />
                    <TextArea
                        onChange={onChangeDescription}
                        placeholder="Description"
                        maxLength={150}
                        defaultValue={editNote?.description}
                        required
                    />
                    <Button disabled={disabled} text="Confirm" type="submit" />
                </form>
            </Modal>
        </>
    );
};

export default EditNoteForm;