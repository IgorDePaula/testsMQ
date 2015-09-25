var moment = require('moment');
var inicio = moment().set({hours:'08',minutes:'00'});
var fim = moment().set({hours:'18',minutes:'00'});
for(var interval = inicio; interval < fim; interval.add({hours:1,minutes:30})){
    console.log(interval.format('HH:mm'));
}
