import jwt from "jsonwebtoken";

export const checkAuth = (req, res, next) => {
  try {
    const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");

    if (!token) {
      return res.status(403).json({ message: "No access." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.id;
    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({
      message: "Failed to retrieve user data.",
    });
  }
};
