const router = require('express').Router();
let Temperature = require('../models/temperaturas.model');

/*
// Con este codigo recorremos toda la base de datos y luego extraemos los 10 primeros valores (tarda bastante en ejecutar)
router.route('/resultados').get((req, res) =>{
    Temperature.find()
    .then(temperaturas =>{
        var output = [];
        var data_temp = {};
        for( var i = 0; i < temperaturas.length;i ++){
            data_temp = {'timestamp': temperaturas[i]['timestamp'],'temp_max': temperaturas[i]['temp_max'],'light_max': temperaturas[i]['light_max']}
            output.push(data_temp);
        }
        res.json({'resultado': output.slice(0,10)})
    } )
    .catch(err => res.status(400).json('Error: ' + err));
});
*/

// Con este endpoint no llegamos a recorrer toda la base de datos => Solo cogemos los primeros 10 valores

router.route('/resultados').get((req, res) =>{
    Temperature.find().sort({_id:1}).limit(10)
    .then(temperaturas =>{
        var output = [];
        var data_temp = {};
        for( var i = 0; i < temperaturas.length;i ++){
            data_temp = {'timestamp': temperaturas[i]['timestamp'],'temp_max': temperaturas[i]['temp_max'],'light_max': temperaturas[i]['light_max']}
            output.push(data_temp);
        }
        res.json({'resultado': output})
    } )
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/getlocdata').get((req, res) =>{
    Temperature.find().sort({_id:1}).limit(10)
    .then(temperaturas =>{
        
        var output = [];
        var data_temp = {};
        for( var i = 0; i < temperaturas.length;i ++){
            data_temp = {'timestamp': temperaturas[i]['timestamp'],'temp_max': temperaturas[i]['temp_max'],'light_max': temperaturas[i]['light_max'], 'lat':temperaturas[i]['latitude'], 'long': temperaturas[i]['longitude'], 'Location': temperaturas[i]['location']}
            output.push(data_temp);
        }
        res.json({'data': output})
    } )
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/ping').get((req, res) => {
    res.json('pong!')
});
router.route('/mediciones').get((req, res)=>{
    MEDICIONES = [
        {
            "timestamp": "12/15/2014 01:40:00 AM",
            "mac": "0013a20040b4b755",
            "boardtype": 1,
            "boardid": 508,
            "temp_max": 21.6,
            "temp_min": 21.6,
            "temp_avg": 21.6,
            "light_max": 96.4,
            "light_min": 96.4,
            "light_avg": 96.4,
            "humidity_min": 41.2,
            "humidity_max": 41.2,
            "humidity_avg": 41.2,
            "model": "ENV",
            "latitude": -37.8134078,
            "longitude": 144.9794923,
            "elevation": 30.1,
            "location": "Fitzroy Gardens",
            "rowid": "508-20141215014000",
            "Position": ""
        },
        {
            "timestamp": "12/15/2014 01:40:00 AM",
            "mac": "0013a20040b516ed",
            "boardtype": 1,
            "boardid": 505,
            "temp_max": 23.2,
            "temp_min": 23.2,
            "temp_avg": 23.2,
            "light_max": 93.5,
            "light_min": 93.5,
            "light_avg": 93.5,
            "humidity_min": 48.3,
            "humidity_max": 48.3,
            "humidity_avg": 48.3,
            "model": "ENV",
            "latitude": -37.813073,
            "longitude": 144.9804061,
            "elevation": 29.91,
            "location": "Fitzroy Gardens",
            "rowid": "505-20141215014000",
            "Position": ""
        },
        {
            "timestamp": "12/15/2014 01:45:00 AM",
            "mac": "0013a20040b516f6",
            "boardtype": 1,
            "boardid": 507,
            "temp_max": 21.6,
            "temp_min": 21.6,
            "temp_avg": 21.6,
            "light_max": 97.2,
            "light_min": 97.2,
            "light_avg": 97.2,
            "humidity_min": 44.8,
            "humidity_max": 44.8,
            "humidity_avg": 44.8,
            "model": "ENV",
            "latitude": -37.8149218,
            "longitude": 144.9822582,
            "elevation": 38.79,
            "location": "Fitzroy Gardens",
            "rowid": "507-20141215014500",
            "Position": ""
        }
    ]

    res.json({'status': 'success','medicion': MEDICIONES});
});

module.exports = router; 