loginForm.addEventListener(
    "submit",
    async function(event) {

        event.preventDefault();


        const username =
            document.getElementById(
                "username"
            ).value.trim();


        const password =
            document.getElementById(
                "password"
            ).value;


        loginError.textContent =
            "Signing in...";


        try {

            const response =
                await fetch(
                    "/.netlify/functions/login",
                    {

                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify({

                            username: username,

                            password: password

                        })

                    }
                );


            const result =
                await response.json();


            if (result.success) {

                sessionStorage.setItem(
                    "focusAdmin",
                    "true"
                );


                showAdmin();


            } else {

                loginError.textContent =
                    "Incorrect username or password.";

            }


        } catch (error) {

            console.error(error);

            loginError.textContent =
                "Unable to connect to the server.";

        }

    }
);