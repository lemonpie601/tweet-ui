import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient.js";

// username을 "가짜 이메일"로 변환해서 아이디+비번처럼 보이게
function toEmail(username) {
  const u = username.trim().toLowerCase().replace(/[^a-z0-9_]/g, "");
  return `${u}@example.com`;
}

export default function AuthGate({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const disabled = username.trim().length < 2 || password.length < 4;

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session ?? null);
      setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, sess) => {
      setSession(sess ?? null);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  async function signInOrSignUp() {
    const email = toEmail(username);

    // 먼저 로그인 시도
    const signIn = await supabase.auth.signInWithPassword({ email, password });
    if (!signIn.error) return;

    // 없으면 회원가입(친구들 자동가입 허용 버전)
    const signUp = await supabase.auth.signUp({ email, password });
    if (signUp.error) alert(signUp.error.message);
  }

  async function signOut() {
    await supabase.auth.signOut();
  }

  if (loading) return <div className="card" style={{ padding: 16 }}>Loading…</div>;

  if (!session) {
    return (
      <div className="card" style={{ padding: 16 }}>
        <div style={{ fontWeight: 800, marginBottom: 8 }}>Login</div>
        <div style={{ color: "var(--muted)", fontSize: 13, marginBottom: 12 }}>
          친구들은 아이디+비번으로 로그인 (내부적으로는 이메일처럼 처리)
        </div>

        <div style={{ display: "grid", gap: 10 }}>
          <input
            placeholder="아이디"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              background: "#0f0f0f",
              border: "1px solid var(--line)",
              borderRadius: 12,
              padding: "10px 12px",
              outline: "none"
            }}
          />
          <input
            placeholder="비밀번호"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              background: "#0f0f0f",
              border: "1px solid var(--line)",
              borderRadius: 12,
              padding: "10px 12px",
              outline: "none"
            }}
          />
          <button className="postBtn" disabled={disabled} onClick={signInOrSignUp}>
            Login / Sign up
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 10 }}>
        <button className="actionBtn" onClick={signOut}>Logout</button>
      </div>
      {children}
    </div>
  );
}
