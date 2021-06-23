const jwt = require('jsonwebtoken');
const AdminModel = require('../models/AdminModel');
const asyncHandler= require('express-async-handler');

const protect = asyncHandler( async(req,res,next) => {
    let token
    try{
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.admin = await AdminModel.findById(decoded.id).select('-password')
            next();
    
        }
    }catch(err) {
        console.error(err)
        res.status(401)
        throw new Error('not authorised, bad token')
    }
    if(!token){
        res.status(401)
        throw new Error('not authorized, no token')
    }
    
});

const manager = asyncHandler(async(req,res,next) => {
    if(req.admin && req.admin.adminRole === 'manager'){
        next()
    }else{
        res.status(401)
        throw new Error('You are not authorized for this operation' )
    }
})

const supervisor = asyncHandler(async(req,res,next) => {
    if(req.admin && req.admin.adminRole === 'supervisor'){
        next()
    }else{
        res.status(401)
        throw new Error('This operation is for a supervisor to handle')
    }
})

module.exports = {
    protect,
    manager,
    supervisor
}