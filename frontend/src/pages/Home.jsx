import {useState, useEffect} from 'react'
import api from "../api"
import Note from '../components/Note';
import "../styles/Home.css"
const Home = () => {
  const [notes, setNotes]= useState([]);
  const [title, setTitle]= useState("");
  const [content, setContent]= useState("");
  const [author, setAuthor]= useState("");

  useEffect(
     ()=>{
      getNotes();
     } 
    ,[])

  const getNotes = () => {
    api
    .get('api/notes/')
    .then((res)=>res.data)
    .then((data)=>{setNotes(data); console.log(data)})
    .catch((err)=>alert(err))
  }

  const deleteNote = (id) => {
    api.delete(`api/notes/delete/${id}/`).then((res) => {
      if (res.status === 204) alert('note deleted successfully');
      else alert('failed to delete');
      getNotes();
    }).catch((error)=> alert(error))
  }

  const createNote = (e) => {
    e.preventDefault()
    api.post('api/notes/', {content, title}).then((res)=>{
      if (res.status === 201) alert("note created successfully");
      else alert("failed to create note");
      getNotes()
    }).catch((error)=>{
      alert(error)
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("1",error.response.data);
        console.log("2",error.response.status);
        console.log("3",error.response.headers);
      } else if ("4",error.request) {
        // The request was made but no response was received
        console.log("5",error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("6",'Error', error.message);
      }
      console.log("7",error.config);
    })
    
  }
  return (
    <div>
      <div>
        <h2>Notes</h2>
        {notes.map((note)=> <Note note={note} onDelete={deleteNote} key={note.id}/>
      )}
      </div>
      <div>
        <form onSubmit={createNote}>
          <label htmlFor="title">Title:</label>
          <br />
          <input type="text" name="title" id="title" required onChange={(e)=>setTitle(e.target.value)} value={title} />
          <br />
          
          <label htmlFor="content">Content:</label>
          <br />
          <textarea name="content" id="content" cols="30" rows="10" required value={content} onChange={(e)=>setContent(e.target.value)}></textarea>
          <br />
          <input type="submit" value="Submit"/>
        </form>
      </div>
    </div>
  )
}

export default Home