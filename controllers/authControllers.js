import User from "../models/userModel.js";

// Register a user => /auth/signup
export const signup = async (req, res) => {
  const { userName, fullName, emailId, password } = req.body;

  // Check userName and email if already exists
  const checkUsername = await User.findOne({ userName });
  if (checkUsername) {
    return res.status(401).json({ message: "Username already registered" });
  }
  const checkEmailId = await User.findOne({ emailId });
  if (checkEmailId) {
    return res.status(401).json({ message: "Email already registered" });
  }

  // Check of empty fields
  if (!userName || !fullName || !emailId || !password) {
    return res.status(401).json({ message: "Opps, write all the details" });
  }

  const emailDomain = "test";
  try {
    const user = await User.create({
      userName,
      fullName,
      emailId,
      password,
      emailDomain,
    });
    const token = user.getJwtToken();
    res.status(200).json({ success: true, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login a user => /auth/login
export const login = async (req, res) => {
  const { userName, password } = req.body;

  // checks if username and password is entered by user
  if (!userName || !password) {
    return res.status(400).json({ message: "Please enter email & password" });
  }

  // finding user in database
  const user = await User.findOne({ userName });

  if (!user) {
    return res.status(401).json({ message: "Invalid Username or Password" });
  }

  // checks if password is correct or not
  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return res.status(401).json({ message: "Invalid Username or Password" });
  }

  const token = user.getJwtToken();
  res.status(200).json({
    success: true,
    token,
  });
};
