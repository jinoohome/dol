"use client";

import { useState } from "react";
import type { BankAccount } from "@/app/types";

export default function BankAccountCard({ title, accounts }: { title: string; accounts: BankAccount[] }) {
  const [copied, setCopied] = useState<string | null>(null);
  async function copy(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(text);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      alert("복사에 실패했어요");
    }
  }
  return (
    <div className="card p-4 shadow-soft">
      <p className="font-medium mb-3">{title}</p>
      <ul className="space-y-2">
        {accounts.map((a, i) => (
          <li key={i} className="flex items-center justify-between gap-3 text-sm">
            <span>
              {a.bank} {a.account} <span className="text-muted">({a.owner})</span>
            </span>
            <button className="btn btn-primary px-3 py-1" onClick={() => copy(`${a.bank} ${a.account} (${a.owner})`)}>
              복사
            </button>
          </li>
        ))}
      </ul>
      {copied ? <p className="mt-2 text-xs text-muted">복사됨: {copied}</p> : null}
    </div>
  );
} 