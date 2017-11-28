
const Beer = Model.Beer;
const StandardEncapsulated = Helper.StandardEncapsulation;
module.exports = {
    create : (req, res) =>{
        //TODO : Validation Required here
        let name = req.body.name;
        let type = req.body.type;
        let ratings = req.body.ratings;
        if(name === undefined || name === "" || type === undefined || type === "" || ratings === undefined || ratings === "" || name === null || type === null || ratings === null){
            res.send(StandardEncapsulated.response("Please fill data correctly for name,type and ratings.","Fail","Encountered some error while creating a beer data.",400));
        }
        if(ratings >= 5 || ratings < 0){
            res.send(StandardEncapsulated.response("Rating should be less than 5 or greater/equal to 0","Fail","Encountered some error while creating a beer data.",400));
        }
        let BeerData = new Beer({
            name : name,
            type : type,
            ratings : ratings
        });
        BeerData.save().then(function(doc){
            res.send(StandardEncapsulated.response(doc,"Success","Beer successfully created",200));
        }).catch(function (error) {
            res.send(StandardEncapsulated.response(error,"Fail","Encountered some error while creating a beer data.",400));
        })

    },
    getBeerList : (req,res) =>{
        Beer.find().exec(function (error, data) {
            if (error) {
                return res.send(StandardEncapsulated.response(error,"Fail","Encountered some error while processing.",400));
            }
            if (data.length === 0) {
                return res.send(StandardEncapsulated.response([],"Fail","No data found",401));
            }
            else {
                return res.send(StandardEncapsulated.response(data,"Success","Beer data successfully found",200));
            }
        });
    },
    getSearchedBeers: (req,res) => {
        let searchedValue= req.params.search;
        Beer.find(
            { "name": { "$regex": searchedValue, "$options": "i" } }
        ).exec(function(error,data){
            if (error) {
                return res.send(StandardEncapsulated.response(error,"Fail","Encountered some error while processing.",400));
            }
            if (data.length === 0) {
                return  res.send(StandardEncapsulated.response([],"Fail","No data found",401));
            }
            else {
               return res.send(StandardEncapsulated.response(data,"Success","Beer data successfully found",200));
            }
        });
    },
    updateBeerRatings: (req,res) => {
        let id= req.params.id;
        Beer.aggregate([
            {
                "$group": {
                    "_id": null,
                    "ratingAvg": {"$avg": "$ratings"}
                }
            }
        ], function(error, data) {
            if(error) {
                res.send(StandardEncapsulated.response(error, "Fail", "Encountered some error while processing.", 400));
            }
            let query = {'_id': id};
            console.log(data)
            let ratingData = {
                ratings:data[0].ratingAvg
            }
            console.log(ratingData)
            Beer.update(query,ratingData,function(error,ratingdata) {
                if(error) {
                    res.send(StandardEncapsulated.response(error, "Fail", "Encountered some error while processing.", 400));
                }
                else {
                    res.send(StandardEncapsulated.response(ratingdata, "Success", "Beer data successfully found", 200));
                }
            });
            })
        }
};