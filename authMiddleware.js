const authMiddleware = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.status === "inactive") {
            return res.status(403).json({
                message: "Account inactive",
                reason: user.inactiveReason || "No reason provided"
            });
        }

        req.user = user;
        next();
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = authMiddleware;