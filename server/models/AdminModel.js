const mongoose = require('mongoose');
const emailValidator = require('email-validator');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 12;

const AdminSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
  },
  lastName : {
    type : String,
    required : true,
    trim : true,
    minlength : 3
  },
  address : {
    type : String,
    trim : true
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 8,
  },
  email : {
    type :String,
    required : true,
    trim : true,
    index : { unique : true},
    lowercase : true,
    validate : {
      validator : emailValidator.validate,
      message : props => `${props.value} is not a valid email address!`
    },
  },
  phoneNo : {
      type : Number,
      required : true,
      index : {unique :true},
      trim : true,
    },
  adminRole : {
      type : String,
      required : true,
      trim : true,
    }

}, {
  timestamps : true
});

AdminSchema.pre('save', async function presave(next) {
  const admin = this;
  if(!admin.isModified('password')) return next();

  try{
    const hash = await bcrypt.hash(admin.password, SALT_ROUNDS);
    admin.password = hash;
    return next()

  }catch(err){
    console.error(err)
  }
})

AdminSchema.methods.comparePassword = async function comparePassword(candidate){
  return bcrypt.compare(candidate, this.password);
}


// firstName :'henry',
//             lastName : 'ag',
//             Address : 'surulere, Lagos',
//             email : 'tochihenry28@gmai.com',
//             password : 'iloveyou',
//             phoneNo : 2348154198374,
//             role : 'storekeeper'

module.exports = mongoose.model('Admin', AdminSchema);
