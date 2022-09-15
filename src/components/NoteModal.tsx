import type { Note } from "../types";

type Props = {
    note: Partial<Note>; //partial porque voy a recibir una parte para editar en el modal una nota
    onClose: VoidFunction; //no recibe parametros ni devuelve nada
    onChange: (field:string, value:string)=>void;
    onSave:VoidFunction;
  };
  
export default function NoteModal({note, onClose, onChange, onSave }: Props) {
    return (
      <section
        className="nes-dialog"
        style={{
          width: "100vw",
          height: "100vh",
          position: "fixed",
          top: 0,
          left: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            backgroundColor: "rgba(0,0,0,0.2)",
            width: "100%",
            height: "100%",
          }}
        />
        <form
          method="dialog"
          style={{
            backgroundColor: "white",
            zIndex: 1,
            padding: 12,
            border: "4px solid black",
          }}
        >
          <h1 className="title">Create / Edit note</h1>
          <div className="nes-field">
            <label htmlFor="title">Title</label>
            <input onChange={(event)=>onChange('title',event.target.value)} value={note.title|| ''} id="title" className="nes-input" />
          </div>
          <div className="nes-field">
            <label htmlFor="content">Content</label>
            <textarea onChange={(event)=>onChange('content',event.target.value)} value={note.content|| ''} id="content" className="nes-textarea" />
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 24,
              alignItems: "center",
              justifyContent: "space-between",
            }}
            className="dialog-div"
          >
            <button className="nes-btn" onClick={onClose}>
              Close
            </button>
            <button className="nes-btn is-primary" onClick={onSave}>Save</button>
          </div>
        </form>
      </section>
    );
  }
  