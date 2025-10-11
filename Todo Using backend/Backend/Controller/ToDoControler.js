const ToDoModel = require("../models/TodoModel")

//get
module.exports.getToDos = async (req, res) => {
    const toDos = await ToDoModel.find()
    res.send(toDos)
}

//post
module.exports.saveToDos = (req, res) => {
    console.log("REQ BODY =>", req.body);
    const { toDo } = req.body

    ToDoModel.create({ toDo })
        .then(data => {
            console.log("saved success fully")
            res.status(201).send(data)
            
        })
        .catch((err) => {
            console.log(err)
            res.send({error: err, msg: "something went wrong!!"})
        })

}

//delete
module.exports.deleteToDos = (req, res) => {
    const { id } = req.params

    ToDoModel.findByIdAndDelete(id)
        .then(() => {
            res.status(200).send({ msg: "Deleted Succefully"})
        })
       .catch((err) => {
            console.log(err)
            res.send({error: err, msg: "something went wrong!!"})
        })
}

//save
module.exports.updateToDos = (req, res) => {
    const { id } = req.params
    const { toDo } = req.body

    ToDoModel.findByIdAndUpdate(id, { toDo })
        .then(() => {
            res.status(200).send({ msg: "Updated Successfully" });
        })
        .catch((err) => {
            console.log(err)
            res.send({error: err, msg: "something went wrong!!"})
        })
}