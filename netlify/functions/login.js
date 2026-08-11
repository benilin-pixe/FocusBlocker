function response(statusCode, data) {
    return {
        statusCode,
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store"
        },
        body: JSON.stringify(data)
    };
}

exports.handler = async function (event) {

    if (event.httpMethod !== "POST") {
        return response(405, {
            success: false,
            message: "Method not allowed"
        });
    }

    try {

        const body =
            JSON.parse(event.body || "{}");

        if (
            body.username ===
                process.env.ADMIN_USERNAME &&
            body.password ===
                process.env.ADMIN_PASSWORD
        ) {

            return response(200, {
                success: true,
                message: "Login successful"
            });

        }

        return response(401, {
            success: false,
            message: "Invalid username or password"
        });

    } catch (error) {

        console.error(error);

        return response(400, {
            success: false,
            message: "Invalid request"
        });
    }
};