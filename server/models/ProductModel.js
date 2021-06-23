const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    productName : {
        type : String,
        required : true,
        trim : true,
    },
    quantity : {
        type : Number,
        required : true,
        default :0
    },
    price: {
        type: Number,
        required: true,
        default: 0,
      },
      admin : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Admin',
      },
    storekeeperComment : {
        type : String,
        required : true,
    },
    productLevel : {
        type : Number,
        required : true,
        default : 0,
    },
    isApprovedBySupervisor : {
        type : Boolean,
        default : false,
    },
    supervisorComment : {
        type : String,
        default : null
    },
    isApprovedByManager : {
        type : Boolean,
        default : false,
    }
},{
    timestamps : true,
});


module.exports = mongoose.model('Product', productSchema);