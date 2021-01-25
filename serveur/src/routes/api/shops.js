const express = require("express");
const router = express.Router();

// Load input validation
const validateAddInput = require("../error_handler/shops/add");

// Load User model
const Shop = require("../../models/Shop");

router.get("/get/:id", (req, res) => {
    Shop.findOne({ _id: req.params.id }).then(shop => {
        const response = {
            shop: shop
        }
        res.status(200).json(response);
    }).catch((err) => {
        console.log(err);
        res.status(500).json({
            error: err,
        });
    });
})

router.get("/get", (req, res) => {
    Shop.find({})
        .then(shops => {
            const response = {
                count: shops.length,
                shops: shops.map(doc => {
                    return {
                        title: doc.title,
                        description: doc.description,
                        address: doc.address,
                        image: doc.image,
                        coordinate: doc.coordinate,
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
    const newShop = new Shop({
        title: req.body.title,
        description: req.body.description,
        address: req.body.address,
        image: req.body.image,
        coordinate: { latitude: req.body.latitude, longitude: req.body.longitude }
    });
    newShop
        .save()
        .then(shop => res.json(shop))
        .catch(err => console.log(err));
});

// @route PATCH api/shop/update
// @change shop information
// @access Public
router.patch("/update/:id", (req, res) => {
    const updateOps = {};
    if (req.body.title)
        updateOps["title"] = req.body.title;
    if (req.body.description)
        updateOps["description"] = req.body.description;
    if (req.body.address)
        updateOps["address"] = req.body.address;
    if (req.body.image)
        updateOps["image"] = req.body.image;
    if (req.body.latitude)
        updateOps["coordinate.latitude"] = req.body.latitude;
    if (req.body.longitude)
        updateOps["coordinate.longitude"] = req.body.longitude;
    if (req.body.rating)
        updateOps["rating"] = req.body.rating;
    if (req.body.reviews)
        updateOps["reviews"] = req.body.reviews;
    // Find shop by id
    Shop.findOne({ _id: req.params.id }).then(shop => {
        // Check if shop exists
        if (!shop) {
            return res.status(404).json({ idnotfound: "Id not found" });
        }
        // Update shop
        Shop.updateOne({ _id: req.params.id }, { $set: updateOps })
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

router.delete("/delete/:id", (req, res) => {
    // Find user by id
    Shop.findOne({ _id: req.params.id }).then(shop => {
        // Check if user exists
        if (!shop) {
            return res.status(404).json({ idnotfound: "Id not found" });
        }
        // Update user
        Shop.deleteOne({ _id: req.params.id })
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