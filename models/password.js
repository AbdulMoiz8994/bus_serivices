const mongoose=require("mongoose");

const passwordContact=new mongoose.Schema({
    password:{
        type: String,
        required: [true, "Password should be filled"],
    }
});

module.exports= mongoose.model("Password", passwordContact);