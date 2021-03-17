const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Load input validation
const validateRegisterInput = require("../error_handler/users/signin");
const validateLoginInput = require("../error_handler/users/login");
const validateUserInput = require("../error_handler/users/refresh");
const validateUserModification = require("../error_handler/users/modification");
const validateShopModification = require("../error_handler/users/shopModification");
const validateFavoriteModification = require("../error_handler/users/favoriteModification");

// Load User model
const User = require("../../models/User");
const Shop = require("../../models/Shop");
const Product = require("../../models/Product");

router.get("/getuser/:id", (req, res) => {
    User.findOne({ _id: req.params.id }).then(user => {
        const response = {
            user: user
        }
        res.status(200).json(response);
    }).catch((err) => {
        console.log(err);
        res.status(500).json({
            error: err,
        });
    });
})

router.get("/getusers", (req, res) => {
    User.find({})
        .then(users => {
            const response = {
                count: users.length,
                users: users.map(doc => {
                    return {
                        name: doc.name,
                        email: doc.email,
                        password: doc.password,
                        date: doc.date,
                        favorites: doc.favorites,
                        points: doc.points,
                        shops: doc.shops,
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

// @route POST api/users/signin
// @desc Register user
// @access Public
router.post("/signin", (req, res) => {
    // Form validation
    const { errors, isValid } = validateRegisterInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            console.log("user already exist");
            return res
                .status(400)
                .json({ error: "User already exist" });
        } else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });
            // Hash password before saving in database
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                });
            });
        }
    });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
    console.log("inser signin");
    // Form validation
    const { errors, isValid } = validateLoginInput(req.body);
    // Check validation
    if (!isValid) {
        console.log("invalid body" + req.body);
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;
    // Find user by email
    User.findOne({ email }).then(user => {
        // Check if user exists
        if (!user) {
            console.log("user not found");
            return res.status(404).json({ emailnotfound: "Email not found" });
        }
        // Check password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                console.log("found user");
                // User matched
                // Create JWT Payload
                const payload = {
                    id: user.id,
                    name: user.name,
                    date: user.date,
                    points: user.points,
                    favorites: user.favorites,
                    shops: user.shops,
                };
                // Sign token
                jwt.sign(
                    payload,
                    "secret",
                    {
                        expiresIn: 31556926 // 1 year in seconds
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer " + token
                        });
                    }
                );
            } else {
                console.log("wrong password");
                return res
                    .status(400)
                    .json({ error: "Password incorrect" });
            }
        });
    });
});

// @route PATCH api/users/update
// @change user information
// @access Public
router.patch("/update/:id", (req, res) => {
    // Form validation
    var { errors, isValid } = validateUserModification(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const updateOps = {};
    if (req.body.name)
        updateOps["name"] = req.body.name;
    if (req.body.email)
        updateOps["email"] = req.body.email;
    if (req.body.password) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(req.body.password, salt, (err, hash) => {
                if (err) throw err;
                updateOps["password"] = hash;
            })
        });
    }
    if (req.body.points)
        updateOps["points"] = req.body.points;
    // Find user by id
    User.findOne({ _id: req.params.id }).then(user => {
        // Check if user exists
        if (!user) {
            return res.status(404).json({ idnotfound: "Id not found" });
        }
        // Update user
        User.updateOne({ _id: req.params.id }, { $set: updateOps })
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

router.patch("/addShop", (req, res) => {
    // Form validation
    console.log("Add");
    console.log(req.body);
    var { errors, isValid } = validateShopModification(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    // Find user by id
    Shop.findOne({ _id: req.body.shop }).then(shop => {
        // Check if user exists
        if (!shop) {
            return res.status(404).json({ idnotfound: "Shop not found" });
        }
        User.findOne({ _id: req.body.id }).then(user => {
            // Check if user exists
            if (!user) {
                return res.status(404).json({ idnotfound: "Id not found" });
            }
            user.shops.addToSet(req.body.shop);
            user.save();
            return res.status(200).json({ success: true, shops: user.shops });
        }).catch(err => {
            return res.status(500).json({ error: err });
        });
    }).catch(err => {
        return res.status(500).json({ error: err });
    });
});

router.patch("/deleteShop", (req, res) => {
    // Form validation
    console.log("Delete");
    console.log(req.body);
    var { errors, isValid } = validateShopModification(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    // Find user by id
    User.findOne({ _id: req.body.id }).then(user => {
        // Check if user exists
        if (!user) {
            return res.status(404).json({ idnotfound: "Id not found" });
        }
        user.shops.remove(req.body.shop);
        user.save();
        return res.status(200).json({ success: true, shops: user.shops });
    }).catch(err => {
        return res.status(500).json({ error: err });
    });
});

router.patch("/addFavorite", (req, res) => {
    // Form validation
    console.log("Add favorite");
    console.log(req.body);
    var { errors, isValid } = validateFavoriteModification(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    // Find user by id
    Product.findOne({ _id: req.body.product }).then(product => {
        // Check if user exists
        if (!product) {
            return res.status(404).json({ idnotfound: "Shop not found" });
        }
        User.findOne({ _id: req.body.id }).then(user => {
            // Check if user exists
            if (!user) {
                return res.status(404).json({ idnotfound: "Id not found" });
            }
            user.favorites.addToSet(req.body.product);
            user.save();
            return res.status(200).json({ success: true, favorites: user.favorites });
        }).catch(err => {
            return res.status(500).json({ error: err });
        });
    }).catch(err => {
        return res.status(500).json({ error: err });
    });
});

router.patch("/deleteFavorite", (req, res) => {
    // Form validation
    console.log("Delete favorite");
    console.log(req.body);
    var { errors, isValid } = validateFavoriteModification(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    // Find user by id
    User.findOne({ _id: req.body.id }).then(user => {
        // Check if user exists
        if (!user) {
            return res.status(404).json({ idnotfound: "Id not found" });
        }
        user.favorites.remove(req.body.product);
        user.save();
        return res.status(200).json({ success: true, favorites: user.favorites });
    }).catch(err => {
        return res.status(500).json({ error: err });
    });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/refresh", (req, res) => {
    // Form validation
    console.log("Refresh");
    console.log(req.body);
    id = req.body.id;
    var { errors, isValid } = validateUserInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    // Find user by email
    User.findOne({ _id: id }).then(user => {
        console.log("Pass findOne");
        // Check if user exists
        if (!user) {
            return res.status(404).json({ idnotfound: "Id not found" });
        }
        console.log("Pass check user");
        // Check password
        const payload = {
            id: user.id,
            name: user.name,
            date: user.date,
            points: user.points,
            shops: user.shops,
        };
        // Sign token
        jwt.sign(
            payload,
            "secret",
            {
                expiresIn: 31556926 // 1 year in seconds
            },
            (err, token) => {
                res.json({
                    success: true,
                    token: "Bearer " + token
                });
            }
        );
    }).catch(err => {
        console.log("error");
        return res.status(500).json({ error: err });
    })
});

router.delete("/delete/:id", (req, res) => {
    // Find user by id
    User.findOne({ _id: req.params.id }).then(user => {
        // Check if user exists
        if (!user) {
            return res.status(404).json({ idnotfound: "Id not found" });
        }
        // Update user
        User.deleteOne({ _id: req.params.id })
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