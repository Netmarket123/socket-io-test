const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const temperatureSchema = new Schema({
    timestamp:{type:String, required:true},
    mac: { type:String, required:true},
    boardtype: { type: Number, required: true},
    boardid: { type: Number, required: true},
    temp_max: { type: Number, required: true},
    temp_min: { type: Number, required: true},
    temp_avg: { type: Number, required: true},
    light_max: { type: Number, required: true},
    light_min: { type: Number, required: true},
    light_avg: { type: Number, required: true},
    humidity_min: { type: Number, required: true},
    humidity_max: { type: Number, required: true},
    humidity_avg: { type: Number, required: true},
    model: { type:String, required: true},
    latitude: { type: Number, required: true},
    longitude: { type: Number, required: true},
    elevation: { type: Number, required: true},
    location: { type: String, required: true},
    rowid: { type: Number, required: true},
    Position: { type: String, required: true},
}, {
    timestamps:true,
})

const Temperature = mongoose.model('temperaturas', temperatureSchema);

module.exports = Temperature;