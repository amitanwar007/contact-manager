const express = require("express");
const {
  AddContactData,
  GetContactData,
  UpdateContactData,
  DeleteContactData,
} = require("../controller/contactManager");
const router = express.Router();

router.route("/contacts").post(AddContactData);
router.route("/contacts").get(GetContactData);
router.route("/contacts/:id").put(UpdateContactData);
router.route("/contacts/:id").delete(DeleteContactData);

module.exports = router;
