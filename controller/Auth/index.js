import { LoginValidator, RegisterValidator } from "../../service/Validators";
import CustomError from "../../service/CustomError";
import { User } from "../../model";
import ConfirmMail from "../../service/ConfirmMail";
import JWT from "../../service/JWT";

const controller = {
  async login(req, res, next) {
    const { error } = LoginValidator.validate(req.body);
    if (error) return next(error);
    res.send("hello");
  },
  async register(req, res, next) {
    const { error } = RegisterValidator.validate(req.body);
    if (error) return next(error);
    const { username, email, password } = req.body;
    const user = User({
      username,
      email,
      password,
    });
    const validData = JWT.sign({ username, email, password }, "500s");
    res.cookie("validData", validData, {
      maxAge: new Date(Date.now() + 200000),
      secure: true,
      httpOnly: true,
      sameSite: "none",
    });
    const confirmData = JWT.sign({ id: user._id, email }, "60s");
    ConfirmMail(
      email,
      username,
      `http://localhost:8000/auth/confirm/${confirmData}`
    );
    res.send("check your mail to activate your account");
  },

  //#######################################################

  async activateUser(req, res, next) {
    const { token } = req.params;
    try {
      const { email: verifedEmail } = JWT.sign_v(token);
      const { validData } = req.cookies;
      if (!validData) return next(CustomError.notValid);
      const { username, email, password } = JWT.sign_v(validData);
      if (email != verifedEmail) return next(CustomError.unauthorized);
      const user = User({
        username,
        email,
        active: true,
      });
      user.setPassword(password);
      await user.save();
      res.send("Activated");
    } catch (error) {
      console.log(error);
    }
  },

  // #######################################################
  async reset(req, res, next) {
    const { error } = RegisterValidator.validate(req.body);
    if (error) return next(error);
  },
  async resetConfirm(req, res, next) {
    const { error } = RegisterValidator.validate(req.body);
    if (error) return next(error);
  },
  async updatePassword(req, res, next) {
    const { error } = RegisterValidator.validate(req.body);
    if (error) return next(error);
  },
  async profile(req, res, next) {
    const { error } = RegisterValidator.validate(req.body);
    if (error) return next(error);
  },
};

export default controller;
