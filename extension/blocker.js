(async () => {

    const DEFAULT_SETTINGS = {
        enabled: true,
        youtubeShorts: true,
        tiktok: true
    };

    const result = await chrome.storage.local.get(
        "focusblocker"
    );

    const settings =
        result.focusblocker ||
        DEFAULT_SETTINGS;

    if (!settings.enabled) {
        return;
    }

    const hostname =
        window.location.hostname;

    const pathname =
        window.location.pathname;


    // ==========================
    // YOUTUBE SHORTS
    // ==========================

    const isYouTube =
        hostname === "youtube.com" ||
        hostname === "www.youtube.com";

    if (
        settings.youtubeShorts &&
        isYouTube &&
        (
            pathname.startsWith("/shorts") ||
            pathname.startsWith("/shorts/")
        )
    ) {

        blockPage("YouTube Shorts");

        return;
    }


    // ==========================
    // TIKTOK
    // ==========================

    const isTikTok =
        hostname === "tiktok.com" ||
        hostname === "www.tiktok.com";

    if (
        settings.tiktok &&
        isTikTok
    ) {

        blockPage("TikTok");

        return;
    }


    // ==========================
    // BLOCK PAGE
    // ==========================

    function blockPage(service) {

        document.documentElement.innerHTML = `
        <html>

        <head>

            <title>
                FocusBlocker
            </title>

            <style>

                * {
                    box-sizing: border-box;
                }

                body {
                    margin: 0;
                    min-height: 100vh;

                    display: flex;
                    align-items: center;
                    justify-content: center;

                    font-family:
                        Arial,
                        sans-serif;

                    background:
                        linear-gradient(
                            135deg,
                            #020617,
                            #0f172a,
                            #172554
                        );

                    color: white;

                    text-align: center;
                }

                .container {
                    width: 90%;
                    max-width: 600px;
                    padding: 50px;
                }

                .shield {
                    font-size: 80px;
                    margin-bottom: 20px;
                }

                h1 {
                    font-size: 42px;
                    margin: 10px 0;
                }

                h2 {
                    font-size: 25px;
                    color: #38bdf8;
                    margin: 10px 0 20px;
                }

                p {
                    color: #cbd5e1;
                    font-size: 18px;
                    line-height: 1.7;
                }

                .message {
                    margin-top: 30px;
                    padding: 20px;
                    border-radius: 15px;

                    background:
                        rgba(
                            255,
                            255,
                            255,
                            0.05
                        );
                }

                .brand {
                    margin-top: 35px;
                    font-weight: bold;
                    color: #38bdf8;
                }

            </style>

        </head>

        <body>

            <div class="container">

                <div class="shield">
                    🛡️
                </div>

                <h1>
                    FocusBlocker
                </h1>

                <h2>
                    ${service} Blocked
                </h2>

                <div class="message">

                    <p>
                        This website is currently
                        blocked by the administrator.
                    </p>

                    <p>
                        Stay focused.
                        Get your important work done.
                    </p>

                </div>

                <div class="brand">
                    FocusBlocker
                </div>

            </div>

        </body>

        </html>
        `;
    }

})();