const {OAuth2Client} = require('google-auth-library');

const oAuthController = {};

oAuthController.tokenValidation = (req, res, next) => {
  console.log('in oAuth');
  //get token from body
  const { id_token } = req.body;
  const client = new OAuth2Client(process.env.GAPI_CLIENT_ID);
  async function verify() {
    const ticket = await client.verifyIdToken({
      idToken: id_token,
      audience: process.env.GAPI_CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    // console.log("this is your gapi payload ", payload);
    const userid = payload['sub'];
    // If request specified a G Suite domain:
    // const domain = payload['hd'];
    const { email, given_name, family_name} = payload;
    res.locals.username = email;
    res.locals.firstname = given_name;
    res.locals.lastname = family_name;
    res.locals.oAuth = true;
    return next();
  }
  verify().catch(console.error);
};

module.exports = oAuthController;
