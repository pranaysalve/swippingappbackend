const AppError = require("../utils/appError");

exports.login = (UserModel) => async (req, res, next) => {
  try {
    const findData = await UserModel.find({
      MobileNumber: req.body.MobileNumber,
    });

    if (findData.length > 0) {
      new AppError("Mobile number already exists");
      return next();
    }
    const doc = await UserModel.create(req.body);
    if (!doc) {
      new AppError("User Can not login");
      return next();
    }
    res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  } catch (err) {
    console.log({ err });
    new AppError(`${err.message}`, 400);
    return next();
  }
};

exports.otpcheck = (UserModel) => async (req, res, next) => {
  try {
    const { OTP, MobileNumber } = await req.body;
    const doc = await UserModel.find({ MobileNumber: MobileNumber, OTP: OTP });
    if (!doc) {
      res.status(200).json({
        status: "error",
        message: `OTP Dose not match`,
      });
      return next();
    }
    res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
      login: true,
      otpvalidation: true,
    });
  } catch (err) {
    console.log({ err });
    res.status(200).json({
      status: "success",
      message: `Error ${err.message}`,
      data: err.message,
    });
  }
};
