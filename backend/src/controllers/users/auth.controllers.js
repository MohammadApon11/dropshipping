import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../../utils/generateToken.js";
import User from "../../models/user.model.js";

export const signup = async (req, res) => {
  // res.json({ message: "This is an sign up endpoint" });
  try {
    const {
      fullName,
      userEmail,
      password,
      confirmPassword,
      userMobile,
      shopName,
      shopAddress,
      url,
      gender,
    } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Password don't match" });
    }

    const user = await User.findOne({ userEmail });

    if (user) {
      return res.status(400).json({ error: "user already in exists" });
    }

    // has password here
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?userEmail=${userEmail}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?userEmail=${userEmail}`;

    const newUser = await User({
      fullName,
      userEmail,
      password: hashedPassword,
      userMobile,
      shopName,
      shopAddress,
      url,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    if (newUser) {
      generateTokenAndSetCookie(newUser?._id, res);
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        userEmail: newUser.userEmail,
        userMobile: newUser.userMobile,
        shopName: newUser.shopName,
        shopAddress: newUser.shopAddress,
        url: newUser.url,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ error: "Invaild user data" });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
};
export const login = async (req, res) => {
  try {
    const { userEmail, password } = req.body;
    const user = await User.findOne({ userEmail });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );
    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid userEmail or password" });
    }

    generateTokenAndSetCookie(user?._id, res);

    res.status(201).json({
      _id: user._id,
      fullName: user.fullName,
      userEmail: user.userEmail,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const logout = (req, res) => {
  try {
    res.cookie("jwt", { maxAge: 0 });
    res.status(200).json({ message: "logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
