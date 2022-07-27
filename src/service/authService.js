import * as yup from 'yup';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import InvalidBodyRequestException from '../exceptions/InvalidBodyRequestException.js';
import EmailAlreadyInUseException from '../exceptions/EmailAlreadyInUseException.js';
import InvalidCredetialsExceptions from '../exceptions/InvalidCredetialsExceptions.js';

class AuthService {
  constructor(repository) {
    this.authRepository = repository;
  }

  async register(body) {
    const schema = yup.object().shape({
      name: yup.string().required().min(3).max(150),
      email: yup.string().required().email(),
      password: yup.string().required().min(6).max(150),
    });

    try {
      await schema.validate(body, { abortEarly: false });
    } catch (error) {
      const errors = error.inner.map((err) => ({
        field: err.path,
        errors: err.errors[0],
      }
      ));
      throw new InvalidBodyRequestException(errors);
    }

    const user = await this.authRepository.findUserByEmail(body.email);

    if (user) {
      throw new EmailAlreadyInUseException();
    }

    const salt = bcrypt.genSaltSync(10);
    const userWithEncryptedPassword = {
      ...body,
      password: bcrypt.hashSync(body.password, salt),
    };

    const newUser = await this.authRepository.register(userWithEncryptedPassword);

    return newUser;
  }

  async authenticate(body) {
    const schema = yup.object().shape({
      email: yup.string().required().email(),
      password: yup.string().required().max(150),
    });

    try {
      await schema.validate(body, { abortEarly: false });
    } catch (error) {
      const errors = error.inner.map((err) => ({
        field: err.path,
        errors: err.errors[0],
      }
      ));
      throw new InvalidBodyRequestException(errors);
    }

    const user = await this.authRepository.findUserByEmail(body.email);
    if (!user) {
      throw new InvalidCredetialsExceptions();
    }

    const isPasswordValid = bcrypt.compareSync(body.password, user.password);
    if (!isPasswordValid) {
      throw new InvalidCredetialsExceptions();
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.TOKEN_SECRET,
      { expiresIn: process.env.TOKEN_EXPIRATION_TIME },
    );

    return { token };
  }
}

export default AuthService;
