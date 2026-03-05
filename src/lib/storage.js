const KEY = "tweet_ui_posts_v1";

export function loadPosts(fallback = []) {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return fallback;
    return parsed;
  } catch {
    return fallback;
  }
}

export function savePosts(posts) {
  localStorage.setItem(KEY, JSON.stringify(posts));
}

export function makePost({ body }) {
  const now = Date.now();
  return {
    id: `p_${now}_${Math.random().toString(16).slice(2)}`,
    name: "Sida",
    handle: "@sida",
    time: "방금",
    createdAt: now,
    body,
    stats: { replies: 0, reposts: 0, likes: 0 }
  };
}

export function formatTime(createdAt) {
  const diff = Date.now() - createdAt;
  const m = Math.floor(diff / 60000);
  if (m < 1) return "방금";
  if (m < 60) return `${m}분 전`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}시간 전`;
  const d = Math.floor(h / 24);
  return `${d}일 전`;
}
