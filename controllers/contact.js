const {
  response
} = require('express');
const res = require('express/lib/response');
const contactModel = require('../models/contacts');
const createError = require('http-errors');
const mongoose = require('mongoose');


const getAll = async (req, res, next) => {
  // #swagger.tags = ['contacts']

  try {
    const request = await contactModel.find();
    request.forEach((contact) => {
      if (contact.phone) {
        contact.phone = '********';
      }
    });
    res.json(request);
  } catch (err) {
    // res.json({
    //   message: err
    // });
    next(err);
  }
};

const getSingle = async (req, res, next) => {
  // #swagger.tags = ['contacts']

  try {
    const request = await contactModel.findById(req.params.id);
    if (!request) {
      throw createError(404, "contact doesn't exist");
    }
    if (request.phone) {
      request.phone = '********';
    }
    res.json(request);
  } catch (err) {
    if (err instanceof mongoose.CastError) {
      next(createError(400, 'Invalid contact id'));
      return;
    }
    next(err);
  }
};

const registercontact = async (req, res) => {
  // #swagger.ignore = true
  console.log("IS this getting though?");
  const {
    email,
    firstname,
    lastname,
    phone
  } = req.body;

  // console.log(req.body);
  let errors = [];

  if (!email || !firstname || !lastname || !phone) {
    errors.push({
      msg: 'Fields cannot be left blank.'
    });
  }
  if (errors.length > 0) {
    res.render('addcontact', {
      layout: 'login',
      errors,
      email,
      phone
    });
    // console.log(errors);
  } else {
    contactModel.findOne({
      email: email
    }).then((user) => {
      if (user) {
        errors.push({
          msg: 'That email is already registered.'
        });
        res.render('addcontact', {
          layout: 'login',
          errors,
          email

        });
        // console.log(errors);
      } else {
        const newContact = new contactModel({
          email,
          firstname,
          lastname,
          phone,
          googleId
        });
        newContact.save()
          .then((user) => {
            res.redirect('profile', {
              user: req.user
            });
          })

          .catch((err) => console.log(err));
      }
    });
  }
};
const update_contact = async (req, res, next) => {
  try {
    const contact = await ContactsModel.findById(req.params.id);

    if (!contact) {
      throw createError(404, "contact doesn't exist");
    }

    if (req.body.firstname) contact.firstname = req.body.firstname;
    if (req.body.lastname) contact.lastname = req.body.lastname;

    if (req.body.email) contact.email = req.body.email;
    if (req.body.phone) contact.phone = req.body.phone;

    contact.save((err) => {
      if (err) {
        res.status(500).json(err || 'An error occurred while updating the contact.');
      } else {
        res.status(204).send();
      }
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

const delete_contact = async (req, res, next) => {
  // #swagger.tags = ['contacts']

  try {
    const request = await contactModel.findByIdAndDelete({
      _id: req.params.id
    });
    if (!request) {
      throw createError(404, "contact doesn't exist");
    }
    res.json(request);
  } catch (err) {
    if (err instanceof mongoose.CastError) {
      next(createError(400, 'Invalid contact id'));
      return;
    }
    next(err);
  }
};

module.exports = {
  getAll,
  getSingle,
  update_contact,
  registercontact,
  delete_contact
};