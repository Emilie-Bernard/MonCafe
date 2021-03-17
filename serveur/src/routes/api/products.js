const express = require("express");
const router = express.Router();

// Load input validation
const validateAddInput = require("../error_handler/products/add");
const validateModifyInput = require("../error_handler/products/modify");

// Load User model
const Product = require("../../models/Product");

router.get("/get/:id", (req, res) => {
    Product.findOne({ _id: req.params.id }).then(product => {
        const response = {
            product: product
        }
        res.status(200).json(response);
    }).catch((err) => {
        console.log(err);
        res.status(500).json({
            error: err,
        });
    });
})

router.post("/getMany", (req, res) => {
    const theType = req.body.type == 0 ? "Drink" : req.body.type == 1 ? "Salty" : "Sweet";
    console.log("type: " + theType + "   shops: " + req.body.shops)
    Product.find({ type: theType, shops: req.body.shops }).then(products => {
        const response = {
            count: products.length,
            products: products.map(doc => {
                return {
                    name: doc.name,
                    description: doc.description,
                    shops: doc.shops,
                    type: doc.type,
                    price: doc.price,
                    image: doc.image,
                    rating: doc.rating,
                    reviews: doc.reviews,
                    _id: doc._id
                };
            })
        };
        res.status(200).json(response);
    }).catch((err) => {
        console.log(err);
        res.status(500).json({
            error: err,
        });
    });
})

router.post("/getProducts", (req, res) => {
    Product.find({ _id: { $in: [req.body.id] }}).then(products => {
        const response = {
            count: products.length,
            products: products.map(doc => {
                return {
                    name: doc.name,
                    description: doc.description,
                    shops: doc.shops,
                    type: doc.type,
                    price: doc.price,
                    image: doc.image,
                    rating: doc.rating,
                    reviews: doc.reviews,
                    _id: doc._id
                };
            })
        };
        res.status(200).json(response);
    }).catch((err) => {
        console.log(err);
        res.status(500).json({
            error: err,
        });
    });
})

router.get("/getByShop/:id", (req, res) => {
    Product.find({ shops: req.params.id }).then(products => {
        const response = {
            count: products.length,
            products: products.map(doc => {
                return {
                    name: doc.name,
                    description: doc.description,
                    shops: doc.shops,
                    type: doc.type,
                    price: doc.price,
                    image: doc.image,
                    rating: doc.rating,
                    reviews: doc.reviews,
                    _id: doc._id
                };
            })
        };
        res.status(200).json(response);
    }).catch((err) => {
        console.log(err);
        res.status(500).json({
            error: err,
        });
    });
})

router.get("/get", (req, res) => {
    Product.find({})
        .then(products => {
            const response = {
                count: products.length,
                products: products.map(doc => {
                    return {
                        name: doc.name,
                        description: doc.description,
                        shops: doc.shops,
                        type: doc.type,
                        price: doc.price,
                        image: doc.image,
                        rating: doc.rating,
                        reviews: doc.reviews,
                        _id: doc._id
                    };
                })
            };
            res.status(200).json(response);
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
})

// @route POST api/shop/add
// @desc add shop
// @access Public
router.post("/add", (req, res) => {
    const { errors, isValid } = validateAddInput(req.body);
    if (!isValid) {
        return res.status(402).json(errors);
    }
    const newProduct = new Product({
        name: req.body.name,
        description: req.body.description,
        shops: req.body.shops,
        type: req.body.type,
        price: req.body.price,
        image: req.body.image
    });
    newProduct
        .save()
        .then(product => res.json(product))
        .catch(err => console.log(err));
});

// @route PATCH api/product/update
// @change product information
// @access Public
router.patch("/update/:id", (req, res) => {
    const { errors, isValid } = validateModifyInput(req.body);
    if (!isValid) {
        return res.status(402).json(errors);
    }
    const updateOps = {};
    if (req.body.name)
        updateOps["name"] = req.body.name;
    if (req.body.description)
        updateOps["description"] = req.body.description;
    if (req.body.type)
        updateOps["type"] = req.body.type;
    if (req.body.price)
        updateOps["price"] = req.body.price;
    if (req.body.image)
        updateOps["image"] = req.body.image;
    if (req.body.rating)
        updateOps["rating"] = req.body.rating;
    if (req.body.reviews)
        updateOps["reviews"] = req.body.reviews;
    // Find product by id
    Product.findOne({ _id: req.params.id }).then(product => {
        // Check if product exists
        if (!product) {
            return res.status(404).json({ idnotfound: "Id not found" });
        }
        // Update product
        Product.updateOne({ _id: req.params.id }, { $set: updateOps })
            .exec()
            .then(result => {
                return res.status(200).json({ success: true, result });
            })
            .catch(err => {
                return res.status(500).json({ error: err });
            });

    }).catch(err => {
        return res.status(500).json({ error: err });
    })
});

router.delete("/delete/:id", (req, res) => {
    // Find product by id
    Product.findOne({ _id: req.params.id }).then(product => {
        // Check if user exists
        if (!product) {
            return res.status(404).json({ idnotfound: "Id not found" });
        }
        // Update user
        Product.deleteOne({ _id: req.params.id })
            .exec()
            .then(result => {
                return res.status(200).json({ success: true });
            })
            .catch(err => {
                return res.status(500).json({ error: err });
            });

    }).catch(err => {
        return res.status(500).json({ error: err });
    })
});

module.exports = router;