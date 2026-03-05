export function getRoute() {
  const h = window.location.hash || "#/";
  // 예: #/post/UUID
  const m = h.match(/^#\/post\/(.+)$/);
  if (m) return { name: "post", id: m[1] };
  return { name: "home" };
}

export function goHome() {
  window.location.hash = "#/";
}

export function goPost(id) {
  window.location.hash = `#/post/${id}`;
}
