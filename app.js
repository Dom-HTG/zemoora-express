const express = require("express");

const app = express();

const multer = require("multer");
// const upload = multer({ dest: "uploads/" }); Note: by default multer would not supply a file extension for any uploads

/**
 * To handle displaying file extenstion we use the multer diskStorage method
 */
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		// this is used to define the path of upload
		cb(null, "uploads/");
	},
	filename: function (req, file, cb) {
		// this is used to specify the filename
		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9); // this is to prevent two files from having the same name
		const newName = uniqueSuffix + "-" + file.originalname.replace(/\s/g, "-"); // this would create a unique name for the file and also add the file extension
		cb(null, newName);
	},
});

const upload = multer({ storage: storage });

// app.use("/", addUser)

app.get("/", (req, res) => {
	console.log("handler", req.user);
	return res.json({ message: "Data found" });
});

//using multer as middleware
app.post("/uploads", upload.single("file"), (req, res) => {
	// res.status(200).json(req.file) Note: you cannot return a file as JSON response
	res.json({ message: "success" });
});

app.listen(3000, () => console.log("Running on port 3000"));
