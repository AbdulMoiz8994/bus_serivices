const { Router } = require("express");
const bycrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");

const Password = require("../models/password");

const router = Router();

router.post(
  "/set-password",
  asyncHandler(async (req, res) => {
    const { password } = req.body;
    console.log("password", password);
    try {
      const salt = 10;
      const hashPassword =await bycrypt.hash(password, bycrypt.genSaltSync(10));
       console.log(hashPassword);
       const existingPassword = await Password.findOne();
    //    check if the existing password save then update with the new one
       if (existingPassword) {
        console.log("ex", existingPassword);
         existingPassword.password = hashPassword;
         await existingPassword.save();
       } else {
         await Password.create({
            password: hashPassword
         });
       }
   
       return res
         .status(201)
         .json({ message: 'The Password has been set successfully' });
    } catch (err) {
    return    res
        .status(500)
        .json({ msg: "The Password is not set successfully" });
    }
  })
);

module.exports = router;
