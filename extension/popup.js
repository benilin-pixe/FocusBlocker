const youtubeToggle =
    document.getElementById("youtubeToggle");

const tiktokToggle =
    document.getElementById("tiktokToggle");

const focusButton =
    document.getElementById("focusButton");

const timer =
    document.getElementById("timer");

const blockedCount =
    document.getElementById("blockedCount");

const focusMinutes =
    document.getElementById("focusMinutes");

const status =
    document.getElementById("status");


let seconds = 0;
let timerRunning = false;
let interval = null;


// LOAD SETTINGS

chrome.storage.local.get(
    [
        "youtubeBlocked",
        "tiktokBlocked",
        "blockedCount",
        "focusMinutes"
    ],

    function(data) {

        youtubeToggle.checked =
            data.youtubeBlocked !== false;

        tiktokToggle.checked =
            data.tiktokBlocked !== false;

        blockedCount.textContent =
            data.blockedCount || 0;

        focusMinutes.textContent =
            data.focusMinutes || 0;

        updateStatus();
    }
);


// YOUTUBE TOGGLE

youtubeToggle.addEventListener(
    "change",

    function() {

        chrome.storage.local.set({
            youtubeBlocked:
                youtubeToggle.checked
        });

        updateStatus();
    }
);


// TIKTOK TOGGLE

tiktokToggle.addEventListener(
    "change",

    function() {

        chrome.storage.local.set({
            tiktokBlocked:
                tiktokToggle.checked
        });

        updateStatus();
    }
);


// STATUS

function updateStatus() {

    if (
        youtubeToggle.checked ||
        tiktokToggle.checked
    ) {

        status.textContent = "ACTIVE";

        status.style.color = "#42e895";

    } else {

        status.textContent = "OFF";

        status.style.color = "#ff7777";
    }
}


// FOCUS TIMER

focusButton.addEventListener(
    "click",

    function() {

        if (timerRunning) {

            clearInterval(interval);

            timerRunning = false;

            focusButton.textContent =
                "Start Focus";

            return;
        }


        timerRunning = true;

        focusButton.textContent =
            "Stop Focus";


        interval = setInterval(
            function() {

                seconds++;

                updateTimer();

                if (seconds % 60 === 0) {

                    const minutes =
                        Math.floor(seconds / 60);

                    chrome.storage.local.set({
                        focusMinutes: minutes
                    });

                    focusMinutes.textContent =
                        minutes;
                }

            },

            1000
        );

    }
);


// TIMER DISPLAY

function updateTimer() {

    const hours =
        Math.floor(seconds / 3600);

    const minutes =
        Math.floor(
            (seconds % 3600) / 60
        );

    const secs =
        seconds % 60;


    timer.textContent =
        String(hours).padStart(2, "0")
        + ":" +
        String(minutes).padStart(2, "0")
        + ":" +
        String(secs).padStart(2, "0");
}
