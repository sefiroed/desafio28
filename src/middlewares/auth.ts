import passport from 'passport';
import Config from '../config';
import { Request, Response, NextFunction } from 'express';
import { 
  VerifyFunction, 
  StrategyOption, 
  Strategy as FaceBookStrategy, 
} from 'passport-facebook';



const strategyOptions: StrategyOption = {
  clientID: Config.FACEBOOK_APP_ID,
  clientSecret: Config.FACEBOOK_APP_SECRET,
  callbackURL: 'http://localhost:8080/api/auth/facebook/callback',
  profileFields: ['id', 'displayName', 'photos', 'emails'],
};

const loginFunc: VerifyFunction = async (
  accessToken,
  refreshToken,
  profile,
  done
) => {
  console.log('SALIO TODO BIEN');
  console.log(accessToken);
  console.log(refreshToken);
  console.log(profile);
  return done(null, profile);
};

passport.use(new FaceBookStrategy(strategyOptions, loginFunc));

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj: string, cb) {
  cb(null, obj);
});

export const isLoggedIn = (req: Request, res: Response, done: NextFunction) => {
  if (!req.isAuthenticated())
    return res.status(401).json({ msg: 'Unathorized' });

  done();
};

export default passport;




// import passport from 'passport';
// import passportLocal from 'passport-local';
// import { UserModel } from '../models/user';

// const LocalStrategy = passportLocal.Strategy;

// const strategyOptions = {
//   usernameField: 'username',
//   passwordField: 'password',
//   passReqToCallback: true,
// };

// const loginFunc = async (req, username, password, done) => {
//   const user = await UserModel.findOne({ username });

//   if (!user) {
//     console.log('paso por aqui')
//     return done(null, false, { message: 'User does not exist' });
//   }
//   if (!user.isValidPassword(password)) {
//     console.log('paso por aqui')
//     return done(null, false, { message: 'Password is not valid.' });
//   }
//   console.log('SALIO TODO BIEN');
//   return done(null, user);
// };

// const signUpFunc = async (req, username, password, done) => {
//   try {
//     const { username, password, email, firstName, lastName } = req.body;
//     console.log(req.body);
//     if (!username || !password || !email || !firstName || !lastName) {
//       console.log('Invalid body fields');
//       return done(null, false);
//     }

//     const query = {
//       $or: [{ username: username }, { email: email }],
//     };

//     console.log(query);
//     const user = await UserModel.findOne(query);

//     if (user) {
//       console.log('User already exists');
//       console.log(user);
//       return done(null, false, 'User already exists');
//     } else {
//       const userData = {
//         username,
//         password,
//         email,
//         firstName,
//         lastName,
//       };

//       const newUser = new UserModel(userData);

//       await newUser.save();

//       return done(null, newUser);
//     }
//   } catch (error) {
//     done(error);
//   }
// };

// passport.use('login', new LocalStrategy(strategyOptions, loginFunc));
// passport.use('signup', new LocalStrategy(strategyOptions, signUpFunc));

// passport.serializeUser((user, done) => {
//   // console.log(user);
//   done(null, user);
// });

// passport.deserializeUser((userId, done) => {
//   UserModel.findById(userId, function (err, user) {
//     done(err, user);
//   });
// });

// export const isLoggedIn = (req, res, done) => {
//   if (!req.user) return res.status(401).json({ msg: 'Unathorized' });

//   done();
// };

// export default passport;

