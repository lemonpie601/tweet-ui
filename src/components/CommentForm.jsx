import { useMemo, useState } from "react";
import { aiReplyDraft } from "../lib/ai.js";

export default function CommentForm({ onCreate, contextText }) {
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);

  const remaining = useMemo(() => 200 - text.length, [text.length]);
  const disabled = text.trim().length === 0 || remaining < 0 || busy;

  async function aiDraft() {
    try {
      setBusy(true);
      const draft = await aiReplyDraft(
        `원글:\n${contextText}\n\n이 원글에 달 짧은 댓글 초안을 써줘.`
      );
      setText(draft);
    } catch (e) {
      alert(e.message || String(e));
    } finally {
      setBusy(false);
    }
  }

  function submit() {
    if (disabled) return;
    onCreate?.(text.trim());
    setText("");
  }

  return (
    <div className="composer" style={{ borderBottom: "1px solid var(--line)" }}>
      <div className="composerRow">
        <div className="avatar" />
        <div>
          <textarea
            className="textarea"
            placeholder="댓글을 남겨보세요…"
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxLength={200}
          />

          <div className="composerActions">
            <div className="hint">
              {remaining >= 0 ? `${remaining}자 남음` : `초과: ${-remaining}자`}
            </div>

            <div style={{ display: "flex", gap: 8 }}>
              <button className="actionBtn" type="button" onClick={aiDraft} disabled={busy}>
                🤖 Draft
              </button>
              <button className="postBtn" disabled={disabled} onClick={submit}>
                Reply
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
