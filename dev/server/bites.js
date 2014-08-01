/**
 * Created by rhj on 2014-07-28.
 */
module.exports = function (server, db) {
    server.get("/bites", function (req, res, next) {
        db.bites.find(function (err, bites) {
            res.writeHead(200, {
                'Content-Type': 'application/json; charset=utf-8'
            });
            res.end(JSON.stringify(bites));
        });
        return next();
    });
    server.post('/bites', function (req, res, next) {
        var bite = req.params;
        db.bites.save(bite,
            function (err, data) {
                res.writeHead(200, {
                    'Content-Type': 'application/json; charset=utf-8'
                });
                res.end(JSON.stringify(data));
            });
        return next();
    });
};