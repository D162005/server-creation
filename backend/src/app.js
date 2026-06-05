const express = require('express')
const noteModel = require('./models/note.model')
const cors = require('cors')

const app = express()

app.use(cors())

app.use(express.json())

app.use(express.static('/public'))


app.get('/api/notes', async(req,res)=>{
    const notes = await noteModel.find()
    // console.log(notes)

    res.status(200).json({
        message:'notes are fatch are successfully',
        notes
    })
})

app.post('/api/notes', async(req,res)=>{
    const {title,desc} = req.body

    const note = await noteModel.create({title,desc})
    

    res.status(201).json({
        message:'note created successfully',
        note
    })
})

app.delete('/api/notes/:idx',async(req,res)=>{
    const id = req.params.idx

    await noteModel.findByIdAndDelete(id)

    res.status(200).json({
        message:'note delected successfully'
    })
})

app.patch('/api/notes/:idx', async(req,res)=>{
    const id = req.params.idx

    const desc = req.body.desc

    await noteModel.findByIdAndUpdate(id,{desc})

    res.status(200).json({
        message:'note updated successfully'
    })
})

module.exports = app