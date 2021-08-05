const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.json())
app.use(cors())
app.use(express.static('build'))



let notes = [
    {
      id: 1,
      task: "numba 1",
      description: 'get that number 1 on the test this week!',
      deadline: '2020-09-20'
    },
    {
        id: 2,
        task: "buy a running shoe",
        description: 'get that number 1 on the test this week!',
        deadline: '2020-08-20'
    },
    {
        id: 3,
        task: "numba 3",
        description: 'groceries',
        deadline: '2020-08-21'
    }
]


app.get('/', (req, res) => {
    res.send('<h1>hello world!</h1>')
})

app.get('/testing', (req, res) => {
    res.send('<h1>JUST TESTING</h1>')
})

app.get('/api/tasks', (req, res) => {
    res.json(notes)
})

app.get('/api/tasks/:id', (req, res) => {
    const id = Number(req.params.id)
    const note = notes.find(note => note.id === id)

    if (note) {
        res.json(note)
    } else {
        response.status(404).end()
    }
})

// app.delete('/api/notes/:id', (req, res) => {
//     const id = Number(request.params.id)
//     notes = notes.filter(note => note.id !== id)

//     res.status(204).end()
// })

const generateId = () => {
    const maxId = notes.length > 0
      ? Math.max(...notes.map(n => n.id))
      : 0
    return maxId + 1
  }
  
app.post('/api/tasks', (request, response) => {
    const body = request.body
    console.log(body)
    if (!body.task) {
      return response.status(400).json({ 
        error: 'content missing' 
      })
    }
  
    const note = {
      id: body.id,
      task: body.task,
      description: body.description,
      deadline: body.deadline
    }
  
    notes = notes.concat(note)
  
    response.json(note)
})

app.delete('/api/tasks/:id', (req, res) => {
    const id = Number(req.params.id)

    const note = notes.filter(note => note.id !== id)
    notes = note


    if (note) {
        res.json(note)
    } else {
        response.status(404).end()
    }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})