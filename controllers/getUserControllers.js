import User from "../models/userModel.js";
import Details from "../models/userDetailsModel.js";

import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";

// Get User By Id: /getuser/single/:id
export const getUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if(!user){
    return next(new ErrorHandler("User Not Found", 404));
  }
  res.status(200).json({ success: true, user });
});

// Get User By Branch: /getuser/branch/:br
export const getUserBr = catchAsyncErrors(async (req, res, next) => {
  const branch = await Details.find({
   'collegeDetail.collegeBranch': req.params.br
  });
  if(branch.length == 0){
    return next(new ErrorHandler("User Not Found By Branch", 404));
  }
  res.status(200).json({ success: true, branch });
});
