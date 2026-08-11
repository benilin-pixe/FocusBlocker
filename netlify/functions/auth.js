const crypto = require("crypto");
const { getStore } = require("@netlify/blobs");

const store = getStore("focusblocker-auth");

function createToken() {
    return crypto
        .randomBytes(32)
        .toString("hex");
}

async function createSession() {

    const token = createToken();

    await store.setJSON(
        `session:${token}`,
        {
            admin: true,
            createdAt: Date.now()
        }
    );

    return token;
}

async function verifySession(event) {

    const cookies =
        event.headers.cookie ||
        event.headers.Cookie ||
        "";

    const match =
        cookies.match(
            /focusblocker_session=([^;]+)/
        );

    if (!match) {
        return false;
    }

    const token = match[1];

    const session =
        await store.get(
            `session:${token}`,
            {
                type: "json"
            }
        );

    if (!session) {
        return false;
    }

    // Session expires after one hour
    if (
        Date.now() -
        session.createdAt >
        60 * 60 * 1000
    ) {
        return false;
    }

    return true;
}

module.exports = {
    createSession,
    verifySession
};