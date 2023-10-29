const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

//use o body-parser para processar dados JSON nas solicitações POST e PUT
app.use(bodyParser.json());

const users = [
    { id: 1, task: "necessario fazer as compras da semana" },
    { id: 2, task: "curso shark educa"},
    { id: 3, task: "hoje é dia 25 de outubro"},
    { id: 4, task: "estudar commits"}
];

app.get('/users',(req, res) => {
    res.json(users)
});

app.get('/',(req, res) => {
    res.send('Olá Caio!');
});

//Rota PUT para atualizar uma tarefa pelo ID
app.put('/users/:id', (req, res) => {
    const idToUpdate = parseInt(req.params.id);
    const updatedTask = req.body;

    const index = users.findIndex(todo => todo.id === idToUpdate);

    if (index !== -1){
        users[index] = updatedTask;
        res.json(updatedTask);
    } else {
        res.status(404).json({error: 'Tarefa não encontrada'});
    }
});

app.get('/home', (req, res) => {
    res.send('....');
});


app.delete('/users/:id', (req, res) => {
    const idToDelete = parseInt(req.params.id);
    const index = users.findIndex(todo => todo.id === idToDelete);

    if (index !== -1) {
        users.splice(index, 1);
        res.sendStatus(204);
    } else {
        res.status(404).json({error: 'Tarefa não encontrada'});
    }
});

//Rota POST para adicionar uma nova tarefa
app.post('/users',(req, res) => {
    const newTodo = req.body;
    users.push(newTodo);
    res.status(201).json(newTodo);
});

app.listen(port, () => {
    console.log(`o servidor esta rodando em http://localhost:${port}`);
});