import { useEffect, useState } from "react";
import uuid from "react-uuid";
import "./App.css";
import Main from "./Main";
import Sidebar from "./Sidebar";

function App() {
  const [notes, setNotes] = useState( localStorage.notes ? JSON.parse(localStorage.notes) : []);
  const [activeNote, setActiveNote] = useState(false);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

const onAddNote = () => {
  const newNote = {
    id: uuid (),
    title: "Untitled Note",
    body: "",
    lastModified: Date.now(),
  };

  setNotes([newNote, ...notes]);
};
const onUpdateNote = (updatedNote) => {
  const updateNotesArray = notes.map((note) => {
    if (note.id === activeNote) {
      return updatedNote;
    }

    return note;
  });

  setNotes(updateNotesArray);
};

const onDeleteNote = (idToDelete) => {
  setNotes(notes.filter((note) => note.id !== idToDelete));
};

const getActiveNote = () => {
  return notes.find((note) => note.id === activeNote);
};

  return (
  <div>
     <header className="header">
         <h1>NOTE TAKING</h1>
     </header>
     <div className="app">
       <Sidebar 
        notes={notes}
        onAddNote={onAddNote} 
        onDeleteNote={onDeleteNote}
        activeNote={activeNote}
        setActiveNote={setActiveNote}
       /> 
       <Main activeNote={getActiveNote()} onUpdateNote={onUpdateNote} />
     </div>
  </div>  
  );
}

export default App;