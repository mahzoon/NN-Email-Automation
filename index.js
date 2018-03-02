


var formidable = require('formidable'),
    http = require('http');

http.createServer(function(req, res) {
    /* Process the form uploads */
    if (req.url == '/addMessage' && req.method.toLowerCase() == 'post') {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
             res.writeHead(200, {'content-type': 'text/plain'});
             res.write('Done.');
               console.log(fields);
               console.log(files);
             res.end();
             });

    form.on('error', function(err) {
          console.error(err);
          });

    form.on('end', function() {
            
          });

    return;
    }
                  
    res.writeHead(200, {'content-type': 'text/html'});
    res.end();
}).listen((process.env.PORT || 5000));

