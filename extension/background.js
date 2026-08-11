const SETTINGS_URL =
    "https://focusblocker.netlify.app/.netlify/functions/settings";

const DEFAULT_SETTINGS = {
    enabled: true,
    youtubeShorts: true,
    tiktok: true
};


async function updateSettings() {

    try {

        const response =
            await fetch(SETTINGS_URL);

        if (!response.ok) {

            throw new Error(
                "Unable to download settings"
            );

        }

        const settings =
            await response.json();

        await chrome.storage.local.set({
            focusblocker: settings
        });

        console.log(
            "FocusBlocker settings updated:",
            settings
        );

    } catch (error) {

        console.error(
            "FocusBlocker settings error:",
            error
        );

        await chrome.storage.local.set({
            focusblocker:
                DEFAULT_SETTINGS
        });

    }

}


// Install
chrome.runtime.onInstalled.addListener(
    updateSettings
);


// Browser startup
chrome.runtime.onStartup.addListener(
    updateSettings
);


// Refresh every 60 seconds
chrome.alarms.create(
    "refreshSettings",
    {
        periodInMinutes: 1
    }
);


chrome.alarms.onAlarm.addListener(
    (alarm) => {

        if (
            alarm.name ===
            "refreshSettings"
        ) {

            updateSettings();

        }

    }
);