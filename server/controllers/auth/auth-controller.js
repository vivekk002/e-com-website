const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/user");

//register user
const registerUser = async (req, res) => {
  console.log(req.body);
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(200).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//login user
const logInUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "User not found, please register first",
      });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.json({ success: false, message: "Incorrect password" });
    }
    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
        email: user.email,
        userName: user.username,
      },
      "SECRET_KEY",
      { expiresIn: "1h" }
    );
    res.cookie("token", token, { httpOnly: true, secure: false }).json({
      success: true,
      message: "User logged in successfully",
      token: token,
      user: {
        id: user._id,
        userId: user._id,
        email: user.email,
        role: user.role,
        userName: user.username,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//logout user
const logoutUser = async (req, res) => {
  res
    .clearCookie("token")
    .json({ success: true, message: "User logged out successfully" });
};

//auth middleware
const authMiddleware = async (req, res, next) => {
  let token = req.cookies.token;

  if (!token) {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized - No authentication token found",
    });
  }

  try {
    const decoded = jwt.verify(token, "SECRET_KEY");
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Unauthorized - Invalid or expired token",
    });
  }
};

module.exports = { registerUser, logInUser, logoutUser, authMiddleware };
