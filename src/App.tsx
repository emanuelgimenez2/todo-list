import { useMemo, useState } from "react";
import api from "./api";
import NoteCard from "./components/NoteCard";
import NoteModal from "./components/NoteModal";
import type { Note } from "./types";


function App() {
  const [notes, setNotes] = useState<Note[]>(() => api.notes.list());
  const [draft, setDraft] = useState<null | Partial<Note>>(null);
  const [view, setView] = useState<'active'|'archived'>('active')
  const matches = useMemo(()=> {
    return notes.filter((note)=>{
      if(view==='active'){
        return !note.archived;
      } else if(view ==='archived'){
        return note.archived;
      }
    });
},[notes, view] )

  function handleArchived(id: Note["id"]) {
    setNotes((notes) =>
      notes.map((note) => {
        if (note.id !== id) return note;
        return {
          ...note,
          archived: !note.archived,
        };
      })
    );
  }

  function handleDelete(id: Note["id"]) {
    setNotes((notes) => notes.filter((note) => note.id !== id));
  }

function handleEdit(note:Note){
  setDraft(note);
}
//cada vez que cambie algo en el modal vamos a actualizar el draft con la siguiente funcion 

function handleDraftChange(field:string, value:string){
  setDraft(draft=>({
    ...draft,
    [field]:value,

  }))
}

function handleSave(){
  if (draft?.id){
    setNotes((notes) =>
      notes.map((note) => {
        if (note.id !== draft.id) return note;
        return {
          ...draft,
          lastEdited: new Date().toLocaleDateString(),
        } as Note; 
        })
      );
    } else {
    setNotes((notes)=> 
    notes.concat({
      id: String(+new Date()),
      lastEdited: new Date().toLocaleDateString(),
      ...(draft as Omit <Note,'id'|'lastEdited'>),
    }),
    );
  } 
  setDraft(null)
}
  return (
    <main>
      <div style={{ marginBottom: 24 }}>
        <div style={{display:'flex', gap:50}}>
        <h1>Mis Notas</h1>
        <i className="nes-octocat animate"/>
        </div>
        <div style={{display:'flex', gap:24}}>
        <button
          className="nes-btn"
          onClick={() => setDraft({ })}
        >
          Crear Nota
        </button>
        <button
          className="nes-btn"
          onClick={() => setView(view=>view ==='active'?'archived':'active')}
        >
         {view === 'active' ? 'Ver Archivadas':'Ver Pendientes'}
        </button>
        </div>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(480px, 1fr))",
          gap: 24,
        }}
      >
        {matches.map((note) => (
          <NoteCard
            onDelete={handleDelete}
            onArchive={handleArchived}
            key={note.id}
            note={note}
            onEdit={handleEdit}
          />
        ))}
      </div>
      {draft && <NoteModal note={draft} onSave={handleSave} onChange={handleDraftChange} onClose={() => setDraft(null)} />}
      
    </main>
    
  );
}

export default App;
