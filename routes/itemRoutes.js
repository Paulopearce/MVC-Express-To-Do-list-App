//In place of the app. before the route
const router = require('express').Router()
const { Item } = require('../models')
//Rote to hit to get return data using restful(representational state transfer) routing syntax (name implies the plural of what the route data returns) 
router.get('/items', (req, res) => 
  Item.findAll()
    .then(items => res.json(items))
    .catch(err => console.log(err)))

//post route should look like the plural of the data. Adds data
router.post('/items', (req,res) => 
  Item.create(req.body)
    .then(items => res.json(items))
    .catch(err => console.log(err)))

//remove from page using restful syntax followed by the variable parameter you're sending
router.delete('/items/:id', (req, res) => 
  Item.update(req.body, { where: { id: req.params } })
    .then(() => res.sendStatus(200))
    .catch(err => console.log(err)))

//edit page using restful syntax followed by the variable parameter you're modifying
router.put('/items/:id', (req, res) => 
  Item.destroy({ where: { id: req.params.id } })
    .then(() => res.sendStatus(200))
    .catch(err => console.log(err)))

module.exports = router
