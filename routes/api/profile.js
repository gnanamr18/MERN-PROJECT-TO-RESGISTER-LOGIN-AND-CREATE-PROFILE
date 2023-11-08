const express = require('express');
const config = require('config');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const Profile = require('../../Models/Profile');
const User = require('../../Models/Users');

// @route    GET api/profile/me
// @desc     Get current users profile
// @access   Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate('user', ['name', 'avatar']);

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }
    res.json(profile);
    } 
    catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/profile
// @desc     Create or update user profile
// @access   Private
router.post(
  '/',
  auth,
  check('status', 'Status is required').notEmpty(),
  check('skills', 'Skills is required').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // destructure the request
    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      twitter,
      instagram,
      linkedin,
      facebook,
      // spread the rest of the fields we don't need to check
      ...rest
    } = req.body;


    // build a profile
    const profileFields = {};
    profileFields.user = req.user.id;
    if(company) profileFields.company = company;
    if(website) profileFields.website = website;
    if(location) profileFields.location = location;
    if(bio) profileFields.bio = bio;
    if(status)  profileFields.status = status;
    if(githubusername) profileFields.githubusername = githubusername;
    if(skills) {profileFields.skills = skills.split(',').map(skill => skill.trim())};

    profileFields.social = {}
    if(youtube) profileFields.social.youtube = youtube;
    if(company) profileFields.social.twitter = twitter;
    if(company) profileFields.social.facebook = facebook;
    if(company) profileFields.social.instagram = instagram;

   
   
    

    try {
      let profile =  await Profile.findOne({user: req.user.id});
      if(profile){
        profile = await Profile.findOneAndUpdate({user: req.user.id}, {$set: profileFields}, {new:true})
      }

      profile = new Profile(profileFields);
      await profile.save()
      return res.json(profile)
      
      
    } catch (error) {
      console.error(error.message);
      res.status(500).json('server serror')

    }


    
  }
);

module.exports = router;