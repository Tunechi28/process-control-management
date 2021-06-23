const asyncHandler = require('express-async-handler');
const generateToken = require('../../utils/generateToken');
const AdminModel = require('../models/AdminModel');
const { validationResult } = require('express-validator');

// @desc    Auth user & get token
// @route   POST /api/admins/login
// @access  Public

const authAdmin = asyncHandler(async(req,res) => {

    // const errors = validationResult(req);
    // if(!errors.isEmpty()) {
    //     return res.status(422).json({success: false, message: "Validation failed", errors});
    // }

    const { email, password } = req.body
    const admin = await AdminModel.findOne({email});
    // res.status(200).json({
    //     firstName : admin.firstName,
    // })
    if(admin && (await admin.comparePassword(password))){
        res.json({
            _id : admin._id,
            firstName : admin.firstName,
            lastName : admin.lastName,
            email : admin.email,
            address : admin.address,
            phoneNo : admin.phoneNo,
            role : admin.adminRole,
            token: generateToken(admin._id)
        })
    }else {
        res.status(400)
        throw new Error('email or password incorrect')
    }
});

//@desc Create a new admin
//@route POST /api/admins/create
//@access public

const createAdmin = asyncHandler(async(req,res) => {
    const { firstName, lastName, email, password, phoneNo, address, adminRole } = req.body
    const adminExist = await AdminModel.findOne({email});
    
        if(adminExist){
            res.status(400).json({
                message : 'admin profile already exist'
            })
        }  
    
        const admin = await AdminModel.create({
            firstName,
            lastName,
            email,
            password,
            address,
            phoneNo,
            adminRole
        })

        if(admin){
            res.status(201).json({
                id : admin._id,
                firstName : admin.firstName,
                lastName : admin.lastName,
                email : admin.email,
                address : admin.address,
                phoneNo : admin.phoneNo,
                adminRole : admin.adminRole
            })
        }else{
            res.status(422)
            throw new Error('invalid admin data')
        }
   
});


//@desc get list of admins
//@route GET /api/admins
//@access private manager

const getAdmins = asyncHandler(async (req,res) => {
    const admins = await AdminModel.find({}).select('-password');
    res.json(admins)
});

// @desc    Get admin by ID
// @route   GET /api/admins/:id
// @access  Private/manager

const getAdminById = asyncHandler(async (req,res) => {
    const admin = await AdminModel.findById(req.params.id).select('-password');

    if(admin){
        res.json(admin)
    }else{
        res.status(404)
        throw new Error('admin profile not found')
    }
})

// @desc    delete admin
// @route   DELETE /api/admins/:id
// @access  Private/manager

const deleteAdmin = asyncHandler(async (req,res) => {
    const admin = await AdminModel.findById(req.params.id).select('-password');

    if(admin){
        await admin.remove();
        res.json({
            message : 'admin profile has been deleted'
        })
    }else{
        res.status(404)
        throw new Error('admin profile not found')
    }
})



// @desc    Update Admin role
// @route   POST /api/admins/:id
// @access  Private/manager

const updateAdmin = asyncHandler(async (req,res) => {
    const admin = await AdminModel.findById(req.params.id)
    if(admin){
        admin.firstName = req.body.firstName || admin.firstName,
        admin.lastName = req.body.lastName || admin.lastName,
        admin.email = req.body.email || admin.email,
        admin.phoneNo = req.body.phoneNo || admin.phoneNo
        admin.adminRole = req.body.adminRole || admin.adminRole,
        admin.address = req.body.address || admin.address

        const updatedAdmin = await admin.save();
        res.status(201).json({
            id : updatedAdmin._id,
            firstName : updatedAdmin.firstName,
            lastName : updatedAdmin.lastName,
            phoneNo : updatedAdmin.phoneNo,
            adminRole : updatedAdmin.adminRole,
            address : updatedAdmin.address
        })
    }else{
        res.status(400)
        throw new Error('Admin profile not found')
    }
   
})

module.exports = {
    authAdmin,
    createAdmin,
    getAdmins,
    getAdminById,
    deleteAdmin,
    updateAdmin
}


// firstName :'henry',
//             lastName : 'ag',
//             Address : 'surulere, Lagos',
//             email : 'tochihenry28@gmai.com',
//             password : 'iloveyou',
//             phoneNo : 2348154198374,
//             role : 'storekeeper'
