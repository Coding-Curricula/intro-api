const express = require('express')
const app = express()
const fs = require('fs')

app.use(express.json())

// in memory data store
let todos = [
    { id: 1, title: 'Learn Node.js', completed: true },
    { id: 2, title: 'Learn React.js', completed: false },
    { id: 3, title: 'Learn Next.js', completed: false }
]

// get all todos
app.get('/api/todos', (req, res) => {
    res.status(200).json(todos)
})

// get a todo by id
app.get('/api/todos/:id', (req, res) => {
    const todo = todos.find(todo => todo.id === parseInt(req.params.id))

    if (todo) {
        res.status(200).json(todo)
    } else {
        res.status(404).json({ message: `Todo ${req.params.id} not found` })
    }
})

// create a todo
app.post('/api/todos', (req, res) => {
    const newTodo = req.body;
    newTodo.id = generateId();
    todos.push(newTodo);
    res.status(201).json(newTodo);
})


// generate id
const generateId = () => {
    const maxId = todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) : 0
    return maxId + 1
}

// update a todo
app.put('/api/todos/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const todo = todos.find(todo => todo.id === id)
    const updatedTodo = req.body

    try {
        if (todo) {
            const updatedTodos = todos.map(todo => {
                if (todo.id === id) {
                    return { ...todo, ...updatedTodo }
                } else {
                    return todo
                }
            })
            todos = updatedTodos
            res.status(200).json(todos)
        } else {
            res.status(404).json({ message: `Todo ${id} not found` })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// delete a todo
app.delete('/api/todos/:id', (req, res) => {
    const todoIndex = todos.findIndex(todo => todo.id === parseInt(req.params.id))

    if (todoIndex !== -1) {
        const deletedTodo = todos.splice(todoIndex, 1)
        res.json(deletedTodo[0])
    } else {
        res.status(404).json({ message: `Todo ${req.params.id} not found` })
    }
})

const PORT = 8080

app.get('/', (req, res) => {
    res.send('HELLO TEAM!');
})

// server index.html
app.get('/home', (req, res) => {
    fs.readFile('./index.html', (err, data) => {
        if (err) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'text/plain');
            res.end('Internal Server Error');
        }
        else {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.end(data);
        }
    });
})



app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
})