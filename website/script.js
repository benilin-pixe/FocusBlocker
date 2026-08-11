/* ==========================================
   FOCUSBLOCKER
   Main Website JavaScript
   ========================================== */


/* ==========================================
   DATA
   ========================================== */

let state = {

    youtubeBlocked: true,

    tiktokBlocked: true,

    blockedCount: 0,

    focusSeconds: 0,

    focusRunning: false,

    goal: 120,

    streak: 1

};


/* ==========================================
   LOAD SAVED DATA
   ========================================== */

const saved =
    JSON.parse(
        localStorage.getItem(
            "focusBlocker"
        )
    );


if (saved) {

    state = {
        ...state,
        ...saved
    };

}


/* ==========================================
   ELEMENTS
   ========================================== */

const timer =
    document.getElementById("timer");

const startFocus =
    document.getElementById("startFocus");

const blockedCount =
    document.getElementById("blockedCount");

const focusMinutes =
    document.getElementById("focusMinutes");

const streak =
    document.getElementById("streak");

const youtubeToggle =
    document.getElementById("youtubeToggle");

const tiktokToggle =
    document.getElementById("tiktokToggle");

const youtubeToggleLarge =
    document.getElementById(
        "youtubeToggleLarge"
    );

const tiktokToggleLarge =
    document.getElementById(
        "tiktokToggleLarge"
    );

const youtubeStatus =
    document.getElementById(
        "youtubeStatus"
    );

const tiktokStatus =
    document.getElementById(
        "tiktokStatus"
    );

const goalInput =
    document.getElementById("goalInput");

const goalProgress =
    document.getElementById("goalProgress");

const goalBar =
    document.getElementById("goalBar");

const achievementBar =
    document.getElementById(
        "achievementBar"
    );

const achievementText =
    document.getElementById(
        "achievementText"
    );

const masterToggle =
    document.getElementById(
        "masterToggle"
    );

const resetStats =
    document.getElementById(
        "resetStats"
    );

const themeButton =
    document.getElementById(
        "themeButton"
    );

const addSite =
    document.getElementById(
        "addSite"
    );


/* ==========================================
   SAVE
   ========================================== */

function saveState() {

    localStorage.setItem(
        "focusBlocker",
        JSON.stringify(state)
    );

}


/* ==========================================
   UPDATE UI
   ========================================== */

function updateUI() {

    youtubeToggle.checked =
        state.youtubeBlocked;

    tiktokToggle.checked =
        state.tiktokBlocked;

    youtubeToggleLarge.checked =
        state.youtubeBlocked;

    tiktokToggleLarge.checked =
        state.tiktokBlocked;

    blockedCount.textContent =
        state.blockedCount;

    focusMinutes.textContent =
        Math.floor(
            state.focusSeconds / 60
        );

    streak.textContent =
        state.streak;

    goalInput.value =
        state.goal;

    masterToggle.checked =
        state.youtubeBlocked ||
        state.tiktokBlocked;


    updateTimer();

    updateWebsiteStatus();

    updateGoal();

}


/* ==========================================
   TIMER
   ========================================== */

let timerInterval = null;


function updateTimer() {

    const hours =
        Math.floor(
            state.focusSeconds / 3600
        );

    const minutes =
        Math.floor(
            (state.focusSeconds % 3600) / 60
        );

    const seconds =
        state.focusSeconds % 60;


    timer.textContent =
        String(hours).padStart(2, "0")
        + ":"
        + String(minutes).padStart(2, "0")
        + ":"
        + String(seconds).padStart(2, "0");
}


function startTimer() {

    if (state.focusRunning) {
        return;
    }


    state.focusRunning = true;

    startFocus.textContent =
        "■ Stop Focus Session";


    timerInterval =
        setInterval(() => {

            state.focusSeconds++;

            updateTimer();

            updateGoal();

            if (
                state.focusSeconds % 60 === 0
            ) {

                saveState();

                focusMinutes.textContent =
                    Math.floor(
                        state.focusSeconds / 60
                    );
            }

        }, 1000);


    saveState();

}


function stopTimer() {

    state.focusRunning = false;

    clearInterval(timerInterval);

    startFocus.textContent =
        "▶ Start Focus Session";

    saveState();

}


startFocus.addEventListener(
    "click",
    () => {

        if (state.focusRunning) {

            stopTimer();

        } else {

            startTimer();

        }

    }
);


/* ==========================================
   BLOCKER STATUS
   ========================================== */

function updateWebsiteStatus() {

    if (state.youtubeBlocked) {

        youtubeStatus.textContent =
            "● Blocking active";

        youtubeStatus.className =
            "enabled";

    } else {

        youtubeStatus.textContent =
            "● Blocking disabled";

        youtubeStatus.className =
            "disabled";

    }


    if (state.tiktokBlocked) {

        tiktokStatus.textContent =
            "● Blocking active";

        tiktokStatus.className =
            "enabled";

    } else {

        tiktokStatus.textContent =
            "● Blocking disabled";

        tiktokStatus.className =
            "disabled";

    }

}


