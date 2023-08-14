const AJV = require("ajv");
const ajv = new AJV({ allErrors: true });

class contactValidation {
  static async cheack(schema, data) {
    return new Promise((resolve, reject) => {
      try {
        const valid = ajv.validate(schema, data);
        if (!valid) {
          reject(ajv.errorsText());
        } else {
          resolve(null);
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  static async add(req, res, next) {
    const schema = {
      type: "object",
      properties: {
        fullname: {
          type: "string",
          minLength: 2,
          maxLength: 60,
        },
        phone: {
          type: "string",
          minLength: 7,
          maxLength: 18,
          pattern: "^[0-9]*$",
        },
      },
      required: ["fullname", "phone"],
      additionalProperties: false,
    };

    try {
      await contactValidation.cheack(schema, req.body);
      next();
    } catch (error) {
      res.status(400).json({
        variant: "warning",
        message: "Validation error",
        error,
      });
    }
  }

  static async update(req, res, next) {
    const schema = {
      type: "object",
      properties: {
        fullname: {
          type: "string",
          minLength: 2,
          maxLength: 60,
        },
        phone: {
          type: "string",
          minLength: 7,
          maxLength: 18,
          pattern: "^[0-9]*$",
        },
      },
      required: ["fullname", "phone"],
      additionalProperties: false,
    };

    try {
      const { fullname, phone } = await req.body;
      await contactValidation.cheack(schema, { fullname, phone });
      next();
    } catch (error) {
      res.status(400).json({
        variant: "warning",
        message: "Validation error",
        error,
      });
    }
  }
}

module.exports = contactValidation;
