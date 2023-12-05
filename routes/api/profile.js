const express = require("express");
const config = require("config");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const Profile = require("../../Models/Profile");
const User = require("../../Models/Users");

// @route    GET api/profile/me
// @desc     Get current users profile
// @access   Private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name", "avatar"]);

    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    POST api/profile
// @desc     Create or update user profile
// @access   Private
router.post(
  "/",
  auth,
  check("status", "Status is required").notEmpty(),
  check("skills", "Skills is required").notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // destructure the request
    const { company, location, status, github, skills } = req.body;

    // build a profile
    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;

    if (location) profileFields.location = location;

    if (status) profileFields.status = status;
    if (github) profileFields.github = github;
    if (skills) {
      profileFields.skills = skills.split(",").map((skill) => skill.trim());
    }

    try {
      let profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
      }

      profile = new Profile(profileFields);
      await profile.save();
      return res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).json("server serror");
    }
  },

  // get all profiles
  router.get("/", async (req, res) => {
    try {
      const profiles = await Profile.findOne().populate("user", [
        "name",
        "avatar",
      ]);
      res.json(profiles);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("server error");
    }
  }),

  // get profile by user id
  router.get("/user/:user_id", async (req, res) => {
    try {
      const profile = await Profile.findOne({
        user: req.params.user_id,
      }).populate("user", ["name", "avatar"]);
      console.log(req.params.user_id);
      if (!profile) {
        return res.status(400).send("invalid user id");
      }
      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("server error");
    }
  }),
  // delete user
  router.delete("/", auth, async (req, res) => {
    console.log(req.body);
    try {
      await Profile.findOneAndDelete({ user: req.user.id });

      await User.findOneAndDelete({ _id: req.user.id });
      res.status(200).send("user deleted");
    } catch (error) {
      console.error(error.message);
      res.status(500).send("server error");
    }
  }),

  router.put(
    "/experience",
    [
      auth,
      (check("title", "title is required").notEmpty(),
      check("company", "Company is required").notEmpty(),
      check(
        "from",
        "From date is required and needs to be from the past"
      ).notEmpty()),
    ],

    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { title, company, location, from, to, current, description } =
        req.body;

      const newExp = {
        title,
        company,
        location,
        from,
        to,
        current,
        description,
      };
      try {
        const profile = await Profile.findOne({ user: req.user.id });
        profile.experience.unshift(newExp);
        await profile.save();
        res.json(profile);
      } catch (error) {
        console.error(error.message);
        res.status(500).send("server error");
      }
    }
  ),
  router.delete("/experience/:exp_id", auth, async (req, res) => {
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      const removeIndex = profile.experience
        .map((item) => item.id)
        .indexOf(req.params.exp_id);
      profile.experience.splice(removeIndex, 1);
      await profile.save();
      res.json(profile);
    } catch (error) {}
  })
);

module.exports = router;
