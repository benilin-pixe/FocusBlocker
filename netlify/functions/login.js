exports.handler = async function (event) {

    const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "https://focusblocker.netlify.app",
        "Access-Control-Allow-Credentials": "true",
        "Cache-Control": "no-store"
    };

    if (event.httpMethod === "OPTIONS") {
        return {
            statusCode: 200,
            headers: headers,
            body: ""
        };
    }

    if (event.httpMethod !== "POST") {
        return {
            statusCode: 405,
            headers: headers,
            body: JSON.stringify({
                message: "Method not allowed"
            })
        };
    }

    try {

        const body = JSON.parse(
            event.body || "{}"
        );

        const username =
            body.username || "";

        const password =
            body.password || "";

        const adminUsername =
            process.env.ADMIN_USERNAME;

        const adminPassword =
            process.env.ADMIN_PASSWORD;

        if (
            username !== adminUsername ||
            password !== adminPassword
        ) {
            return {
                statusCode: 401,
                headers: headers,
                body: JSON.stringify({
                    message: "Invalid username or password"
                })
            };
        }

        return {
            statusCode: 200,
            headers: headers,
            body: JSON.stringify({
                success: true,
                message: "Login successful"
            })
        };

    } catch (error) {

        console.error(error);

        return {
            statusCode: 400,
            headers: headers,
            body: JSON.stringify({
                message: "Invalid request"
            })
        };
    }
};