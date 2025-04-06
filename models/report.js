import mongoose from 'mongoose'

const reportSchema = new mongoose.Schema({

    category: {type: String, require: true},
    description: {type: String, require: true},
    location: {
        latitude: { type: Number, requiere: true},
        longitude: { type: Number, requiere: true}
    },
    photo: { type: String, require: true},
    creat_atda: { type: Date, default: Date.now},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
})

export default mongoose.model('Report', reportSchema)