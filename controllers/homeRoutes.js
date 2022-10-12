const router = require("express").Router();
const { Post, User, Comment } = require("../models");

router.get("/", async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const postData = await Post.findAll({
      include: [User],
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));
    console.log(posts);
    // Pass serialized data and session flag into template
    res.render("homepage", {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  // If the user is alrady logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

router.get("/signup", (req, res) => {
  // If the user is alrady logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("signup");
});

router.get("/post/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        User,
        {
          model: Comment,
          include: [User],
        },
      ],
    });
    console.log("----postData----");
    console.log(postData);
    const post = postData.get({ plain: true });

    res.render("post", {
      ...post,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.get("/update", (req, res) => {
  // If the user is alrady logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.render("update", {
      logged_in: req.session.logged_in,
    });
  }
});

// Route to update
// router.get("/update", withAuth, async (req, res) => {
//   res.render("update");
// });

module.exports = router;
