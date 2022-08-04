const Usermodel = require("../model/userModel");
const productModel = require("../model/productModel");
const OrderController = require("../model/orderModel")


const CreateOrder = async function (req, res) {
    try {
        const userId = req.param.userId
        const data = req.body
        const { productId, quatinity, status, items, cancellable } = data

        let product = await productModel.findById({ _id: productId })
        let user = await Usermodel.findById({ _id: userId })
        if (!user) {
            return res.status(404).send({ status: false, msg: "user not exist" })
        }
        if (!product) {
            return res.status(404).send({ Status: false, message: "product  does not exist" })
        }
        if (status || status == "") {
            status = status.toLowerCase()
            if (status == "pending" || status == "completed" || status == "cancelled") {
                data.status = status
            } else {
                return res.status(400).send({ Status: false, message: "Please enter valid status" })
            }
        }
        if (cancellable || cancellable == "") {

            if (typeof cancellable === "boolean") {
                data.cancellable = cancellable
            }
            else {
                return res.status(400).send({ Status: false, message: "Please enter valid cancellable, it must be boolean without having string" })
            }
        }
        if (!quatinity) {
            return res.status(400).send({ status: false, msg: "please give some quatinity" })
        }
        if (!items) {
            return res.status(400).send({ status: false, msg: "please give some item" })
        }
        const createorder = await OrderController.create(data)
        res.status(201).send({ status: true, msg: "order create successfuly", data: createorder })

    }
    catch (error) {
        return res.status(500).send({ status: false, msg: error })
    }


}
module.exports.CreateOrder=CreateOrder

