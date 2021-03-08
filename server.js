const express = require("express");
const mongoose = require("mongoose");
const { MONGO_URL } = require("./config");

// Routes
const postsRoutes = require("./api/posts");

const app = express();

// Enable CORS
app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Methods",
		"GET,HEAD,OPTIONS,POST,PUT,DELETE,PATCH",
	);
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept, Authorization",
	);
	next();
});

// BodyParser Middleware
app.use(express.json());

// Connect to MongoDB
mongoose
	.connect(MONGO_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	})
	.then(() => console.log("MongoDB connected"))
	.catch((err) => console.log(err));

// User routes
app.use("/api/posts", postsRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server run at port ${PORT}`));
