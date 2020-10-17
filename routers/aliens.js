const express = require('express')
const router = express.Router();

const Alien = require('../models/aliens');

router.get('/', async (req, res) => {
    try {
        const aliens = await Alien.find()
        res.json({
            'status': 200,
            'msg': 'success',
            'data': aliens
        })
    } catch (error) {
        res.send(error)
    }
});

router.post('/', async (req, res) => {
    const { name, tech, sub } = req.body
    const alien = new Alien({ name, tech, sub })

    try {
        const data = await alien.save()
        res.json({
            'status': 200,
            'msg': 'success',
            'data': data
        })
    } catch (error) {
        res.send(error)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const aliens = await Alien.findById(req.params.id)
        res.json({
            'status': 200,
            'msg': 'success',
            'data': aliens
        })
    } catch (error) {
        res.send(error)
    }
});

router.put('/:id', async (req, res) => {
    const { name, tech } = req.body
    try {
        const aliens = await Alien.findOneAndUpdate(
            { _id: req.params.id }, { $set: { name: name, tech: tech } }, { new: true }
        )
        res.json({
            'status': 200,
            'msg': 'success',
            'data': aliens
        })
    } catch (error) {
        res.send(error)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const aliens = await Alien.findOneAndDelete(
            { _id: req.params.id }
        )
        if (aliens) {
            return res.json({
                'status': 200,
                'msg': 'success delete'
            })    
        }
        
    } catch (error) {
        res.send(error)
    }
})

module.exports = router