const { z } = require("zod");

const telephoneSchema = z.object({
    username: z.string().min(1, "Username is required"),
    email: z.string().email(),
    telephone: z.string()
        .length(10, "Telephone number must be exactly 10 digits long")
        .regex(/^\d+$/, "Telephone number must contain only digits"),
  });

  module.exports = {
    telephoneSchema,
  };