import React, {FC, memo, useCallback} from 'react';
import classes from "./notes.module.scss";
import Button from "../ui/button/button";
import { INote } from "../../types/INote";
import EditNoteForm from "../ui/forms/edit-note/editNoteForm";

interface INoteProps {
    note: INote,
    currentNotes: INote[],
    setNotes: (newNotes: INote[]) => void;
    onClick: (newTag: string) => void;
}

const Note: FC<INoteProps> = ({note, currentNotes, setNotes, onClick}) => {
    const trashcanIcon = "fa fa-solid fa-trash-can";
    const editIcon = "fa fa-solid fa-pen-to-square";

    const onClickRemoveNote = (): void => {
        const newNotes = currentNotes.filter((currentNote) => currentNote.id !== note.id);
        setNotes(newNotes);
    }

    const onClickAddTag = useCallback((event: React.MouseEvent<HTMLLIElement>) => {
        onClick(event.currentTarget.dataset.tag as string)
    }, [onClick]);

    const noHashTagDescription = note.description.replace(/#/g, "");

    return (
        <div className={classes.note}>
            <h2 className={classes.note__title}>{note.title}</h2>
            <div className={classes.note__description}>{noHashTagDescription}</div>
            <ul className={classes.note__tags}>{note.tags?.map((tag) =>
                <li key={`${note.id}-${tag}`} data-tag={tag} onClick={onClickAddTag}>
                    {tag}
                </li>
            )}
            </ul>
            <div className={classes.edit__buttons}>
                <EditNoteForm currentNotes={currentNotes} setNotes={setNotes} editNote={note} icon={editIcon} />
                <Button icon={trashcanIcon} onClick={onClickRemoveNote}/>
            </div>
        </div>
    );
};

export default memo(Note);