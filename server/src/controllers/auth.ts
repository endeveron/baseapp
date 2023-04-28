import bcrypt from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { User, UserModel } from '../models/user';
import { HttpError } from '../utils/error';
import { getItem } from '../utils/getFromDb';
import { isReqValid } from '../utils/validateRequest';
import { Id } from '../common/types';
import logger from '../utils/logger';

type ChangeFields<T, R> = Omit<T, keyof R> & R;
type CleanUser = ChangeFields<
  User,
  {
    account: Omit<User['account'], 'password'>;
  }
>;

const genetrateJWToken = (userId: Id, next: NextFunction) => {
  const jwtKey = process.env.JWT_KEY;

  const handleJWTException = () =>
    next(new HttpError(`Could not generate token.`, 500));

  try {
    if (!jwtKey) return handleJWTException();
    const token = jwt.sign({ userId }, jwtKey, { expiresIn: '48h' });
    return token;
  } catch (err: any) {
    logger.r('genetrateJWToken', err?._message || err);
    return handleJWTException();
  }
};

const prepareUserData = (user: User): CleanUser => {
  const { password, ...newAccountData } = user.account!;
  return {
    account: newAccountData,
  };
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!isReqValid(req, next)) return;
  const { email, password } = req.body;

  try {
    // Get user account data from the DB.
    const userData = await getItem<User>(
      UserModel,
      { 'account.email': email },
      "There's no account associated with this email."
    );
    if (userData?.error) {
      return next(userData.error);
    }
    const user = userData.data;

    // Check provided password.
    let isPasswordValid = false;
    isPasswordValid = await bcrypt.compare(password, user.account.password);
    if (!isPasswordValid) {
      return next(new HttpError('Incorrect password.', 401));
    }

    // Generate JWT
    const token = genetrateJWToken(user._id, next);

    // Successfully logged in.
    res.status(200).send({
      data: {
        token,
        user: prepareUserData(user),
      },
    });
  } catch (err) {
    logger.r('Login', err);
    return next(
      new HttpError('User is not logged in. Please try again later.', 500)
    );
  }
};

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!isReqValid(req, next)) return;
  const { name, email, password } = req.body;

  try {
    // Check if email in use.
    const emailInUse = await UserModel.exists({ 'account.email': email });
    if (emailInUse) {
      return next(new HttpError('Email already in use.', 409));
    }

    // Hashing the provided password.
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create a new user.
    const user = new UserModel({
      account: {
        name,
        email,
        password: hashedPassword,
      },
    });

    await user.save();

    // Generate JWT.
    const userId = user._id.toString();
    const token = genetrateJWToken(userId, next);

    // Successfully signed in.
    res.status(201).send({
      data: {
        token,
        user: prepareUserData(user),
      },
    });
  } catch (err) {
    logger.r('Signup', err);
    return next(
      new HttpError('User is not signed up. Please try again later.', 500)
    );
  }
};
