const express = require("express");
const {
  createBlogController,
  getAllBlogController,
  updateBlogController,
  getSingleBlogController,
  deleteBlogController,
} = require("../controllers/blogController");

//router object
const router = express.Router();

//routes
//create blog || POST
router.post("/create-blog", createBlogController);

//getAll blog || GET
router.get("/all-blog", getAllBlogController);

//update blog || PUT
router.put("/update-blog/:id", updateBlogController);

//single blog data || GET
// router.get("/get-blog/:id", getSingleBlogController);

//delete blog || DELETE
router.delete("/delete-blog/:id", deleteBlogController);

module.exports = router;
