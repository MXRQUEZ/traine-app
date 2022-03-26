import React, {useCallback, useState} from 'react';
import classes from "./notes.module.scss";
import Note from "./note";
import notes from "../../assets/data/notes.json";
import {INote} from "../../types/INote";
import EditNoteForm from "../ui/forms/edit-note/editNoteForm";

const Notes = () => {
    const [currentNotes, setNotes] = useState<INote[]>(notes);
    const setNotesCallback: (newNotes: INote[]) => void = useCallback((newNotes: INote[]) => setNotes(newNotes), []);

    return (
        <>
            <div className={classes.create__wrapper}>
                <EditNoteForm currentNotes={currentNotes} text="Create Note" setNotes={setNotesCallback} />
            </div>
            <div className={classes.notes}>
                {currentNotes.length ? (currentNotes.map((note: INote) =>
                    <Note key={note.id} note={note} currentNotes={currentNotes} setNotes={setNotesCallback}/>
                )) : (<h1>Nothing Found</h1>)}
            </div>
        </>
    );
};

export default Notes;