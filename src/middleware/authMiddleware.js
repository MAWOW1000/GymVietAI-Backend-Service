import axios from 'axios';

const verifyTokenWithCookies = async (req, res, next) => {
    try {
        // Forward cookies from client request
        const cookies = req.cookies;
        console.log("Cookies:", cookies);
        const response = await axios.post(process.env.SERVICE_AUTH_URL, null, {
            withCredentials: true
        });

        if (response.data.EC === 0) {
            // Store user info from auth service if needed
            req.user = response.data.DT;
            console.log("Authentication success");
            next();
        } else {
            return res.status(403).json({
                EC: 1,
                EM: "Authentication failed",
                DT: null
            });
        }

    } catch (error) {
        console.error("Auth error:", error);
        return res.status(403).json({
            EC: -1,
            EM: "Error from authentication service",
            DT: null
        });
    }
};

export { verifyTokenWithCookies };