/* ==========================================
   YOUTUBE
   ========================================== */

function setYoutube(value) {

    state.youtubeBlocked =
        value;

    youtubeToggle.checked =
        value;

    youtubeToggleLarge.checked =
        value;

    updateWebsiteStatus();

    saveState();

}


youtubeToggle.addEventListener(
    "change",
    () => {

        setYoutube(
            youtubeToggle.checked
        );

    }
);


youtubeToggleLarge.addEventListener(
    "change",
    () => {

        setYoutube(
            youtubeToggleLarge.checked
        );

    }
);


/* ==========================================
   TIKTOK
   ========================================== */

function setTikTok(value) {

    state.tiktokBlocked =
        value;

    tiktokToggle.checked =
        value;

    tiktokToggleLarge.checked =
        value;

    updateWebsiteStatus();

    saveState();

}


tiktokToggle.addEventListener(
    "change",
    () => {

        setTikTok(
            tiktokToggle.checked
        );

    }
);


tiktokToggleLarge.addEventListener(
    "change",
    () => {

        setTikTok(
            tiktokToggleLarge.checked
        );

    }
);


/* ==========================================
   MASTER SWITCH
   ========================================== */

masterToggle.addEventListener(
    "change",
    () => {

        const value =
            masterToggle.checked;

        setYoutube(value);

        setTikTok(value);

    }
);


/* ==========================================
   GOAL
   ========================================== */

function updateGoal() {

    const minutes =
        Math.floor(
            state.focusSeconds / 60
        );


    const percentage =
        Math.min(
            100,
            (minutes / state.goal) * 100
        );


    goalProgress.textContent =
        minutes;


    goalBar.style.width =
        percentage + "%";


    achievementBar.style.width =
        percentage + "%";


    achievementText.textContent =
        Math.round(percentage) + "%";

}


goalInput.addEventListener(
    "change",
    () => {

        let value =
            parseInt(
                goalInput.value
            );


        if (
            isNaN(value) ||
            value < 10
        ) {

            value = 10;

        }


        if (value > 1440) {

            value = 1440;

        }


        state.goal =
            value;

        goalInput.value =
            value;

        updateGoal();

        saveState();

    }
);


/* ==========================================
   NAVIGATION
   ========================================== */

const navItems =
    document.querySelectorAll(
        ".nav-item"
    );

const sections =
    document.querySelectorAll(
        ".section"
    );


function showSection(
    sectionName
) {

    sections.forEach(
        section => {

            section.classList.remove(
                "active-section"
            );

        }
    );


    const target =
        document.getElementById(
            sectionName
        );


    if (target) {

        target.classList.add(
            "active-section"
        );

    }


    navItems.forEach(
        item => {

            item.classList.remove(
                "active"
            );


            if (
                item.dataset.section ===
                sectionName
            ) {

                item.classList.add(
                    "active"
                );

            }

        }
    );


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


navItems.forEach(
    item => {

        item.addEventListener(
            "click",
            () => {

                showSection(
                    item.dataset.section
                );

            }
        );

    }
);


/* Manage all */

document.querySelectorAll(
    "[data-section-link]"
).forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                showSection(
                    button.dataset.sectionLink
                );

            }
        );

    }
);


/* ==========================================
   ADD WEBSITE
   ========================================== */

addSite.addEventListener(
    "click",
    () => {

        const website =
            prompt(
                "Enter the website you want to block:"
            );


        if (!website) {
            return;
        }


        alert(
            website +
            " has been added to your personal block list."
        );

    }
);


/* ==========================================
   RESET STATISTICS
   ========================================== */

resetStats.addEventListener(
    "click",
    () => {

        const confirmed =
            confirm(
                "Reset today's statistics?"
            );


        if (!confirmed) {
            return;
        }


        state.blockedCount = 0;

        state.focusSeconds = 0;

        stopTimer();

        updateUI();

        saveState();

    }
);


/* ==========================================
   DARK / LIGHT MODE
   ========================================== */

themeButton.addEventListener(
    "click",
    () => {

        document.body.classList.toggle(
            "light"
        );


        if (
            document.body.classList.contains(
                "light"
            )
        ) {

            themeButton.textContent =
                "☀️";

            localStorage.setItem(
                "theme",
                "light"
            );

        } else {

            themeButton.textContent =
                "🌙";

            localStorage.setItem(
                "theme",
                "dark"
            );

        }

    }
);


/* ==========================================
   LOAD THEME
   ========================================== */

const savedTheme =
    localStorage.getItem(
        "theme"
    );


if (savedTheme === "light") {

    document.body.classList.add(
        "light"
    );

    themeButton.textContent =
        "☀️";

}


/* ==========================================
   INITIALIZE
   ========================================== */

updateUI();