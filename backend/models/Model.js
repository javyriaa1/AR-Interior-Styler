import mongoose from 'mongoose';

const modelSchema = new mongoose.Schema({
    modelUrl: { type: String, required: true },
    posterUrl: { type: String, required: true },
    uploadedAt: { type: Date, default: Date.now }
});

const Model = mongoose.model('Model', modelSchema);

export default Model;
