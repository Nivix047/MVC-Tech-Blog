const router = require("express").Router();
const { Post, User, Comment } = require("../models");

// Render homepage form
router.get("/", async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const postData = await Post.findAll({
      include: [User],
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));
    // Pass serialized data and session flag into template
    res.render("homepage", {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Render login form
router.get("/login", (req, res) => {
  // If the user is alrady logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

// Render signup form
router.get("/signup", (req, res) => {
  // If the user is alrady logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("signup");
});

// Render posts
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

    const post = postData.get({ plain: true });
    console.log("----post----");
    console.log(post);
    res.render("post", {
      post,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Render update route
router.get("/update", (req, res) => {
  // If the user is alrady logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.render("update", {
      logged_in: req.session.logged_in,
    });
  }
});

// Render comment route
// router.get("/comment/:id", async (req, res) => {
//   try {
//     const commentData = await Comment.findByPk(req.params.id, {
//       include: [
//         User,
//         {
//           model: Post,
//           include: [User],
//         },
//       ],
//     });
//     console.log("----commentData----");
//     console.log(commentData);
//     const comment = commentData.get({ plain: true });

//     res.render("comment", {
//       ...comment,
//       logged_in: req.session.logged_in,
//     });
//   } catch (err) {
//     res.status(500).json(err.message);
//   }
// });

module.exports = router;
