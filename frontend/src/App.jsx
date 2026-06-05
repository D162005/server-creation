import React, { useEffect } from 'react'
import './App.css'
import { useState } from 'react'
import axios from 'axios'


const App = () => {

  const [editValue, setEditValue] = useState('')
  const [note, setnote] = useState([{
  title: "note1",
  desc: 'desc1',
  },
  {
    title: "note2",
    desc: 'desc2',
  },
  {
    title: "note3",
    desc: 'desc3',
  }])


  function fatchNotes(){
    axios.get('http://localhost:3000/api/notes')
    .then(res=>{
       setnote(res.data.notes)
    })
  }

  function createNote(e){
    e.preventDefault()

    const {title,desc} = e.target.elements

    axios.post('http://localhost:3000/api/notes',{
      title:title.value,
      desc:desc.value
    })
    .then(res=>{
      fatchNotes()
      console.log(res.data)
    }) 
  }

  
  function handleDeleteButt(idx){
    axios.delete('http://localhost:3000/api/notes/'+idx)
    .then(res=>{
      fatchNotes()
      console.log(res.data)
    })
  }


  function handleEditButt(idx){
    setEditValue(idx)
  }


  function handleSubmitButt(e){
    e.preventDefault()
    const id = editValue
    const {edit} = e.target.elements

    axios.patch('http://localhost:3000/api/notes/'+id,{
      desc:edit.value
    })
    .then(res=>{
      fatchNotes()
      setEditValue('')
    })

  }

  useEffect(() => {
    fatchNotes()
  
  }, [])
  

  return (
    <>
      <form className='note-create-form' onSubmit={createNote}>
        <input type="text" name='title' placeholder='note title' />
        <input type="text" name='desc' placeholder='note desc'/>
        <button>create Note</button>
      </form>

      <div className="notes-container">
        {note.map(note=>{
          return(<div className="note-container">
            <h3>{note.title}</h3>
      
            {editValue === note._id ? <>
              <form className='note-edit-form' onSubmit={handleSubmitButt}>
                <input type="text" name='edit' placeholder='desc' />
                <button>update</button>
              </form>
            </> : <>
              <span>{note.desc}</span>
              <button onClick={()=>{handleEditButt(note._id)}}>Edit</button>
            </>}
            <button onClick={()=>{handleDeleteButt(note._id)}}>Delect</button>
          </div>
          )
        })
        }
      </div>
    </>
  )
}

export default App
