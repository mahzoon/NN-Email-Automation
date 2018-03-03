


var formidable = require('formidable'),
    http = require('http'),
    cloudinary = require('cloudinary'),
    querystring = require('querystring'),
    fs = require('fs');

cloudinary.config({ cloud_name: 'university-of-colorado' });

http.createServer(function(req, res) {
    /* Process the form uploads */
    if (req.url == '/addMessage' && req.method.toLowerCase() == 'post') {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
             res.writeHead(200, {'content-type': 'text/plain'});
             res.write('Done.');
             
             var filesList = [];
             var counter = 0;
             Object.keys(files).forEach(function(key) {
                  var file = files[key];
                  filesList.push(file.path);
                                        
//                  cloudinary.uploader.unsigned_upload(file.path, 'web-preset', function(result) {
//                                                      console.log(result)
//                                                      fs.unlink(file.path, (err) => {
//                                                                if (err) console.log(err);
//                                                                });
//                                                      });
                                        
                                        // make firebase request to add the email observation
                                        
                                        var observation = querystring.stringify({
                                        'id' : counter,
                                        'from': fields['from'],
                                        'subject': fields['subject'],
                                        'body-plain' : fields['body-plain'],
                                        'timestamp' : fields['timestamp'],
                                        'attachment': file.path
                                        });
                                        
                                        // An object of options to indicate where to post to
                                        var postParams = {
                                        host: 'https://us-central1-automated-email-client.cloudfunctions.net/addEmailObservation',
                                        port: 443,
                                        method: 'POST',
                                        headers: {
                                        'Content-Type': 'application/x-www-form-urlencoded',
                                        'Content-Length': Buffer.byteLength(observation)
                                        }
                                        };
                                        
                                        // Set up the request
                                        var postReq = http.request(postParams, function(res) {
                                                                    res.setEncoding('utf8');
                                        });
                                        
                                        // post the data
                                        postReq.write(observation);
                                        postReq.end();
                                        
                                        counter = counter + 1;
                                        
             });
             console.log(filesList);
               
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

