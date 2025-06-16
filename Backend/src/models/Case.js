import mongoose from "mongoose";

const CaseSchema = new mongoose.Schema({
  selectedTemplate: { type: String },
  imageUrl: { type: String },
  imageDimensions: {
    height: { type: Number},
    width: { type: Number},
  },
  backgroundColor: { type: String },
});

const Case = mongoose.model("Case", CaseSchema);

export default Case;
