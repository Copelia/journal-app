import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { db } from "../../firebase/config";
import {
  addNewNote,
  savingNewNote,
  setActiveNote,
  setNotes,
  setSaving,
  updateNote,
  setPhotosToActiveNote,
  deleteNote
} from "./journalSlice";
import { loadNotes } from "../../helpers/loadNotes";
import { fileUpload } from "../../helpers/fileUpload";

export const startNewNote = () => {
  return async (dispatch, getState) => {
    dispatch(savingNewNote());

    const uid = getState().auth.uid;
    const newNote = {
      title: "",
      body: "",
      date: new Date().getTime(),
    };

    const newDoc = doc(collection(db, `${uid}/journal/notes`));
    await setDoc(newDoc, newNote);
    newNote.id = newNote.id;

    dispatch(addNewNote(newNote));
    dispatch(setActiveNote(newNote));
  };
};

export const startLoadingNotes = () => {
  return async (dispatch, getState) => {
    const uid = getState().auth.uid;
    const notes = await loadNotes(uid);

    dispatch(setNotes(notes));
  };
};

export const startSavingNote = () => {
  return async (dispatch, getState) => {
    dispatch(setSaving());
    const uid = getState().auth.uid;
    const { active: note } = getState().journal;

    //remover id de nota activa
    const noteToFireStore = { ...note };
    delete noteToFireStore.id;

    //hacer referencia al doc que quiero actualizar
    // const docRef = doc(collection(db, `${uid}/journal/notes/${note.id}`));
    // await setdDoc(docRef, noteToFireStore, {merge: true});

    if (!note.url) {
      delete noteToFireStore.url;
    }
    const firestoreDoc = doc(db, `${uid}`, "journal", "notes", `${note.id}`);
    await setDoc(firestoreDoc, noteToFireStore);

    dispatch(updateNote(note));
  };
};

export const startUploadingFiles = (files = []) => {
  return async (dispatch) => {
    dispatch(setSaving());
    // await fileUpload(files[0]);

    const fileUploadPromises = [];
    // crear el arreglo de promesas
    for (const file of files) {
      fileUploadPromises.push(fileUpload(file));
    }

    const photosUrls = await Promise.all(fileUploadPromises);
    dispatch(setPhotosToActiveNote(photosUrls));
  };
};

export const startDeletingNote = () => {
  return async(dispatch, getState) => {
    const { uid } = getState().auth;
    const { active:note } = getState().journal;

    const docRef = doc(db, `${uid}/journal/notes/${note.id}`);
    //borrar de firebase
    await deleteDoc(docRef);

    //borrar de data local
    dispatch(deleteNote(note.id));
  };
};
