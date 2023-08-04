const AppError = require("../utils/appError");

exports.login = (UserModel) => async (req, res, next) => {
  try {
    const findData = await UserModel.find({
      MobileNumber: req.body.MobileNumber,
    });
    console.log(req.body);
    if (findData.length > 0) {
      console.log({ findData });
      res.status(400).send(new AppError("Mobile number already exists", 400));
      return next();
    }
    const doc = await UserModel.create(req.body);
    if (!doc) {
      res.status(400).send(new AppError("User Can not login"));
      return next();
    }
    console.log({ doc });
    res.status(200).json({
      status: "success",
      data: doc,
    });
  } catch (err) {
    console.log({ err });
    res.status(400).send(new AppError(`${err.message}`, 400));
  }
};

exports.otpcheck = (UserModel) => async (req, res, next) => {
  try {
    const { OTP, MobileNumber } = await req.body;
    const doc = await UserModel.findOne({
      MobileNumber: MobileNumber,
      OTP: OTP,
    });
    if (!doc) {
      res.status(400).send(new AppError("Can not find data"));
      return next();
    }
    res.status(200).json({
      status: "success",
      data: doc,
      login: true,
      otpvalidation: true,
    });
  } catch (err) {
    console.log({ err });
    res.status(400).send(new AppError(`${err.message}`, 400));
  }
};
