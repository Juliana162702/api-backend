/*const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const UserSchema = new mongoose.Schema({
    username: {type: String, require: true, unique: true},
    passwoard: {type: String, require: true,},
});

UserSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
      this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

UserSchema.methods.comparePassword = function(next) {
    return bcrypt.compare(password, this.password);
};  

module.exports = mongoose.model('User', UserSchema);
*/

import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: { type: String, required: true,
    },
    email: { type: String, required: true, unique: true,
    },
    password: { type: String, required: true, minlength: 10
    },
    createdAt: { type: Date, default: Date.now 
    }
});

export default mongoose.model('User', userSchema);
