import axios from 'axios';
import e from 'express';

const verifyTokenWithCookies = async (req, res, next) => {
    try {
        // 1. Get cookies from the incoming request
        const cookies = req.cookies;
        console.log("Cookies from incoming request:", cookies);

        // 2. Forward cookies in the axios request headers 
        const response = await axios.post(process.env.SERVICE_AUTH_URL, null, {
            headers: {
                Cookie: req.headers.cookie // Forward the raw cookie header
            },
            withCredentials: true
        });
        console.log("Response from authentication service", response.data);
        if (response.data.EC === 0) {
            // Store user info from auth service if needed
            req.user = response.data.DT;
            console.log("Authentication success");
            return next();
        } else {
            console.log("Authentication failed");
            return res.status(403).json({
                EC: 1,
                EM: "Authentication failed",
                DT: null
            });
        }

    } catch (error) {
        console.error("Auth error details:", error.response?.data || error.message);
        return res.status(403).json({
            EC: -1,
            EM: "Error from authentication service",
            DT: null
        });
    }
};

export { verifyTokenWithCookies };
