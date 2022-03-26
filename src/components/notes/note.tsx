import React, {FC} from 'react';
import classes from "./notes.module.scss";
import Button from "../ui/button/button";
import {INote} from "../../types/INote";
import EditNoteForm from "../ui/forms/edit-note/editNoteForm";

interface INoteProps {
    note: INote,
    currentNotes: INote[],
    setNotes: (newNotes: INote[]) => void;
}

const Note: FC<INoteProps> = ({note, currentNotes, setNotes}) => {
    const trashcanIcon = "fa fa-solid fa-trash-can";
    const editIcon = "fa fa-solid fa-pen-to-square";

    const onClickRemoveNote = (): void => {
        const newNotes = currentNotes.filter((currentNote) => currentNote.id !== note.id);
        setNotes(newNotes);
    }

    return (
        <div className={classes.note}>
            <h2 className={classes.note__title}>{note.title}</h2>
            <div className={classes.note__description}>{note.description}</div>
            <ul className={classes.note__tags}>{note.tags?.map((tag) => <li key={`${note.id}-${tag}`}>{tag}</li>)}</ul>
            <div className={classes.edit__buttons}>
                <EditNoteForm currentNotes={currentNotes} setNotes={setNotes} editNote={note} icon={editIcon} />
                <Button icon={trashcanIcon} onClick={onClickRemoveNote}/>
            </div>
        </div>
    );
};

export default Note;