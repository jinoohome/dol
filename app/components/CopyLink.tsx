"use client";

export default function CopyLink() {
  async function copy() {
    try {
      await navigator.clipboard.writeText(location.href);
      alert("링크가 복사되었습니다");
    } catch {
      // no-op
    }
  }
  return (
    <button className="btn btn-outline" onClick={copy} aria-label="링크 복사">
      링크 복사
    </button>
  );
} 