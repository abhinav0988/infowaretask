const mongoose = require("mongoose");

const isValid = (value) => {
  if (typeof value === "undefined" || value === null) return false;
  if (typeof value === "string" && value.trim().length === 0) return false;
  return true;
};

const isValidName = (Name) => {
  if (/^[A-Za-z ]+$/.test(Name)) return true;
};

const isValidEmail = (Email) => {
  if (/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(Email)) return true;
};

function isValidMobileno(Mobileno) {
  if (/^[6-9][0-9]{9}$/.test(Mobileno)) return true;
  else return false;
}


const isValidPassword = function (Password) {
  let checkPassword = /^[a-zA-Z0-9!@#$%^&*]{8,15}$/;
  if (checkPassword.test(Password)) {
    return true;
  }
  return false;
};

const isValidObjectId = function (userId) {
  return mongoose.Types.ObjectId.isValid(userId);
};

module.exports = {
  isValid,
  isValidEmail,
  isValidName,
  isValidMobileno,
  isValidPassword,
  isValidObjectId
  
  
}