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
    new Memory(req.body.memory).save((err, memory) => {
        if (err) {
            res.status(400).send({ message: "Something went wrong, this is not your fault" });
        } else {
            res.send(memory.id);
        }
    })
});

router.post("/remove-memory", (req, res) => {
    const _id = req.body.id;

    Memory.deleteOne({ _id }, (err) => {
        if (err) {
            res.status(400).send({ message: "Something went wrong, this is not your fault" });
        } else {
            res.send(_id);
        }
    });
});

router.post("/edit-memory", (req, res) => {
    const { id, updates } = req.body;

    Memory.updateOne({ id }, { ...updates }, (err, memory) => {
        if (err) {
            res.status(400).send({ message: "Something went wrong, this is not your fault" });
        } else {
            res.send(memory);
        }
    });
});

export default router;
