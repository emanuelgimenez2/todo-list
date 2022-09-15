import type { Note } from "../types";

type Props = {
    note: Note;
    onArchive: (id:Note['id'])=>void
    onDelete: (id:Note['id'])=>void
    onEdit:(note:Note) => void
  };
  

export default function NoteCard({ note,onEdit, onArchive, onDelete }: Props) {
    return (
      <div className="nes-container" >
        <div>
          <h3 className="title">{note.title}</h3>
          <p>Last edited:{note.lastEdited}</p>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <button className="nes-btn" onClick={()=>onArchive(note.id)}>Archivar</button>
          <button className="nes-btn" onClick={()=>onEdit(note)}>Editar</button>
          <button className="nes-btn" onClick={()=>onDelete(note.id)}>Borrar</button>
        </div>
      </div>
    );
  }