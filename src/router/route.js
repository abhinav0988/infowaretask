const express = require("express")
const router = express.Router()
const UserController = require("../controller/UserController")
const ProductController = require("../controller/ProductController")
const OrderController= require("../controller/orderController")
const Mw = require("../midllerware/auth")


router.post("/register", UserController.createUser)
router.post("/login", UserController.loginUser)
router.put("/updateuser/:userId", Mw.authenticate, UserController.updateuser)
router.delete("/deleteuser/:userId", Mw.authenticate, UserController.DeletedUser)
router.post("/Product", ProductController.createProduct)
router.post("/order/:userid", OrderController.CreateOrder)


module.exports = router