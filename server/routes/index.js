'use strict'

const mongoose = require('mongoose')
const express = require('express')

mongoose.connect(process.env.MONGO_URL)

const TaskSchema = new mongoose.Schema({
  name: String,
  movieName: String,
  assigned: Boolean,
  submitted: Boolean,
  approved: Boolean,
  assignedWorker: String,
  timeCompleted: Date,
  timeAssigned: Date
})

const Tasks = mongoose.model('Task', TaskSchema)

const router = express.Router()

router.get('/getTask', (req, res, next) => {

})


module.exports = router
