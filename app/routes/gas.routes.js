module.exports = (app) => {
    const gas = require('../controllers/gas.controller.js');

    // Create a new Note
    app.post('/gas', gas.create);

    // Retrieve all Notes
    app.get('/gas', gas.findAll);

    // Retrieve a single Note with noteId
    app.get('/gas/:gasId', gas.findOne);

    // Update a Note with noteId
    app.put('/gas/:gasId', gas.update);

    // Delete a Note with noteId
    app.delete('/gas/:gasId', gas.delete);
};