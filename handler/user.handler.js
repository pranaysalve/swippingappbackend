exports.login = (UserModel) => async (req, res, next) => {
  try {
    const findData = await UserModel.find(req.body.MobileNumber);
    if (findData) {
      res.status(200).json({
        message: `Mobile Number already exists`,
      });
      return next();
    }
    const doc = await UserModel.create(req.body);
    if (!doc) {
      res.status(200).json({
        status: 200,
        message: `Can not let user login`,
      });
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
    res.status(200).json({
      status: "success",
      message: `Error ${err.message}`,
      data: err.message,
    });
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
