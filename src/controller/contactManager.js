const Contactdata = require("../model/contact");


exports.AddContactData = async (req, res, next) => {
  const { firstName, lastName, email, phone } = req.body;
  if (!firstName || !lastName || !email || !phone) {
    return res.status(403).json({
      success: false,
      message: "firstName,lastName,email,phone are mandatory",
    });
  }
  let contact = await Contactdata.findOne({ email });
  if (contact) {
    return res.status(403).json({
      success: false,
      message: "This email is Already Exist",
    });
  }
  contact = await Contactdata.findOne({ phone });
  if (contact) {
    return res.status(403).json({
      success: false,
      message: "This Phone number is Already Exist",
    });
  }
  contact = await Contactdata.create(req.body);
  try {
    res
      .status(200)
      .json({ success: true, message: "Contact added Successful", contact });
  } catch (err) {
    res
      .status(403)
      .json({ success: false, message: err.message });
  }
};


exports.GetContactData = async (req, res, next) => {
  const contact = await Contactdata.find(req.body);
  try {
    res.status(200).json({ success: true, contact });
  } catch (err) {
    res.status(403).json({ success: false, message: err.message });
  }
};

exports.GetSingleContactData = async (req, res, next) => {
  const contact = await Contactdata.findOne(req.params.id);
  if (!contact) {
    return res.status(404).json({
      success: false,
      message: `There is no contact with id: ${req.params.id}`,
    });
  }
  try {
    res.status(200).json({ success: true, contact });
  } catch (err) {
    res.status(403).json({ success: false, message: err.message });
  }
};

exports.UpdateContactData = async (req, res, next) => {
  let contact = await Contactdata.findById({ _id: req.params.id });
  if (!contact) {
    return res.status(404).json({
      success: false,
      message: `There is no contact with id: ${req.params.id}`,
    });
  }
  contact = await Contactdata.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: false,
  });

  try {
    res.status(200).json({
      success: true,
      message: "Contact Updated Successfully",
      contact,
    });
  } catch (err) {
    res.status(403).json({ success: false, message: err.message });
  }
};

exports.DeleteContactData = async (req, res, next) => {
  const { firstName, lastName, email, phone } = req.body;
  let contact = await Contactdata.findById({ _id: req.params.id });
  if (!contact) {
    return res.status(404).json({
      success: false,
      message: `There is no contact with id: ${req.params.id}`,
    });
  }
  contact = await Contactdata.findByIdAndDelete(req.params.id);
  const totalContacts = await Contactdata.countDocuments();
  try {
    res.status(200).json({
      success: true,
      message: "Contact Deleted Successfully",
      totalContacts,
    });
  } catch (err) {
    res.status(403).json({ success: false, message: err.message });
  }
};
