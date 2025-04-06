//import mongoose from 'mongoose'

/*
const reportSchema = new mongoose.Schema({
    nome: {
        type: String, 
        required: true 
    },
    description: {
        type: String, 
        required: true
    },
    location: {
        latitude: { 
            type: Number, 
            required: true 
        },
        longitude: { 
            type: Number, 
            required: true
        }
    },
    photo: { 
        type: String, 
        required: true
    },
    created_at: {
        type: Date, 
        default: Date.now 
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true
    }
});

export default mongoose.model('Report', reportSchema);

*/

import { Router } from 'express'
const router = Router();
import {  getAllReport, createReport, updateReport, deleteReport } from '../controllers/reportController.js';

router.get('/', getAllReport);       
router.post('/', createReport);     
router.put('/:id', updateReport);
router.delete('/:id', deleteReport);

export default router;
