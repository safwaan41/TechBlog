const router = require('express').Router();
const { Project, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

//HOME PAGE ROUTE
router.get('/', async (req, res) => {
    try {
      // Get all posts and JOIN with user data
      const projectData = await Project.findAll({
        include: [
          {
            model: User,
            attributes: ['name'],
          },
          {
            model: Comment,
            attributes: ['body'],
          }
        ],
      });
      
      const projects = projectData.map((project) => project.get({ plain: true }));

      res.render('homepage', { 
        projects,
        logged_in: req.session.logged_in 
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  router.get('/profile', withAuth, async (req, res) => {
    try {
      // Find the logged in user based on the session ID
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{ model: Project }],
      });
  
      const user = userData.get({ plain: true });
  
      res.render('profile', {
        ...user,
        logged_in: true
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect('/profile');
      return;
    }
  
    res.render('login');
  });
  
  router.get('/project/:id', async (req, res) => {
    try {
      const projectData = await Project.findOne({where: {id: req.params.id}})
      res.render('project', projectData)
    } catch (error) {
      res.status(500).json(error);
    }
  });
  
  
  
  
module.exports = router;

