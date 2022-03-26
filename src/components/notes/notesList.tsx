import React, {useCallback, useEffect, useState} from 'react';
import classes from "./notes.module.scss";
import Note from "./note";
import notes from "../../assets/data/notes.json";
import {INote} from "../../types/INote";
import EditNoteForm from "../ui/forms/edit-note/editNoteForm";
import TagInput from "../tag-input/tagInput";

const NotesList = () => {
    const [currentNotes, setNotes] = useState<INote[]>(notes);
    const [allNotes, setAllNotes] = useState<INote[]>(notes);
    const [tags, setTags] = useState<string[]>([])
    const setNotesCallback: (newNotes: INote[]) => void = useCallback((newNotes: INote[]) => {
        setAllNotes(newNotes)
    }, []);

    const handleFilter = useCallback((newTags: string[]) => {
        const filterResult = allNotes.filter((note: INote) => {
            const result = newTags.map((tag) => {
                if (!note.tags?.length) return false;
                return note.tags?.includes(tag);
            });
            return !result.includes(false);
        });

        setNotes(filterResult);
    }, [allNotes]);

    useEffect(() => {
        handleFilter(tags)
    }, [allNotes, allNotes.length, handleFilter, tags])

    const handleClickAddTag = useCallback((newTag: string) => {
        if (tags.includes(newTag)) return;
        const newTags = [...tags, newTag];
        setTags(newTags);
        handleFilter(newTags);
    }, [handleFilter, tags]);



    return (
        <div className={classes.notes__wrapper}>
            <TagInput setTags={setTags} tags={tags} onFilter={handleFilter} />
            <div className={classes.create__wrapper}>
                <EditNoteForm currentNotes={currentNotes} text="Create Note" setNotes={setNotesCallback} />
            </div>
            <div className={classes.notes}>
                {currentNotes.length ? (currentNotes.map((note: INote) =>
                    <Note
                        key={note.id}
                        note={note}
                        currentNotes={allNotes}
                        setNotes={setNotesCallback}
                        onClick={handleClickAddTag}
                    />
                )
                ) : (
                    <h1>Nothing Found</h1>
                )}
            </div>
        </div>
    );

};

export default NotesList;