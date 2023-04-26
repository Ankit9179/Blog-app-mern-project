const bcrypt = require("bcrypt"); //library to help you hash passwords
const userModel = require("../models/userModel");
// const { trace } = require("../routes/userRoutes");

//// create user in database
exports.registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    //validation1
    if (!username || !email || !password) {
      return res.status(400).send({
        success: false,
        message: "please fill all fields",
      });
    }
    //exisiting user
    const exisitingUser = await userModel.findOne({ email });
    if (exisitingUser) {
      return res.status(401).send({
        success: false,
        message: "user already exisits",
      });
    }

    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    //save new user
    const user = new userModel({ username, email, password: hashedPassword });
    await user.save();
    return res.status(201).send({
      success: true,
      message: "new user created",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "error in register callback",
      success: false,
      error,
    });
  }
};

////getAllUsers from database
exports.getAllUserController = async (req, res) => {
  try {
    const users = await userModel.find({}); // {} is important when you find all user
    return res.status(200).send({
      userCount: users.length,
      success: true,
      message: "all user data",
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error when you try to get all user",
      error,
    });
  }
};

////login user
exports.loginUserController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).send({
        success: false,
        message: "please provide email and password",
      });
    }
    //user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(200).send({
        success: false,
        message: "email is not registerd",
      });
    }
    //password
    const isMatch = await bcrypt.compare(password, user.password); // most check again - 2
    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: "invalide username and password",
      });
    }
    return res.status(200).send({
      success: true,
      message: "login successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: true,
      message: "error when user try to login",
      error,
    });
  }
};
