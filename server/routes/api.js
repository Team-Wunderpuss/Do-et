const express = require("express");

const userController = require("../controllers/userController");

const router = express.Router();

// router.get("/", async (req, res, next) => {
//   console.log('API router fired');
//   try {
//     const data = await userController.createUser(req, res, next);
//     res.status(200).json({users: res.locals.users});
//   } catch {
//     console.error("error");
//   }
// });




// create/validate new user
router.post('/', userController.createUser, (req, res) => {
      // const users = await userController.createUser(req, res, next);
      res.status(200).json({ user: res.locals.user });
  });
  //   async (req, res, next) => {
  //     try {
  //       const users = await userController.validateUser(req, res, next);
  //       next();
  //     } catch (err) {
  //       return next({
  //         log: `api/user: ERROR ${err}`,
  //         message: { err: "something went terribly wrong :(" }
  //       });
  //     }
  //   },
  // );


module.exports = router;