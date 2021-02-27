const express = require("express");
const router = express.Router();

// Load input validation
const validateAddInput = require("../error_handler/commands/add");
const validateModifyInput = require("../error_handler/commands/modify");

// Load User model
const Command = require("../../models/Command");

router.get("/get/:id", (req, res) => {
    Command.findOne({ _id: req.params.id }).then(command => {
        const response = {
            command: command
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
    Command.find({ status: req.body.status, user: req.body.user }).then(commands => {
        const response = {
            count: commands.length,
            commands: commands
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
    Command.find({})
        .then(commands => {
            const response = {
                count: commands.length,
                commands: commands
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
    const newCommand = new Command({
        products: req.body.products,
        status: req.body.status,
        total: req.body.total,
        user: req.body.user
    });
    newCommand
        .save()
        .then(command => res.json(command))
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
    if (req.body.status) {
        if (req.body.status == "Ready")
            updateOps["ready_date"] = Date.now()
        if (req.body.status == "Finish")
            updateOps["finish_date"] = Date.now()
        updateOps["status"] = req.body.status;
    }
    // Find product by id
    Command.findOne({ _id: req.params.id }).then(command => {
        // Check if product exists
        if (!command) {
            return res.status(404).json({ idnotfound: "Id not found" });
        }
        // Update product
        Command.updateOne({ _id: req.params.id }, { $set: updateOps })
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
    // Find command by id
    Command.findOne({ _id: req.params.id }).then(command => {
        // Check if user exists
        if (!command) {
            return res.status(404).json({ idnotfound: "Id not found" });
        }
        // Update user
        Command.deleteOne({ _id: req.params.id })
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