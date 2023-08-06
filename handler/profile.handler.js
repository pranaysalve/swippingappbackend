const AppError = require("../utils/appError");

exports.profilesubmit = (ProfileModel) => async (req, res, next) => {
  try {
    console.log(req.body);
    const doc = await ProfileModel.create(req.body);
    if (!doc) {
      res.status(400).send(new AppError("User Cannot submit details"));
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

exports.getProfiles = (ProfileModel) => async (req, res, next) => {
  try {
    const doc = await ProfileModel.find({ CreatedBy: req.params.id });
    console.log({ doc });
    if (!doc) {
      res.status(400).send(new AppError("No Record found"));
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
