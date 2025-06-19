import mongoose from "mongoose";

const CaseSchema = new mongoose.Schema({
  selectedTemplate: { type: String },
  imageUrl: { type: String },
  imageDimensions: {
    height: { type: Number },
    width: { type: Number },
  },
  backgroundColor: { type: String },
  price: { type: Number, default: 14.99 },
});

const CustomCase = mongoose.model("CustomCase", CaseSchema);
export default CustomCase;


