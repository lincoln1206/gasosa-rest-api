const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const FuelSchema = new Schema(
    {
        name: {type: String, required: true},
        business_code: {type: String, required: true},
        price: {type: Currency, required: true, min: 0.01, max: 50000}
    },
    {
        timestamps: true
    }
);

const GasStationSchema = mongoose.Schema(
    {
        name: {type: String, required: true},
        business_code: {type: String, required: true},
        zip_code: {type: String, required: true},
        fuels: [FuelSchema]
}, {
        timestamps: true
},
    {
        collection: 'gasStations'
    }
);

module.exports = mongoose.model('GasStation', GasStationSchema );