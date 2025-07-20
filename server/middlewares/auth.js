import jwt from 'jsonwebtoken';

// user authentication middleware
const authUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.json({ success: false, message: "Not Authorized Login Again" });
    }

    const token = authHeader.split(" ")[1]; // extract the token only
    const token_decode = jwt.verify(token, process.env.JWT_SECRET); // verify token

    if (token_decode.id) {
      req.body.userId = token_decode.id; // put userId in request body
      next(); // move to next function
    } else {
      return res.json({ success: false, message: "Not Authorized Login Again" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default authUser;
