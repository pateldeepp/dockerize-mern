const express = require('express');
const userModel = require('../models/user')

const router = express.Router()

//Post Method
router.post('/user', async (req, res) => {
    const data = new userModel({
        name: req.body.name,
        age: req.body.age
    });

    try {
        const dataToSave = await data.save();
        console.log(dataToSave);
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

//Get all Method
router.get('/users', async (req, res) => {
    try {
        const data = await userModel.find({});
        res.status(200).json(data)
    }
    catch (error) {
        res.status(500).json({message: error.message})
    }
})

//Get by ID Method
router.get('/user/:id', async (req, res) => {
    try {
        const data = await userModel.findById(req.params.id);
        data.greet = "hi";
        res.status(200).json({
            data: data,
            greet: 'helloooooo'
        });
    }
    catch (error) {
        res.status(500).json({message: error.message})
    }
})

//Update by ID Method
router.patch('/user/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await userModel.findByIdAndUpdate(
            id, updatedData, options
        )

        res.status(200).send(result);
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Delete by ID Method
router.delete('/user/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await userModel.findByIdAndDelete(id);

        res.status(204).send(result);
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = router;