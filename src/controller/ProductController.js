const productModel = require("../model/productModel");

const createProduct = async function (req, res) {
    try {
        let Data = req.body;
        let { ProductName, color, size ,price} = Data;


        if (Object.keys(Data).length == 0) {
            return res.status(400).send({
                status: false,
                msg: " req body can't be empty, BAD REQUEST",
            });
        }
        if (!ProductName) {
            return res.status(400).send({
                status: false,
                msg: "Name is required",
            });
        }

        if (!color) {
            return res.status(400).send({
                status: false,
                msg: "color is required",
            });
        }
        if (!size) {
            return res.status(400).send({
                status: false,
                msg: "size is required",
            });
        }
        if (!price) {
            return res.status(400).send({
                status: false,
                msg: "price is required",
            });
        }

        let productCreated = await productModel.create(Data);

        return res.status(201).send({
            status: true,
            msg: "product created successfully",
            data: productCreated,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: error.message });
    }
};



module.exports.createProduct=createProduct