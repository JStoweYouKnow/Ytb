const admin = require('firebase-admin');

// On Cloud Run, default credentials are auto-provided by the service account.
// Locally, set GOOGLE_APPLICATION_CREDENTIALS env var to a service account key JSON file.
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.applicationDefault(),
    });
}

const db = admin.firestore();

const CONVERSATIONS_COL = 'conversations';
const PROFILES_COL = 'profiles';
const RATE_LIMIT_COL = 'rate_limits';
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 20;

/**
 * Append a transcript entry to a conversation session.
 */
async function saveTranscript(sessionId, entry) {
    const docRef = db.collection(CONVERSATIONS_COL).doc(sessionId);
    const doc = await docRef.get();

    if (doc.exists) {
        await docRef.update({
            messages: admin.firestore.FieldValue.arrayUnion(entry),
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        });
    } else {
        await docRef.set({
            messages: [entry],
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        });
    }
}

/**
 * Fetch all transcripts for a session.
 */
async function getTranscripts(sessionId) {
    const doc = await db.collection(CONVERSATIONS_COL).doc(sessionId).get();
    if (!doc.exists) return [];
    return doc.data().messages || [];
}

/**
 * Save or update a user profile (merge mode).
 */
async function saveUserProfile(userId, profile) {
    await db.collection(PROFILES_COL).doc(userId).set(
        { ...profile, updatedAt: admin.firestore.FieldValue.serverTimestamp() },
        { merge: true }
    );
}

/**
 * Get a user profile.
 */
async function getUserProfile(userId) {
    const doc = await db.collection(PROFILES_COL).doc(userId).get();
    if (!doc.exists) return null;
    return doc.data();
}

/**
 * Check if an IP has exceeded the rate limit (sliding window in Firestore).
 */
async function checkRateLimit(ip) {
    const now = Date.now();
    // Sanitize IP for use as a document ID
    const safeIp = ip.replace(/[.#$/[\]]/g, '_');
    const docRef = db.collection(RATE_LIMIT_COL).doc(safeIp);

    try {
        const doc = await docRef.get();
        if (doc.exists) {
            const data = doc.data();
            if (now - data.windowStart > RATE_LIMIT_WINDOW_MS) {
                // Window expired, reset
                await docRef.set({ windowStart: now, count: 1 });
                return false;
            } else {
                if (data.count >= RATE_LIMIT_MAX_REQUESTS) {
                    return true; // Rate limited
                } else {
                    await docRef.update({ count: admin.firestore.FieldValue.increment(1) });
                    return false;
                }
            }
        } else {
            // First time seeing this IP
            await docRef.set({ windowStart: now, count: 1 });
            return false;
        }
    } catch (err) {
        // Fail open to not block legitimate users if DB lags
        console.error('Firestore rate limit error (failing open):', err);
        return false;
    }
}

// ── Mood Tracking ──

const MOODS_COL = 'mood_entries';

async function saveMoodEntry(userId, entry) {
    const docRef = db.collection(MOODS_COL).doc(userId);
    const doc = await docRef.get();
    const moodEntry = {
        mood: entry.mood,
        note: entry.note || '',
        timestamp: entry.timestamp || new Date().toISOString(),
        source: entry.source || 'user',
    };
    if (doc.exists) {
        await docRef.update({
            entries: admin.firestore.FieldValue.arrayUnion(moodEntry),
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        });
    } else {
        await docRef.set({
            entries: [moodEntry],
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        });
    }
}

async function getMoodHistory(userId, limit = 30) {
    const doc = await db.collection(MOODS_COL).doc(userId).get();
    if (!doc.exists) return [];
    const entries = doc.data().entries || [];
    return entries.slice(-limit);
}

// ── Wellness Plans ──

const PLANS_COL = 'wellness_plans';

async function saveWellnessPlan(userId, plan) {
    await db.collection(PLANS_COL).doc(userId).set(
        { activePlan: plan, updatedAt: admin.firestore.FieldValue.serverTimestamp() },
        { merge: true }
    );
}

async function getWellnessPlan(userId) {
    const doc = await db.collection(PLANS_COL).doc(userId).get();
    if (!doc.exists) return null;
    return doc.data().activePlan || null;
}

// ── Emotion Timeline (Vision) ──

const EMOTIONS_COL = 'emotion_timeline';

async function saveEmotionFrame(sessionId, entry) {
    const docRef = db.collection(EMOTIONS_COL).doc(sessionId);
    const doc = await docRef.get();
    const frame = {
        emotion: entry.emotion,
        confidence: entry.confidence || 'medium',
        timestamp: entry.timestamp || new Date().toISOString(),
    };
    if (doc.exists) {
        await docRef.update({
            frames: admin.firestore.FieldValue.arrayUnion(frame),
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        });
    } else {
        await docRef.set({
            frames: [frame],
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        });
    }
}

async function getEmotionTimeline(sessionId) {
    const doc = await db.collection(EMOTIONS_COL).doc(sessionId).get();
    if (!doc.exists) return [];
    return doc.data().frames || [];
}

// ── Session Summaries ──

const SUMMARIES_COL = 'session_summaries';

async function saveSessionSummary(userId, summary) {
    const docRef = db.collection(SUMMARIES_COL).doc(userId);
    const doc = await docRef.get();
    const entry = {
        sessionId: summary.sessionId,
        summary: summary.summary,
        moodStart: summary.moodStart || null,
        moodEnd: summary.moodEnd || null,
        topicsDiscussed: summary.topicsDiscussed || [],
        toolsUsed: summary.toolsUsed || [],
        timestamp: summary.timestamp || new Date().toISOString(),
    };
    if (doc.exists) {
        await docRef.update({
            summaries: admin.firestore.FieldValue.arrayUnion(entry),
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        });
    } else {
        await docRef.set({
            summaries: [entry],
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        });
    }
}

async function getSessionSummaries(userId, limit = 10) {
    const doc = await db.collection(SUMMARIES_COL).doc(userId).get();
    if (!doc.exists) return [];
    const summaries = doc.data().summaries || [];
    return summaries.slice(-limit);
}

// ── Scheduled Check-ins ──

const CHECKINS_COL = 'check_ins';

async function saveCheckIn(userId, checkIn) {
    const docRef = db.collection(CHECKINS_COL).doc(userId);
    const doc = await docRef.get();
    const entry = {
        id: checkIn.id || `ci_${Date.now()}`,
        scheduledFor: checkIn.scheduledFor,
        reason: checkIn.reason || '',
        status: 'pending',
        createdAt: new Date().toISOString(),
    };
    if (doc.exists) {
        await docRef.update({
            checkIns: admin.firestore.FieldValue.arrayUnion(entry),
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        });
    } else {
        await docRef.set({
            checkIns: [entry],
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        });
    }
    return entry;
}

async function getCheckIns(userId) {
    const doc = await db.collection(CHECKINS_COL).doc(userId).get();
    if (!doc.exists) return [];
    return doc.data().checkIns || [];
}

module.exports = {
    saveTranscript,
    getTranscripts,
    saveUserProfile,
    getUserProfile,
    checkRateLimit,
    saveMoodEntry,
    getMoodHistory,
    saveWellnessPlan,
    getWellnessPlan,
    saveEmotionFrame,
    getEmotionTimeline,
    saveSessionSummary,
    getSessionSummaries,
    saveCheckIn,
    getCheckIns,
    db,
};
