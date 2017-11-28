

var beerSchema = new Schema({
    name:  String,
    type: String,
    ratings:   Number,
});

module.exports =  Mongoose.model('Beer', beerSchema, 'beers');