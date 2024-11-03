import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
    const token = req.cookies.accessToken;
    // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MTAzMDE3ZmI0Y2E4M2E5YTQ0NGJhZSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzI5ODMwOTAyLCJleHAiOjE3MzExMjY5MDJ9.IBQI-eTJ0k0ftAGQsRujoumu1YfdfGFPv7erJRomKoM"

    if (!token) {
        return res.status(401).json({ success: false, message: "You're not authorized" });
    }

    // If token exists, then verify the token 
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(401).json({ success: false, message: "Token is invalid" });
        }
        req.user = user;
        next(); 
    });
};

export const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
        console.log("User Object:", req.user);
        console.log("Request Params ID:", req.params.id);
        // Check if the user is authorized based on user ID or role
        if (req.user.id === req.params.id || req.user.role === "admin") {
            next();
        } else {
            return res.status(401).json({ success: false, message: "You're not authenticated" });
        }
    });
};


export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res,next, () => {
        if (req.user.role === "admin") {
            next(); 
        } else {
            return res.status(401).json({ success: false, message: "You're not authorize" });
        }
    });
};