const collection = 'contacts';
const { response } = require('express');
const res = require('express/lib/response');
const ContactsModel = require('../models/contacts-model');
const createError = require('http-errors');
const mongoose = require('mongoose');


// #swagger.tags = ['contacts']

const getAll = async (req, res, next) => {
  // #swagger.tags = ['contacts']

  try {
    const request = await ContactsModel.find();
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
    const request = await ContactsModel.findById(req.params.id);
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

const create_contact = async (req, res, next) => {
  try {
    if (
      !req.body.fullname ||
      !req.body.email ||
      !req.body.phone 
    ) {
      res.status(400).send({ message: 'contact fields cannot be empty.' });
      return;
    }
    const contact = new ContactsModel(req.body);
    contact
      .save()
      .then((data) => {
        // console.log(data);
        res.status(201).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'An error occurred while creating the contact entry.'
        });
      });
  } catch (err) {
    res.status(500).json(err);
  }
};

const update_contact = async (req, res, next) => {
  try {
    const contact = await ContactsModel.findById(req.params.id);

    if (!contact) {
      throw createError(404, "contact doesn't exist");
    }

    if (req.body.fullname) contact.fullname = req.body.fullname;
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
  try {
    const request = await ContactsModel.findByIdAndDelete({
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
  create_contact,
  delete_contact,
  update_contact
};
