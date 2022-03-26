import React, {useCallback, useState} from 'react';
import classes from "./notes.module.scss";
import Note from "./note";
import notes from "../../assets/data/notes.json";
import {INote} from "../../types/INote";
import EditNoteForm from "../ui/forms/edit-note/editNoteForm";
import TagInput from "../tag-input/tagInput";

const NotesList = () => {
    const [currentNotes, setNotes] = useState<INote[]>(notes);
    const [tags, setTags] = useState<string[]>(["minecraft"])
    const setNotesCallback: (newNotes: INote[]) => void = useCallback((newNotes: INote[]) => setNotes(newNotes), []);

    return (
        <div className={classes.notes__wrapper}>
            <TagInput onTagChange={setTags} tags={tags} />
            <div className={classes.create__wrapper}>
                <EditNoteForm currentNotes={currentNotes} text="Create Note" setNotes={setNotesCallback} />
            </div>
            <div className={classes.notes}>
                {currentNotes.length ? (currentNotes.map((note: INote) =>
                    <Note key={note.id} note={note} currentNotes={currentNotes} setNotes={setNotesCallback}/>
                )) : (<h1>Nothing Found</h1>)}
            </div>
        </div>
    );

};

export default NotesList;