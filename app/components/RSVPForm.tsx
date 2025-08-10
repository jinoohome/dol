"use client";

import { useMemo, useState } from "react";

type Status = "attend" | "absent" | "pending";

type FormState = {
  name: string;
  phone: string;
  status: Status | "";
  count: number;
  memo: string;
};

const initial: FormState = { name: "", phone: "", status: "", count: 1, memo: "" };

function validate(v: FormState): string | null {
  if (!v.name || v.name.length > 220) return "성함을 입력해 주세요 (최대 220자)";
  const phoneRe = /^(01[016789])-(\d{3,4})-(\d{4})$/;
  if (!phoneRe.test(v.phone)) return "연락처는 010-1234-5678 형식으로 입력해 주세요";
  if (!v.status) return "참석 여부를 선택해 주세요";
  if (v.count < 0 || v.count > 6) return "인원수는 0~6명까지 입력 가능합니다";
  if (v.memo && v.memo.length > 200) return "메모는 200자 이내로 입력해 주세요";
  return null;
}

export default function RSVPForm() {
  const [form, setForm] = useState<FormState>(initial);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<"success" | "error" | null>(null);

  // simple captcha: sum of two numbers
  const [a, b] = useMemo(() => [Math.floor(Math.random() * 5) + 1, Math.floor(Math.random() * 5) + 1], []);
  const [captcha, setCaptcha] = useState<string>("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const error = validate(form);
    if (error) return alert(error);
    if (parseInt(captcha, 10) !== a + b) return alert("스팸 방지 인증값이 올바르지 않습니다");
    setLoading(true);
    try {
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), 10000);
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          status: form.status,
          count: form.count,
          memo: form.memo,
          ts: Date.now(), // timestamp honeypot
        }),
        signal: controller.signal,
      });
      clearTimeout(id);
      if (!res.ok) throw new Error("fail");
      setResult("success");
      setForm(initial);
      setCaptcha("");
    } catch {
      setResult("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="card p-4 shadow-soft" onSubmit={onSubmit}>
      <div className="grid gap-3">
        <div>
          <label className="block text-sm mb-1">성함 *</label>
          <input
            className="w-full rounded-md border px-3 py-2 bg-white"
            placeholder="홍길동"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            maxLength={220}
            required
          />
        </div>
        <div>
          <label className="block text-sm mb-1">연락처 *</label>
          <input
            className="w-full rounded-md border px-3 py-2 bg-white"
            placeholder="010-1234-5678"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            inputMode="numeric"
            required
          />
        </div>
        <div>
          <label className="block text-sm mb-1">참석 여부 *</label>
          <div className="flex gap-2">
            {[
              { key: "attend", label: "참석" },
              { key: "absent", label: "불참" },
              { key: "pending", label: "미정" },
            ].map((opt) => (
              <button
                type="button"
                key={opt.key}
                onClick={() => setForm({ ...form, status: opt.key as Status })}
                className={`btn ${form.status === (opt.key as Status) ? "btn-primary" : "btn-outline"}`}
                aria-pressed={form.status === (opt.key as Status)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm mb-1">인원수 (0~6)</label>
          <input
            type="number"
            className="w-full rounded-md border px-3 py-2 bg-white"
            value={form.count}
            onChange={(e) => setForm({ ...form, count: Number(e.target.value) })}
            min={0}
            max={6}
          />
        </div>
        <div>
          <label className="block text-sm mb-1">메모</label>
          <textarea
            className="w-full rounded-md border px-3 py-2 bg-white"
            rows={3}
            placeholder="200자 이내"
            value={form.memo}
            onChange={(e) => setForm({ ...form, memo: e.target.value })}
            maxLength={200}
          />
        </div>
        <div>
          <label className="block text-sm mb-1">스팸 방지: {a} + {b} = ? *</label>
          <input
            className="w-full rounded-md border px-3 py-2 bg-white"
            value={captcha}
            onChange={(e) => setCaptcha(e.target.value)}
            required
          />
        </div>
        <button className="btn btn-primary h-11" disabled={loading} aria-busy={loading}>
          {loading ? "제출 중…" : "참석 여부 보내기"}
        </button>
        {result === "success" ? (
          <p className="text-sm text-green-600">제출되었습니다. 감사합니다!</p>
        ) : null}
        {result === "error" ? (
          <p className="text-sm text-red-600">전송에 실패했어요. 잠시 후 다시 시도해 주세요.</p>
        ) : null}
      </div>
    </form>
  );
} 