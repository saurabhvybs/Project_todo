const Contact = require("../models/contact");
const { z } = require("zod");
const { telephoneSchema } = require("../validators/contactValidators");

const contact = async (req, res) => {
  try {
    // Validate the incoming request data
    const validationResult = telephoneSchema.safeParse(req.body);

    if (!validationResult.success) {
      return res
        .status(400)
        .json({
          msg: "Validation failed",
          errors: validationResult.error.errors,
        });
    }

    const { username, email, telephone } = req.body;

    const contactUser = new Contact({ username, email, telephone });
    await contactUser.save();
    return res.status(200).json({ msg: "Contact Saved Successfully " });
  } catch (error) {
    return res.status(500).json({ msg: " Something Went Wrong " });
  }
};

module.exports = {contact};