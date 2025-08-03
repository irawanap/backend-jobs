const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ success: false, message: "Access denied. No token provided." });
    }

    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ success: false, message: "Invalid token." });
    }
};

const protect = (req, res, next) => {
  let token

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1]

      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      req.user = { id: decoded.id, email: decoded.email }

      next()
    } catch (error) {
      console.error("Auth middleware error:", error)
      res.status(401).json({ success: false, message: "Not authorized, token failed." })
    }
  }

  if (!token) {
    res.status(401).json({ success: false, message: "Not authorized, no token." })
  }
}

module.exports = { authenticate, protect };
