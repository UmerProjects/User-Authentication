import User from "../models/User.js";
import bcrypt from "bcrypt";


export async function Register(req, res) {

  const { first_name, last_name, email, password } = req.body;
  try {

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({
        status: "failed",
        data: [],
        message: "It seems you already have an account, please log in instead.",
      });
       // create an instance of a user
    const newUser = new User({
      first_name,
      last_name,
      email,
      password,
    });

    
    const savedUser = await newUser.save(); // save new user into the database
    const { role, ...user_data } = savedUser._doc;
    res.status(200).json({
      status: "success",
      data: [user_data],
      message:
        "Thank you for registering with us. Your account has been successfully created.",
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      code: 500,
      data: [],
      message: "Internal Server Error",
    });
  }
  res.end();
}

export async function Login(req, res) {
  const { email } = req.body;
  try {
    //check if the user exist

    const user = await User.findOne({ email }).select("+password");
    if (!user)
      return res.status(401).json({
        status: "failed",
        data: [],
        message:
          "Invalid email or password. Please try again with the correct credentials",
      });
    //if user exist validate password
    const ispasswordValid = await bcrypt.compare(
      `${req.body.password}`,
      user.password
    );

    //if not valid return unauthorized response

    if (!ispasswordValid)
      return res.status(401).json({
        status: "failed",
        data: [],
        message:
          "Invalid email or password, Please enter the correct credenctials",
      });
      //return user info except password
        const {password, ...user_data} = user._doc;
        res.status(200).json({
            status: "success",
            data: [user_data],
            message: "You have successfully logged in.",
        });
  } catch (err) {
    res.status(500).json({
        status: "error",
        code: 500,
        data: [],
        message: "Internal Server Error",
    });
  }
  res.end();

}
