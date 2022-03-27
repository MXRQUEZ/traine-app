import React, {useCallback, useEffect, useState} from 'react';
import classes from "./notes.module.scss";
import Note from "./note";
import notes from "../../assets/data/notes.json";
import {INote} from "../../types/INote";
import EditNoteForm from "../ui/forms/edit-note/editNoteForm";
import TagInput from "../tag-input/tagInput";

const NotesList = () => {
    const [currentNotes, setCurrentNotes] = useState<INote[]>(notes);
    const [allNotes, setAllNotes] = useState<INote[]>(notes);
    const [inputTags, setInputTags] = useState<string[]>([])
    const setAllNotesCallback: (newNotes: INote[]) => void = useCallback((newNotes: INote[]) => {
        setAllNotes(newNotes)
    }, []);

    const handleFilter = useCallback((filterTags: string[]) => {
        const filterResult = allNotes.filter((note: INote) => {
            const result = filterTags.map((tag) => {
                if (!note.tags?.length) return false;
                return note.tags?.some((noteTag) => noteTag.toLocaleLowerCase() === tag.toLocaleLowerCase());
            });
            return !result.includes(false);
        });

        setCurrentNotes(filterResult);
    }, [allNotes]);

    useEffect(() => {
        handleFilter(inputTags)
    }, [allNotes, allNotes.length, handleFilter, inputTags])

    const handleClickAddTag = useCallback((newTag: string) => {
        if (inputTags.includes(newTag)) return;
        const newTags = [...inputTags, newTag];
        setInputTags(newTags);
        handleFilter(newTags);
    }, [handleFilter, inputTags]);

    return (
        <div className={classes.notes__wrapper}>
            <TagInput setTags={setInputTags} tags={inputTags} onFilter={handleFilter} />
            <div className={classes.create__wrapper}>
                <EditNoteForm currentNotes={currentNotes} text="Create Note" setNotes={setAllNotesCallback} />
            </div>
            <div className={classes.notes}>
                {currentNotes.length ? (currentNotes.map((note: INote) =>
                    <Note
                        key={note.id}
                        note={note}
                        currentNotes={allNotes}
                        setNotes={setAllNotesCallback}
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