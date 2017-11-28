/*******************************************************
 * author: Maryam Naveed
 * Date:   2017-06-16
 * Description:
 *******************************************************/

module.exports = (req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    next();
};