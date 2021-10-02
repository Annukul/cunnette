import User from "../models/userModel.js";
import Details from '../models/userDetailsModel.js';

// get: /getuser/:id
export const getUser = async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id);
  
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
}

// get: /getuser/:br
export const getUserBr = async (req, res) => {
    try {
        const branch = await Details.find({collegeDetails: {collegeBranch: req.params.br}});
  
      res.status(200).json(branch);
    } catch (error) {
        res.status(500).json(error.message);
    }
}