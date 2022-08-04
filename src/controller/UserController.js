const Usermodel = require("../model/userModel");
const Validator = require("../validator/validator");
const jwt = require("jsonwebtoken");
const {uploadFile} = require("../aws/awsController")




const createUser = async function (req, res) {
  try {
    let data = req.body
    let files = req.files
    if (files && files.length > 0)
    var uploadedFileURL = await uploadFile(files[0]);
   
    
    let { Name, Email, Mobileno, Password} = data;
    data.ProfilePhoto = uploadedFileURL;
    data = JSON.parse(JSON.stringify(data));
    console.log(data)
    

    

    if (Object.keys(data).length === 0)
      res
        .status(400)
        .send({ status: false, message: "body could not be empty" });
 
    
    if (!Validator.isValid(Name))
      return res
        .status(400)
        .send({ status: false, message: "please enter name" });
    if (!Validator.isValidName(Name))
      return res
        .status(400)
        .send({ status: false, message: "please valid name" });
    else {
      data.Name = Name.split(" ")
        .filter((el) => el.trim().length !== 0)
        .join(" ");
    }

    if (!Validator.isValid(Email))
      return res
        .status(400)
        .send({ status: false, message: "please enter email" });
    if (!Validator.isValidEmail(Email))
      return res
        .status(400)
        .send({ status: false, message: "please enter valid email" });
    if (!Validator.isValid(Mobileno))
      return res
        .status(400)
        .send({ status: false, message: "please enter Mobile number" });
    if (!Validator.isValidMobileno(Mobileno))
      return res
        .status(400)
        .send({ status: false, message: "please enter valid Mobile number" });
    if (!Validator.isValid(Password))
      return res
        .status(400)
        .send({ status: false, message: "please enter password" });
    if (!Validator.isValidPassword(Password))
      return res
        .status(400)
        .send({ status: false, message: "please enter valid password" });
    

    const uniqueemail = await Usermodel.findOne({ Email: Email });
    if (uniqueemail)
      return res
        .status(400)
        .send({ status: false, message: "emailId already exist" });
    const uniqueMobileno = await Usermodel.findOne({ Mobileno: Mobileno });
    if (uniqueMobileno)
      return res
        .status(400)
        .send({ status: false, message: "Mobile number already exist" });
   
      
    let result = await Usermodel.create(data);
    return res.status(201).send({
      status: true,
      message: "User created successfully",
      data: result,
    });
  } catch (error) {
     res.status(500).send({ status: false, message: error.message });
  }
};

const loginUser = async function (req, res) {
  try {
    let Email = req.body.Email
    let Password = req.body.Password
    if (!Email) {
      return res
        .status(400)
        .send({ status: false, msg: "please enter email" })
    }
    if (!Password) {
      return res
        .status(400)
        .send({ status: false, msg: "please enter Password" })
    }
    let user = await Usermodel.findOne({ Email: Email })
    if (!user) {
      return res.
        status(404)
        .send({ status: false, message: "user not found" })
    }

    if (user.Password != Password) {
      res.
        status(400)
        .send({ status: false, message: "Incorrect Password!" })
    }




    let token = jwt.sign({
      userId: user._id.toString(),
      company: "infoware"

    }, "abhinav")

    res.status(200).send({ status: true, token: token })
  }
  catch (error) {
    return res.status(500).send({ status: false, msg: error })
  }
}

const updateuser = async function (req, res) {
  try {
    let data = req.params.userId;
    if (!data)
      return res
        .status(400)
        .send({ status: false, message: "please enter Id in param" });
    let result = req.body;
    let files = req.files
    if (files && files.length > 0)
    var uploadedFileURL = await uploadFile(files[0]);

    let { Name, Mobileno, Password } = result;
    result.ProfilePhoto = uploadedFileURL;
    result = JSON.parse(JSON.stringify(result));
    console.log(result)
    


    if (!data)
      return res
        .status(400)
        .send({ status: false, message: "please enter some details" });
    if (!Validator.isValidName(Name))
      return res
        .status(400)
        .send({ status: false, message: "please valid Name" });
    else {
      result.Name = Name.split(" ")
        .filter((el) => el.trim().length !== 0)
        .join(" ");
    }

    if (!Validator.isValidMobileno(Mobileno))
      return res
        .status(400)
        .send({ status: false, message: "please enter valid Mobile number" });

    if (!Validator.isValidPassword(Password))
      return res
        .status(400)
        .send({ status: false, message: "please valid Password" });
    let updateUser = await Usermodel.findOneAndUpdate(
      { _id: data },

      result,

      { new: true }
    );
    return res
      .status(200)
      .send({ status: true, message: "Success", data: updateUser });
  } catch (err) {
    return res
      .status(500)
      .send({
        status: false,
        message: err.message,
      });
  }
};
const DeletedUser = async function (req, res) {
  try {
    let UserId = req.params.userId

    const Deleteduser = await Usermodel.findOneAndUpdate({ _id: UserId, isDeleted: false }, { $set: { isDeleted: true } })
    return res.status(200).send({ status: false, msg: "User doesnot exist", data: Deleteduser })
  }
  catch (err) {
    res.status(500).send({ status: false, error: err.message })
  }
}



module.exports = { createUser, loginUser, updateuser, DeletedUser };
