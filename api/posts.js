const express = require("express");
const router = express.Router();

// Posts model
const Posts = require("../models/Posts");

// @routes GET api/posts
// @description GET All posts
router.get("/", async (req, res) => {
	try {
		const posts = await Posts.find();
		if (!posts) throw Error("No items");
		res.status(200).json(posts);
	} catch (err) {
		res.status(400).json({ msg: err });
	}
});

// @routes GET api/posts/:id
// @description GET specific post
router.get("/:id", async (req, res) => {
	try {
		const post = await Posts.findById(req.params.id);
		if (!post) throw Error("No item");
		res.status(200).json(post);
	} catch (err) {
		res.status(400).json({ msg: err });
	}
});

// @routes POST api/posts
// @description Create a post
router.post("/", async (req, res) => {
	const newPost = new Posts(req.body);

	try {
		const post = await newPost.save();
		if (!post) throw Error("Something went wrong while saving the post.");
		res.status(200).json(post);
	} catch (err) {
		res.status(400).json({ msg: err });
	}
});

// @routes DELETE api/posts/:id
// @description delete a post
router.delete("/:id", async (req, res) => {
	try {
		const post = await Posts.findByIdAndDelete(req.params.id);
		if (!post) throw Error("No post found !");
		res.status(200).json({ success: true });
	} catch (err) {
		res.status(400).json({ msg: err });
	}
});

// @routes UPDATE api/posts/:id
// @description update a post
router.patch("/:id", async (req, res) => {
	try {
		const post = await Posts.findByIdAndUpdate(req.params.id, req.body);
		if (!post) throw Error("Something went wrong while updating the post.");
		res.status(200).json({ success: true });
	} catch (err) {
		res.status(400).json({ msg: err });
	}
});

module.exports = router;
