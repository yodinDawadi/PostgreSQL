const User = require("../models/user");
const bcrypt = require("bcrypt");

const signup = async (req,res)=>{
    try {
        const { username,email,password } = req.body;
        const existingUser =await User.findOne({
            where: {email}
        });
        if(existingUser) {
            res.status(400).json({
                message: 'Email Already Registered'
            })
        }
        const salt = await bcrypt.genSalt(10); //Generating salt of length 10
        const hashedPassword = await bcrypt.hash(password,salt); //hashing the original password

        const user = await User.create({ //creating user
            username,
            email,
            password: hashedPassword,
        });
        res.status(201).json({
            message: 'User Registered Sucessfully',
            user: {
                uid: user.uid,
                username: user.username,
                email: user.email,
            }
        })
        
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}




const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: { email },
    });
    if (!user) {
      return res.status(404).json({
        message: "User Not Found !!",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      return res.status(200).json({
        message: "Login sucessfull",
        user: {
          uid: user.uid,
          username: user.username,
          email: user.email,
        },
      });
    } else {
      res.status(401).json({
        message: "Invalid Credintials",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = {login,signup}