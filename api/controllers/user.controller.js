import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs'
export const test = (req, res) => {
    res.json({
        message: 'Hello world!', 
    });
};

export const updateUser = async(req, res, next) => {
    if(req.user.id !== req.params.id) return  next(errorHandler(401, 'You are not authorised'));

    try {
        if(req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10);
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set:{
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar,
            }
        }, {new: true}) // adding new: true becuase it will update with new changes not old one
        const { password, ...rest} = updatedUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
}

export const deleteUser = async(req, res, next) => {
    console.log(req.user.id);
    console.log(req.user.id !== req.params.id);
   if(req.user.id !== req.param.id){
    return next(errorHandler(401, 'You can only delete your own account!'));
   }
   
   try {
       await User.findByIdAndDelete(req.param.id);
       res.clearCookie('access_token');
       res.status(200).json('User has been Deleted');
   } catch (error) {
      next(error);
   }
}