function json(statusCode, data) {
    return {
        statusCode,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "https://focusblocker.netlify.app",
            "Access-Control-Allow-Credentials": "true",
            "Cache-Control": "no-store"
        },
        body: JSON.stringify(data)
    };
}

const defaultSettings = {
    enabled: true,
    youtubeShorts: true,
    tiktok: true
};

exports.handler = async (event) => {

    if (event.httpMethod === "OPTIONS") {
        return json(200, {});
    }

    if (event.httpMethod === "GET") {
        return json(200, defaultSettings);
    }

    if (event.httpMethod === "POST") {

        try {

            const username =
                event.headers["x-admin-username"];

            if (
                username !==
                process.env.ADMIN_USERNAME
            ) {
                return json(401, {
                    success: false,
                    message: "Unauthorized"
                });
            }

            const settings =
                JSON.parse(event.body || "{}");

            return json(200, {
                success: true,
                settings: {
                    enabled:
                        Boolean(settings.enabled),

                    youtubeShorts:
                        Boolean(settings.youtubeShorts),

                    tiktok:
                        Boolean(settings.tiktok)
                }
            });

        } catch (error) {

            return json(400, {
                success: false,
                message: "Invalid settings"
            });
        }
    }

    return json(405, {
        success: false,
        message: "Method not allowed"
    });
};