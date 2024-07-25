const express = require("express")

const app = express()

const multer = require("multer")
const upload = multer({dest: 'uploads/'})

// app.use("/", addUser)

app.get("/", (req, res) => {
    console.log("handler", req.user)
    return res.json({ message: "Data found"})
})

//using multer as middleware
app.post("/uploads", upload.single('file'), (req, res) => {
    res.status(200).json(req.file)
})

app.listen(3000, () => console.log("Running on port 3000"))