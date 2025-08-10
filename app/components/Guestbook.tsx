"use client";

import { useEffect, useMemo, useState } from "react";
import type { GuestbookItem } from "@/app/types";

export default function Guestbook({ enabled }: { enabled?: boolean }) {
  const [items, setItems] = useState<GuestbookItem[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const isAdmin = useMemo(() => false, []);

  async function loadMore(next?: string | null) {
    setLoading(true);
    try {
      const res = await fetch(`/api/guestbook${next ? `?cursor=${encodeURIComponent(next)}` : ""}`);
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      const data = (await res.json()) as { items: GuestbookItem[]; nextCursor?: string };
      setItems((prev) => [...prev, ...data.items]);
      setCursor(data.nextCursor ?? null);
    } catch (error) {
      console.error('Failed to load guestbook:', error);
      alert('방명록을 불러오는데 실패했습니다');
    } finally {
      setLoading(false);
    }
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;
    if (message.trim().length < 10 || message.length > 300) return alert("메시지는 10~300자 사이로 입력해 주세요");
    
    setSubmitting(true);
    try {
      const res = await fetch("/api/guestbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name || undefined, message }),
      });
      if (res.ok) {
        setItems([]);
        setCursor(null);
        setMessage("");
        setName("");
        await loadMore(null);
        alert("메시지가 등록되었습니다!");
      } else {
        alert("등록에 실패했습니다");
      }
    } catch (error) {
      console.error('Failed to submit message:', error);
      alert("등록에 실패했습니다");
    } finally {
      setSubmitting(false);
    }
  }

  async function remove(id: string) {
    const pwd = prompt("관리자 비밀번호를 입력하세요");
    if (!pwd) return;
    const res = await fetch(`/api/guestbook/${id}`, { method: "DELETE", headers: { "x-admin-password": pwd } });
    if (res.ok) {
      setItems((prev) => prev.filter((i) => i.id !== id));
    } else {
      alert("삭제 실패");
    }
  }

  useEffect(() => {
    if (enabled) {
      loadMore(null);
    }
  }, [enabled]);

  if (!enabled) return null;

  return (
    <section className="section container">
      <SectionTitle>방명록</SectionTitle>
      
      <div className="card p-6 shadow-soft mb-6">
        <h3 className="text-lg font-semibold mb-4 text-center gradient-text">축하 메시지를 남겨주세요 ♡</h3>
        <form onSubmit={submit}>
          <div className="space-y-4">
            <input
              className="w-full rounded-xl border-2 border-brand/20 px-4 py-3 bg-white/80 backdrop-blur focus:border-brand focus:outline-none transition-colors"
              placeholder="이름 (선택사항)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={50}
            />
            <textarea
              className="w-full rounded-xl border-2 border-brand/20 px-4 py-3 bg-white/80 backdrop-blur focus:border-brand focus:outline-none transition-colors resize-none"
              rows={4}
              placeholder="따뜻한 축하 메시지를 남겨주세요 (10~300자)"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              maxLength={300}
              required
            />
            <button 
              className="btn btn-primary w-full py-4 text-base font-semibold" 
              disabled={submitting}
            >
              {submitting ? "💌 등록 중..." : "💌 메시지 남기기"}
            </button>
          </div>
        </form>
      </div>

      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={item.id} className="card p-6 shadow-soft" style={{ animationDelay: `${index * 0.1}s` }}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-brand to-point flex items-center justify-center text-white font-semibold text-sm">
                  {(item.name || "익명")[0]}
                </div>
                <span className="font-medium text-muted">{item.name || "익명"}</span>
              </div>
              {isAdmin ? (
                <button className="text-xs text-red-500 hover:text-red-700 transition-colors" onClick={() => remove(item.id)}>
                  삭제
                </button>
              ) : null}
            </div>
            <p className="text-foreground leading-relaxed whitespace-pre-wrap mb-3">{item.message}</p>
            <p className="text-xs text-muted">{new Date(item.createdAt).toLocaleString('ko-KR')}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        {cursor ? (
          <button 
            className="btn btn-outline" 
            onClick={() => loadMore(cursor)} 
            disabled={loading}
          >
            {loading ? "로딩 중..." : "더 보기"}
          </button>
        ) : items.length > 0 ? (
          <p className="text-sm text-muted italic">모든 메시지를 확인했습니다 ♡</p>
        ) : (
          <p className="text-sm text-muted italic">첫 번째 축하 메시지를 남겨주세요!</p>
        )}
      </div>
    </section>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="section-title text-xl font-semibold tracking-tight mb-3">
      {children}
    </h2>
  );
} 