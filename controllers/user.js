const {
  response
} = require('express');
const res = require('express/lib/response');
const UserModel = require('../models/user-model');
const createError = require('http-errors');
const mongoose = require('mongoose');


const getAll = async (req, res, next) => {
  // #swagger.tags = ['Users']

  try {
    const request = await UserModel.find();
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

const getSingle = async (req, res, next) => {
  // #swagger.tags = ['Users']

  try {
    const request = await UserModel.findById(req.params.id);
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

const getUserByName = async (req, res, next) => {
  // #swagger.tags = ['Users']

  try {
    const request = await UserModel.find({
      $or: [{
          lastname: {
            $regex: req.params.user,
            $options: 'i'
          }
        },
        {
          firstname: {
            $regex: req.params.user,
            $options: 'i'
          }
        }
      ]
    });
    if (request.length == 0) {
      throw createError(404, 'User not found');
    }
    if (request.password) {
      request.password = '********';
    }
    res.json(request);
  } catch (err) {
    res.json({
      message: 'Invalid request'
    });
  }
};

const registerUser = async (req, res) => {
  // #swagger.ignore = true
  console.log("IS this getting though?");
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
    UserModel.findOne({
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
        const newUser = new UserModel({
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

const delete_user = async (req, res, next) => {
  // #swagger.tags = ['Users']

  try {
    const request = await UserModel.findByIdAndDelete({
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
  getAll,
  getSingle,
  getUserByName,
  registerUser,
  delete_user
};