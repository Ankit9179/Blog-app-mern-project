const blogModel = require("../models/blogModel");

////create blog
exports.createBlogController = async (req, res) => {
  try {
    const { title, description, image } = req.body; //add user in last time
    if (!title || !description || !image) {
      return res.status(400).send({
        success: false,
        message: "please provide  all fields",
      });
    }

    const newBlog = new blogModel({ title, description, image }); // reade

    await newBlog.save();
    return res.status(201).send({
      success: true,
      message: "blog has created successfully",
      newBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "error when try to create blog",
      error,
    });
  }
};

////red all blog
exports.getAllBlogController = async (req, res) => {
  try {
    const blogs = await blogModel.find({});
    if (!blogs) {
      return res.status(200).send({
        success: false,
        message: "no any blog",
      });
    }
    return res.status(200).send({
      success: true,
      countBlog: blogs.length,
      message: "all blog list",
      blogs,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error when try to get all blog",
      error,
    });
  }
};

////update blog       //most important
exports.updateBlogController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image } = req.body;
    const updatedblog = await blogModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    ); // read *********
    return res.status(200).send({
      success: true,
      message: "blog has updated",
      updatedblog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "error while updateing blog",
      error,
    });
  }
};

// ////read single blog
// exports.getSingleBlogController = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const singleBlog = await blogModel.findById(id);
//     if (!singleBlog) {
//       return res.status(404).send({
//         success: false,
//         message: "there is no blog of this id",
//       });
//     }
//     return res.status(200).send({
//       success: true,
//       message: " this is your single blog",
//       singleBlog,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(400).send({
//       success: false,
//       message: "error while read single blog",
//       error,
//     });
//   }
// };

////delete blog
exports.deleteBlogController = async (req, res) => {
  try {
    const { id } = req.params;
    await blogModel.findByIdAndDelete(id);
    return res.status(200).send({
      success: true,
      message: "blog deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "error when tyr to delete blog",
      error,
    });
  }
};
