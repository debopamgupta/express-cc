const express = require("express");
const uuid = require("uuid");

let members = require("../../Members");
const logger = require("../../middlewares/logger");

const router = express.Router();

// this route gets all members
router.get("/", logger, (req, res) => res.json(members));

// this route gets single member
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const found = members.some((m) => m.id === id);

  if (found) {
    const validMember = members.filter((m) => m.id === id);
    res.json(validMember);
  } else {
    res.status(400).json({
      errorMsg: `No member with the id ${id}`,
    });
  }
});

// Add a new member
router.post("/", (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
  };

  if (!newMember.name || !newMember.email) {
    return res.status(400).json({ err: "Please include a name and email" });
  }

  members.push(newMember);

  res.json(newMember);
  // res.redirect("/");
});

// Update a member
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const found = members.some((m) => m.id === id);

  if (found) {
    const { name, email } = req.body;
    // if included, update the member

    members.forEach((member) => {
      if (member.id === id) {
        member.name = name || member.name;
        member.email = email || member.email;
      }
      return res.json({
        message: "Member updated",
        updatedMember: member[id],
      });
    });
  }
});

// delete members
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  const found = members.some((m) => m.id === id);

  if (found) {
    members = members.filter((m) => m.id !== id);

    res.json({
      msg: `Member with the id ${id} has been deleted`,
      members,
    });
  } else {
    res.status(400).json({ errorMsg: `No member with the id ${id}` });
  }
});

module.exports = router;
