import Report from '../models/report.js'


export const getAllReport = async (req, res) => {
    try {
        const report = await Report.find().populate('user'); 
        res.json(report);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const createReport = async (req, res) => {
    const { category, description, location, photo, user } = req.body;
    
    try {
        const newReport = new Report({ category, description, location, photo, user
        });
        const savedReport = await newReport.save();
        res.status(201).json(savedReport);
        
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const updateReport = async (req, res) => {
    try {
        const updatedReport = await Report.findByIdAndUpdate( 
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedReport); 
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const deleteReport = async (req, res) => {
    try {
        await Report.findByIdAndDelete(req.params.id); 
        res.json({ message: 'Report deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message }); 
    }
};
