const express = require("express")
const mongoose = require("mongoose")
require("dotenv").config()

const Routes = require("./routes/ToDoRoutes");

const cors = require("cors")

const app = express()
const PORT = process.env.PORT || 5000

// ✅ Ye line yahan add karo
console.log("MONGO_URI from .env:", process.env.MONGO_URI);

//middle eware
app.use(express.json())
app.use(cors())



mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDb connected"))
    .catch((err) =>console.log(err))

    app.use("/api", Routes)

app.listen(PORT, () => { console.log(`listen at ${PORT}...`) })