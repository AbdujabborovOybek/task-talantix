const services = require("../Service/contact.service");

class contact {
  async add(req, res) {
    try {
      const result = await services.add(req.body);
      res.status(200).json({
        variant: "success",
        message: "Contact has been added",
        contact: result,
      });
    } catch (err) {
      res.status(500).json({
        variant: "error",
        message: "Internal server error",
        error: err?.message,
      });
    }
  }
  async getAll(req, res) {
    try {
      const result = await services.getAll();
      res.status(200).json({
        variant: "success",
        message: "Get all contact success",
        contact: result,
      });
    } catch (err) {
      res.status(500).json({
        variant: "error",
        message: "Internal server error",
        error: err?.message,
      });
    }
  }
  async getOne(req, res) {
    try {
      const result = await services.getOne(req.params.id);
      res.status(200).json({
        variant: "success",
        message: "Get one contact success",
        contact: result,
      });
    } catch (err) {
      res.status(500).json({
        variant: false,
        message: "Internal server error",
        error: err?.message,
      });
    }
  }
  async update(req, res) {
    try {
      const result = await services.update(req.params.id, req.body);
      res.status(200).json({
        variant: "success",
        message: "Contact has been updated",
        contact: result,
      });
    } catch (err) {
      res.status(500).json({
        variant: "error",
        message: "Internal server error",
        error: err?.message,
      });
    }
  }
  async delete(req, res) {
    try {
      const result = await services.delete(req.params.id);
      res.status(200).json({
        variant: "success",
        message: "Contact has been deleted",
        contact: result,
      });
    } catch (err) {
      res.status(500).json({
        variant: "error",
        message: "Internal server error",
        error: err?.message,
      });
    }
  }
}

module.exports = new contact();
