/*
|All Routes Must Start With Forward Slash
*/

Route.get('/beers', Controller.BeerController.getBeerList);
Route.post('/beer/create', Controller.BeerController.getBeerList);
Route.get('/beers/:search', Controller.BeerController.getSearchedBeers);
Route.put('/beer/:id', Controller.BeerController.updateBeerRatings);



module.exports = Route;