exports.handler = async function (event) {

    if (event.httpMethod !== "POST") {

        return {
            statusCode: 405,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                success: false,
                message: "Method not allowed"
            })
        };

    }

    try {

        const data =
            JSON.parse(event.body || "{}");


        const username =
            data.username || "";

        const password =
            data.password || "";


        const ADMIN_USERNAME =
            process.env.ADMIN_USERNAME;

        const ADMIN_PASSWORD =
            process.env.ADMIN_PASSWORD;


        if (
            username === ADMIN_USERNAME &&
            password === ADMIN_PASSWORD
        ) {

            return {

                statusCode: 200,

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    success: true
                })

            };

        }


        return {

            statusCode: 401,

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                success: false,
                message: "Invalid username or password"
            })

        };

    } catch (error) {

        return {

            statusCode: 400,

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                success: false,
                message: "Invalid request"
            })

        };

    }

};