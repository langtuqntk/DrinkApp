import jwt from 'jsonwebtoken';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';
import config from '../config/config';

// sample user, used for authentication
const user = {
  email: 'react@gmail.com',
  password: 'express',
  name: 'Nguyễn Công Chính',
  picture: 'https://scontent.fsgn2-1.fna.fbcdn.net/v/t1.0-9/22491462_120896778588370_5141330884375383493_n.jpg?oh=75c91a9ce578a24c50ed4e689e8c8276&oe=5AD7CB42'
};

/**
 * Returns jwt token if valid username and password is provided
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function login(req, res, next) {
  // Ideally you'll fetch this from the db
  // Idea here was to show how jwt works with simplicity
  if (req.body.email === user.email && req.body.password === user.password) {
    const token = jwt.sign({
      email: user.email,
      name: user.name,
      picture: user.picture
    }, config.jwtSecret);
    return res.json({ data:{
        token,
        username: user.email
      }
    });
  }

  const err = new APIError('Authentication error', httpStatus.UNAUTHORIZED, true);
  return next(err);
}

/**
 * This is a protected route. Will return random number only if jwt token is provided in header.
 * @param req
 * @param res
 * @returns {*}
 */
function getRandomNumber(req, res) {
  // req.user is assigned by jwt middleware if valid token is provided
  return res.json({
    user: req.user,
    num: Math.random() * 100
  });
}

export default { login, getRandomNumber };
