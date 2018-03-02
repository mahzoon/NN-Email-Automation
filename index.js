var express = require('express')
var app = express()

const Busboy = require('busboy')

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.listen(app.get('port'), function() {
           console.log("Node app is running at localhost:" + app.get('port'))
           })

app.post('/addMessage', function(req, res) {
    if (req.headers['content-type'].startsWith('multipart/form-data')) {
        const busboy = new Busboy({ headers: req.headers })
        const filesList = []
        
        busboy.on('error', function(err){
                  console.log(err)
                  })
        
        // This callback will be invoked for each file uploaded
        busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
                  console.log(`filename: ${filename}, encoding: ${encoding}, mimetype: ${mimetype}`)
                  filesList.push(filename)
                  console.log(`Saving '${fieldname}' `)
                  // to just consume the data
                  file.resume()
                  })
        
        busboy.on('field', (fieldname, value) => {
                  req.body[fieldname] = value
                  console.log(fieldname)
                  })
        
        // This callback will be invoked after all uploaded files are saved.
        busboy.on('finish', () => {
                  console.log(filesList)
                  //var from = req.body.from
                  //var subject = req.body.subject
                  //var body = req.body["body-plain"]
                  //var timestamp = req.body.timestamp
                  //console.log(`Message from '${from}' | subject '${subject}'  `)
                  return res.redirect(200, "Done.")
                 })
        
        // The raw bytes of the upload will be in req.rawBody. Send it to busboy, and get
        // a callback when it's finished.
        console.log(req.rawBody)
        busboy.end(req.rawBody)
        }
    else {
        return res.redirect(406, "Not acceptable.")
    }
})

