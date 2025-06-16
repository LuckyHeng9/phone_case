import Case from "../models/Case.js";
import cloudinary from "cloudinary";
import connectCloudinary from "../config/cloudinary.js";

const designController = {
  design: async (req, res) => {
    try {
      const { selectedTemplate, imageDimensions, backgroundColor } = req.body;

      if (!selectedTemplate || !imageDimensions) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      // Upload image to Cloudinary 
      const uploadStream = () => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.v2.uploader.upload_stream(
            { folder: "designs" },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          stream.end(req.file.buffer); 
        });
      };

      const result = await uploadStream();
      const imageUrl = result.secure_url;

      // Create a new Case document
      const newCase = new Case({
        selectedTemplate,
        imageUrl,
        imageDimensions,
       backgroundColor,
      });

      // Save to MongoDB
      await newCase.save();
      res.status(201).json(newCase);
    } catch (error) {
      console.error("Error saving design:", error);
      res.status(500).json({ message: "Server error" });
    }
  },



  get_design: async (req, res) => {
    try {
      const { _id } = req.params;  // Get the ID from the URL params
      const design = await Case.findById(_id);  // Find the design by ID in the database

      if (!design) {
        return res.status(404).json({ message: "Design not found" });
      }

      res.status(200).json(design);  // Return the design if found
    } catch (error) {
      console.error("Error retrieving design:", error);
      res.status(500).json({ message: "Server error" });
    }
  },
 

};

export default designController;
