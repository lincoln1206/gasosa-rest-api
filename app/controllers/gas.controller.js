const GasStation = require('../models/gas.model.js');

// Create and Save a new Note
exports.create = (req, res) => {
    GasStation.create({
            name: req.body.name,
            business_code: req.body.business_code,
            zip_code: req.body.zip_code,
            fuels: [{
                name: req.body.fuels[0].name,
                business_code: req.body.business_code,
                price: req.body.fuels[0].price
            }]
        },
        function (err, gas_station) {
            if (err) return res.status(500).send("message: "+ err.message);
            res.status(200).send(gas_station);
            console.log(req);
        });
};

// Retrieve and return all gas stations from the database.
exports.findAll = (req, res) => {
    GasStation.find()
    .then(gas_station => {
        res.send(gas_station);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving gas stations."
        });
    });
};

// Find a single gas station with a noteId
exports.findOne = (req, res) => {
    GasStation.findById(req.params.gasId)
    .then(gas_station => {
        if(!gas) {
            return res.status(404).send({
                message: "Gas station not found with id " + req.params.gasId
            });            
        }
        res.send(gas_station);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Gas station not found with id " + req.params.gasId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving gas station with id " + req.params.gasId
        });
    });
};

// Update a gas station identified by the gasId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.name) {
        return res.status(400).send({
            message: "Gas station name can not be empty"
        });
    }

    // Find gas station and update it with the request body
    GasStation.findByIdAndUpdate(req.params.gasId, {
        name: req.body.name,
        business_code: req.body.business_code,
        zip_code: req.body.zip_code
    }, {new: true})
    .then(gas_station => {
        if(!gas_station) {
            return res.status(404).send({
                message: "Gas station not found with id " + req.params.gasId
            });
        }
        res.send(gas_station);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Gas station not found with id " + req.params.gasId
            });                
        }
        return res.status(500).send({
            message: "Error updating gas station with id " + req.params.gasId
        });
    });
};

// Delete a gas station with the specified noteId in the request
exports.delete = (req, res) => {
    GasStation.findByIdAndRemove(req.params.noteId)
    .then(gas_station => {
        if(!gas_station) {
            return res.status(404).send({
                message: "Gas station not found with id " + req.params.gasId
            });
        }
        res.send({message: "Gas station deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Gas station not found with id " + req.params.gasId
            });                
        }
        return res.status(500).send({
            message: "Could not delete gas station with id " + req.params.gasId
        });
    });
};
