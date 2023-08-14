const rt = require("express").Router();

// ==== Router form contact ====
const contact = require("./Controller/contact.controller");
const validation = require("./Validation/contact.validation");
rt.post("/add/contact", [validation.add], contact.add);
rt.get("/get/contact", contact.getAll);
rt.get("/get/contact/:id", contact.getOne);
rt.patch("/update/contact/:id", [validation.update], contact.update);
rt.delete("/delete/contact/:id", contact.delete);

module.exports = rt;
