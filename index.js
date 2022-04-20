const express = require('express');
const path = require('path');
const db = require('./config/mongoose.js');
const Contact = require('./model/Contact');
const app = express();
const port = 8000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'view'));
app.use(express.static(path.join(__dirname, 'Assets')));
app.use(express.urlencoded());

app.post('/save-contact', function(request, response) {
    
    Contact.create(request.body, function(error) {
        if(error) {
            console.log('Error in Saving Data', error);
            return;
        }
    })

    return response.redirect('/');
})

app.get('/delete-contact', function(request, response) {

    Contact.findByIdAndDelete(request.query.id, function(error) {
        if(error) {
            console.log('error in delete contact', error);
            return;
        }

        return response.redirect('/');
    })

})

app.get('/', function(request, response) {

    Contact.find({}, function(error, allContacts) {
        if(error) {
            console.log('Error in fetching Data', error);
            return;
        }

        return response.render('contact-list-page.ejs', {
            contact_list: allContacts
        })
    })
})

app.listen(port, function(error) {
    
    if(error) {
        console.log('Internal Server Error!!!', error);
        return;
    }

    console.log('Server is running on the port: ', port);
})