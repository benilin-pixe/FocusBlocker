const YOUTUBE_HOSTS = [
    "youtube.com",
    "www.youtube.com",
    "m.youtube.com"
];

const TIKTOK_HOSTS = [
    "tiktok.com",
    "www.tiktok.com",
    "m.tiktok.com"
];


chrome.runtime.onInstalled.addListener(() => {

    chrome.storage.local.set({

        youtubeBlocked: true,

        tiktokBlocked: true,

        blockedCount: 0,

        focusMinutes: 0

    });

});


function isYouTubeShorts(url) {

    try {

        const parsed =
            new URL(url);

        const hostname =
            parsed.hostname.toLowerCase();

        return (
            YOUTUBE_HOSTS.includes(hostname)
            &&
            parsed.pathname.startsWith("/shorts")
        );

    } catch {

        return false;

    }

}


function isTikTok(url) {

    try {

        const parsed =
            new URL(url);

        const hostname =
            parsed.hostname.toLowerCase();

        return TIKTOK_HOSTS.some(
            host =>
                hostname === host ||
                hostname.endsWith("." + host)
        );

    } catch {

        return false;

    }

}


async function checkBlockedSite(
    details
) {

    if (
        !details.url ||
        !details.url.startsWith("http")
    ) {
        return;
    }


    const settings =
        await chrome.storage.local.get([
            "youtubeBlocked",
            "tiktokBlocked"
        ]);


    let blocked = false;


    if (
        settings.youtubeBlocked !== false
        &&
        isYouTubeShorts(details.url)
    ) {

        blocked = true;

    }


    if (
        settings.tiktokBlocked !== false
        &&
        isTikTok(details.url)
    ) {

        blocked = true;

    }


    if (!blocked) {
        return;
    }


    await chrome.storage.local.set({
        blockedCount:
            await getBlockedCount()
    });


    const blockerURL =
        chrome.runtime.getURL(
            "blocker.html"
        )
        +
        "?url=" +
        encodeURIComponent(
            details.url
        );


    chrome.tabs.update(
        details.tabId,
        {
            url: blockerURL
        }
    );

}


async function getBlockedCount() {

    const data =
        await chrome.storage.local.get(
            "blockedCount"
        );

    return (data.blockedCount || 0) + 1;

}


chrome.webNavigation.onCommitted.addListener(
    checkBlockedSite
);
