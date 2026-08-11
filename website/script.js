cat > website/script.js <<'EOF'
const API = "/.netlify/functions";

const loginScreen =
    document.getElementById("loginScreen");

const dashboard =
    document.getElementById("dashboard");

const loginForm =
    document.getElementById("loginForm");

const loginMessage =
    document.getElementById("loginMessage");

const usernameInput =
    document.getElementById("username");

const passwordInput =
    document.getElementById("password");

const enabled =
    document.getElementById("enabled");

const youtubeShorts =
    document.getElementById("youtubeShorts");

const tiktok =
    document.getElementById("tiktok");

const saveButton =
    document.getElementById("saveButton");

const status =
    document.getElementById("status");

const logoutButton =
    document.getElementById("logoutButton");


loginForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();

        loginMessage.textContent =
            "Logging in...";

        const username =
            usernameInput.value.trim();

        const password =
            passwordInput.value;

        try {

            const response =
                await fetch(
                    `${API}/login`,
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        credentials: "include",

                        body: JSON.stringify({
                            username: username,
                            password: password
                        })
                    }
                );

            const data =
                await response.json();

            if (!response.ok) {

                loginMessage.textContent =
                    data.message ||
                    "Login failed.";

                return;
            }

            loginScreen.classList.add(
                "hidden"
            );

            dashboard.classList.remove(
                "hidden"
            );

            loginMessage.textContent = "";

            await loadSettings();

        } catch (error) {

            console.error(error);

            loginMessage.textContent =
                "Unable to connect to server.";
        }
    }
);


async function loadSettings() {

    status.textContent =
        "Loading settings...";

    try {

        const response =
            await fetch(
                `${API}/settings`,
                {
                    method: "GET",

                    credentials: "include"
                }
            );

        if (!response.ok) {

            throw new Error(
                "Settings request failed: " +
                response.status
            );
        }

        const data =
            await response.json();

        enabled.checked =
            data.enabled === true;

        youtubeShorts.checked =
            data.youtubeShorts === true;

        tiktok.checked =
            data.tiktok === true;

        status.textContent =
            "Settings loaded.";

    } catch (error) {

        console.error(error);

        status.textContent =
            "Failed to load settings.";
    }
}


saveButton.addEventListener(
    "click",
    async function () {

        status.textContent =
            "Saving...";

        const settings = {

            enabled:
                enabled.checked,

            youtubeShorts:
                youtubeShorts.checked,

            tiktok:
                tiktok.checked
        };

        try {

            const response =
                await fetch(
                    `${API}/settings`,
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json",

                            "X-Admin-Username":
                                usernameInput.value.trim()
                        },

                        credentials: "include",

                        body:
                            JSON.stringify(settings)
                    }
                );

            const data =
                await response.json();

            if (!response.ok) {

                status.textContent =
                    data.message ||
                    "Save failed.";

                return;
            }

            status.textContent =
                "Settings saved successfully.";

        } catch (error) {

            console.error(error);

            status.textContent =
                "Failed to save settings.";
        }
    }
);


logoutButton.addEventListener(
    "click",
    function () {

        dashboard.classList.add(
            "hidden"
        );

        loginScreen.classList.remove(
            "hidden"
        );

        passwordInput.value = "";

        status.textContent = "";

        loginMessage.textContent = "";
    }
);
EOF