const {
  response
} = require('express');
const res = require('express/lib/response');
const UserGModel = require('../models/google');
const UserFModel = require('../models/facebook');
const createError = require('http-errors');
const mongoose = require('mongoose');


const getFAll = async (req, res, next) => {
  // #swagger.tags = ['Users']

  try {
    const request = await UserFModel.find();
    request.forEach((user) => {
      if (user.password) {
        user.password = '********';
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

const getFSingle = async (req, res, next) => {
  // #swagger.tags = ['Users']

  try {
    const request = await UserFModel.findById(req.params.id);
    if (!request) {
      throw createError(404, "User doesn't exist");
    }
    if (request.password) {
      request.password = '********';
    }
    res.json(request);
  } catch (err) {
    if (err instanceof mongoose.CastError) {
      next(createError(400, 'Invalid User id'));
      return;
    }
    next(err);
  }
};

const registerFUser = async (req, res) => {
  // #swagger.ignore = true
  const {
    email,
    firstname,
    lastname,
    password
  } = req.body;

  // console.log(req.body);
  let errors = [];

  if (!email || !firstname || !lastname || !password) {
    errors.push({
      msg: 'Fields cannot be left blank.'
    });
  }

  if (password.length < 8) {
    errors.push({
      msg: 'Password must be at least 8 characters.'
    });
  }

  if (errors.length > 0) {
    res.render('register', {
      layout: 'login',
      errors,
      email,
      password
    });
    // console.log(errors);
  } else{
    UserFModel.findOne({
      email: email
    }).then((user) => {
      if (user) {
        errors.push({
          msg: 'That email is already registered.'
        });
        res.render('register', {
          layout: 'login',
          errors,
          email,
          password
        });
        // console.log(errors);
      } else {
        const newUser = new UserFModel({
          email,
          firstname,
          lastname,
          password
        });
        newUser
          .save()
          .then((user) => {
            res.redirect('/auth/login');
          })
          .catch((err) => console.log(err));
      }
    });
  }
};

const deleteFUser = async (req, res, next) => {
  // #swagger.tags = ['Users']

  try {
    const request = await UserFModel.findByIdAndDelete({
      _id: req.params.id
    });
    if (!request) {
      throw createError(404, "User doesn't exist");
    }
    res.json(request);
  } catch (err) {
    if (err instanceof mongoose.CastError) {
      next(createError(400, 'Invalid User id'));
      return;
    }
    next(err);
  }
};

module.exports = {
  getFAll,
  getFSingle,
  registerFUser,
  deleteFUser
};