var Contacts = require('./../models/contacts-model');
var helper = require('./../helpers/general');
var gravatar = require('gravatar');
/*
200 OK
202 Accepted
204 No Content
400 Bad Request
404 Not Found
 */
module.exports.controller = function (router) {

    router.get('/contacts', function (req, res) {

            // Use the Contact model to find all contacts
            Contacts.find({}, function (err, contacts) {
                if (err) {
                    helper.handleError(res, err.message, "Failed to get contacts");
                }
                res.status(200).json(contacts);
            });
        }),
        router.get('/contact', function (req, res) {
            // Use the Contact model to find all contacts
            Contacts.find({
                userId: req.user._id
            }, function (err, contacts) {
                if (err) {
                    helper.handleError(res, err.message, "Failed to get contacts");
                }
                res.status(200).json(contacts);
            });
        }),
        router.get('/contact/:contact_id', function (req, res) {
            Contacts.find({
                userId: req.user._id,
                _id: req.params.contact_id
            }, function (err, contact) {
                if (err) {
                    helper.handleError(res, err.message, "Failed to get contacts");
                }
                res.status(200).json(contact);
            });
        }),
        router.post('/contact/:contact_id', function (req, res) {
            Contacts.find({
                userId: req.user._id,
                _id: req.params.contact_id
            }, function (err, contact) {
                if (err) {
                    helper.handleError(res, err.message, "Failed to get contact");
                }
                // Update the existing contact quantity
                contact.quantity = req.body.quantity;
                // Save the contact and check for errors
                contact.save(function (err) {
                    if (err) {
                        helper.handleError(res, err.message, "Failed to save contact");
                    }
                    res.status(200).json(contact);
                });
            });
        }),
        router.put('/contact/:contact_id', function (req, res) {
            Contacts.update({
                userId: req.user._id,
                _id: req.params.contact_id
            }, {
                quantity: req.body.quantity
            }, function (err, num, raw) {
                if (err) {
                    helper.handleError(res, err.message, "Failed to update contact");
                }
                res.status(204).json({
                    message: num + ' updated'
                }); //204 response No Content
            });

        }),
        router.delete('/contact/:contact_id', function (req, res) {
            // Use the Contacts model to find a specific contact and remove it
            Contacts.remove({
                userId: req.user._id,
                _id: req.params.contact_id
            }, function (err) {
                if (err) {
                    helper.handleError(res, err.message, "Failed to delete contact");
                }
                res.status(204).json({
                    message: 'Contact removed!'
                });
            });
        }),
        // Create endpoint /api/contact for POSTS
        router.post('/contact/add', function (req, res) {
            // Create a new instance of the Beer model
            var contact = new Contact();
            // Set the contact properties that came from the POST data
            contact.firstname = req.body.firstname;
            contact.lastname = req.body.lastname;
            contact.phone = req.body.phone;
            contact.email = req.body.email;
            contact.userId = req.user._id;
            // Save the contact and check for errors
            contact.save(function (err) {
                if (err) {
                    helper.handleError(res, err.message, "Failed to add contact");
                }
                //res.status(204).end();
                res.status(204).json({
                    message: 'Contact added!',
                    data: contact
                });
            });
        })
}