import express from "express";

const router = express.Router();

import Memory from "./../mongodb/memory-model";

router.post("/get-memories", (req, res) => {
    const userId = req.body.userId;

    Memory.find({ userId }, (err, memories) => {
        if (err) {
            console.log(err);
        };

        res.send({ memories });
    });
});

router.post("/add-memory", (req, res) => {
    const { userId, description, createdAt, note } = req.body.memory;

    if (
        typeof userId === "string" &&
        typeof description === "string" &&
        typeof note === "string" &&
        typeof createdAt === "number" &&
        description.length > 0 &&
        userId === req.user.id
    ) {
        new Memory(req.body.memory).save((err, memory) => {
            if (err) {
                res.status(400).send({ message: "Something went wrong, this is not your fault" });
            } else {
                res.send(memory.id);
            }
        })
    } else {
        res.status(400).send({ message: "Something went wrong, this is not your fault" });
    }
});

let hello = true;

router.post("/remove-memory", (req, res) => {
    const _id = req.body.id;

    if (
        typeof _id === "string" &&
        typeof req.user.id === "string" &&
        _id.length > 0
    ) {
        Memory.findOneAndDelete({
            _id, userId: req.user.id
        }, (err, memory) => {
            if (err) {
                res.status(400).send({ message: "Something went wrong, this is not your fault" });
            } else if (!memory) {
                res.status(400).send({ message: "Something went wrong, this is not your fault" });
            } else {
                res.send(memory._id);
            }
        });
    } else {
        res.status(400).send({ message: "Something went wrong, this is not your fault" });
    }
});

router.post("/edit-memory", (req, res) => {
    const { _id, updates } = req.body;

    if (
        typeof _id === "string" &&
        typeof updates.description === "string" &&
        typeof updates.note === "string" &&
        updates.description.length > 0
    ) {
        Memory.findOneAndUpdate({
            _id,
            userId: req.user.id
        }, updates, (err, memory) => {
            if (err) {
                res.status(400).send({ message: "Something went wrong, this is not your fault" });
            } else if (!memory) {
                res.status(400).send({ message: "Something went wrong, this is not your fault" });
            } else {
                res.send(_id);
            }
        })
    } else {
        res.status(400).send({ message: "Something went wrong, this is not your fault" });
    }
});

export default router;
