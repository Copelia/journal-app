import { createSlice } from "@reduxjs/toolkit";

export const journalSlice = createSlice({
  name: "journal",
  initialState: {
    isSaving: false,
    messageSaved: "",
    notes: [],
    active: null,
    // active: {
    //   id: 'adad',
    //   title: '',
    //   body: '',
    //   date: 1234567,
    //   imageUrls: []
    // }
  },
  //todo lo que coloquemos en los reducers debe ser síncrono
  reducers: {
    savingNewNote: (state) => {
      state.isSaving = true;
    },
    addNewNote: (state, action) => {
      state.notes.push(action.payload);
      state.isSaving = false;
    },
    setActiveNote: (state, action) => {
      state.active = action.payload;
    },
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
    setSaving: (state) => {
      state.isSaving = true;
      state.messageSaved = '';
    },
    updateNote: (state, action) => {
      //actualizar referencia local
      state.isSaving = false;
      //esto solo se puede hacer con toolkit
      state.notes = state.notes.map(note => {
        //aquí suponiendo que el payload es el de la nota actualizada
        if(note.id === action.payload.id){
          return action.payload;
        }
        return note;
      });

      //mensaje de sweet alert
      state.messageSaved = `${action.payload.title}, actualizada correctamente`;
    },
    setPhotosToActiveNote: (state, action) => {
      // mantener las urls anteriores y concatenar las nuevas
      state.active.imageUrls = [...state.active.imageUrls, ...action.payload];
      state.isSaving = false;
    },
    clearNotesLogout: (state) => {
      state.isSaving = false;
      state.messageSaved = '';
      state.notes = [];
      state.active = null;
    },
    deleteNote: (state, action) => {
      state.active = null;
      // con redux
      state.notes = state.notes.filter(note => note.id !== action.payload)
      //sin redux
      // return {
      //   ...state,
      //   active: null,
      //   notes: state.notes.filter(note => note.id !== action.payload)
      // }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  savingNewNote,
  addNewNote,
  setActiveNote,
  setNotes,
  setSaving,
  updateNote,
  setPhotosToActiveNote,
  clearNotesLogout,
  deleteNote,
} = journalSlice.actions;
