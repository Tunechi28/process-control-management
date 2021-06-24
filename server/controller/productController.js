const asyncHandler = require('express-async-handler');
const ProductModel = require ('../models/ProductModel');
const { protect, manager } = require('../middleware/authMiddleware');



//@desc get list of products
//@route GET /api/products
//@access public admins
const getProducts = asyncHandler( async (req,res) => {
    const products = await ProductModel.find({})
    res.status(200).json(products);
})

//@desc get a particular product
//@route GET /api/products/:id
//@access public admins

const getProductById = asyncHandler( async (req,res) => {
    const product = await ProductModel.findById(req.params.id);
    if(product){
        res.status(200).json(product);
    }else{
        res.status(404);
        throw new Error('product not found');
    }
});

//@desc delete a particular product
//@route DELETE /api/products/:id
//@access public admins

const deleteProduct = asyncHandler( async (req,res) => {
    const product = await ProductModel.findById(req.params.id);
    const admin = req.admin
    if(!product){
        res.status(404)
        throw new Error('product not found');
        
    }

    if(admin.adminRole === 'manager' || JSON.stringify(admin._id) == JSON.stringify(product.admin)){
        await product.remove();
        res.status(200).json({
            message : 'product has been deleted'
        })
    }
});

//@desc create a product
//@route POST /api/products/create
//@access public admins

const createProduct = asyncHandler( async (req,res) => {
    const { productName, quantity, price, storekeeperComment } = req.body
    const existingProduct = await ProductModel.findOne({productName});
    if(existingProduct){
        res.status(400).json({
            message : 'product already exist'
        })
    }

    const admin = req.admin;

    if(admin.adminRole === 'storekeeper'){
        const product = await ProductModel.create({
            productName,
            quantity,
            price,
            storekeeperComment,
            admin
        })
    
        if(product){
            res.status(201).json({
                id : product._id,
                quantity : product.quantity,
                price : product.price,
                storekeeperComment : product.storekeeperComment,
                admin : product.admin,
                productLevel : 0,
                isApprovedBySupervisor : false,
                supervisorComment : null,
                isApprovedByManager : false,
            })
        }else{
            res.status(422)
            throw new Error('invalid  data');
        }
    }else{
        res.status(401);
        throw new Error('Only storekeepers are allowed to create products');
    }
    
})

//@desc update a product
//@route PUT /api/products/create
//@access public admins

const updateProduct = asyncHandler( async (req,res) => {
    const product = await ProductModel.findById(req.params.id);
    const admin = req.admin;
    if(!product){
        res.status(404);
        throw new Error('product not found');
    }
    // JSON.stringify(product.admin) === JSON.stringify(admin._id)
    if(admin.adminRole === 'manager' || JSON.stringify(admin._id) == JSON.stringify(product.admin)){
        product.productName = req.body.productName || product.productName;
        product.quantity = req.body.quantity || product.quantity;
        product.price = req.body.price || product.price;
        product.storekeeperComment = req.body.storekeeperComment || product.storekeeperComment;
        const updatedProduct = await product.save();

        res.status(201).json({
            id : updatedProduct._id,
            productName : updatedProduct.productName,
            quantity : updatedProduct.quantity,
            price : updatedProduct.price,
            storekeeperComment : updatedProduct.storekeeperComment,

        })
    }else{
        res.status(401);
        throw new Error('Only storekeeper who created product can update it or the manager')
    }

})

//@desc approva a product by supervisor
//@route PUT /api/products/:id/supervisor
//@access public admins

const supervisorUpdate = asyncHandler( async (req,res) => {
    const product = await ProductModel.findById(req.params.id);
    if(!product){
        res.status(404);
        throw new Error('product not found')
    }
    const { supervisorComment, isApprovedBySupervisor} = req.body
    product.supervisorComment = supervisorComment;
    product.isApprovedBySupervisor = isApprovedBySupervisor;
    product.isApprovedBySupervisor ===true ? product.productLevel = 1 : product.productLevel =0;

    const updatedProduct = await product.save();

    
    res.status(201).json({
        id : updatedProduct._id,
        productName : updatedProduct.productName,
        quantity : updatedProduct.quantity,
        price : updatedProduct.price,
        productLevel : updatedProduct.productLevel,
        storekeeperComment : updatedProduct.storekeeperComment,
        isApprovedBySupervisor : updatedProduct.isApprovedBySupervisor,
        supervisorComment : updatedProduct.supervisorComment

    })

})

//@desc Get products approved by a supervisor
//@route GET /api/products/:id/supervisor
//@access public admins

const productsPendingSupervisorApproval = asyncHandler( async(req,res) => {
    const products = await ProductModel.find({productLevel : 0 });
    if(products){
        res.status(200).json(products)
    }else{
        res.status(400);
        throw new Error('all products have been approved by supervisor and no new products have been created');
    }
})

const productsPendingManagerApproval = asyncHandler( async(req,res) => {
    const products = await ProductModel.find({productLevel : 1 });
    if(products){
        res.status(200).json(products)
    }else{
        res.status(400);
        throw new Error('no new products has been approved by the supervisor');
    }
})

//@desc approve a product by Manager
//@route PUT /api/products/:id/supervisor
//@access public admins

const managerUpdate = asyncHandler( async (req,res) => {
    const product = await ProductModel.findById(req.params.id);
    if(!product){
        res.status(404);
        throw new Error('product not found')
    }
    if(product.productLevel === 0){
        res.json({
            message : 'the product has not been approved by a supervisor'
        })
       
    }else{
        const { isApprovedByManager} = req.body
        product.isApprovedByManager = isApprovedByManager;
        product.isApprovedByManager ===true ? product.productLevel = 2 : product.productLevel =1;
    
        const updatedProduct = await product.save();
    
        
        res.status(201).json({
            id : updatedProduct._id,
            productName : updatedProduct.productName,
            quantity : updatedProduct.quantity,
            price : updatedProduct.price,
            productLevel : updatedProduct.productLevel,
            storekeeperComment : updatedProduct.storekeeperComment,
            isApprovedBySupervisor : updatedProduct.isApprovedBySupervisor,
            supervisorComment : updatedProduct.supervisorComment,
            isApprovedByManager : updatedProduct.isApprovedByManager
    
        })
       
    }
   

})


const productsForSale = asyncHandler( async(req,res) => {
    const products = await ProductModel.find({productLevel : 2 });
    if(products){
        res.status(200).json(products)
    }else{
        res.status(400);
        throw new Error('this product has not been approved by he manager for sale');
    }
})


module.exports = {
    getProducts,
    getProductById,
    deleteProduct,
    createProduct,
    updateProduct,
    supervisorUpdate,
    productsPendingSupervisorApproval,
    productsPendingManagerApproval,
    managerUpdate
}

