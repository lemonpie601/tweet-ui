import { supabase } from "./supabaseClient.js";

function functionsUrl() {
  // 예: https://xxxx.supabase.co/functions/v1/ai
  return `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai`;
}

export async function aiReplyDraft(contextText) {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  if (!token) throw new Error("Not logged in");

  const res = await fetch(functionsUrl(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ mode: "reply", text: contextText }),
  });

  const json = await res.json();
  if (!res.ok) throw new Error(json?.error || "AI error");
  return json.text || "";
}
