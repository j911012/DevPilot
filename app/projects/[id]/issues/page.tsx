"use client";

import { useState } from "react";
import { Input } from "@/shared/ui/atoms/input";
import { Badge } from "@/shared/ui/atoms/badge";
import { Button } from "@/shared/ui/atoms/button";
import type { Issue } from "@/features/issues/type";
import { STATUS_TO_TONE } from "@/features/issues/constants";
import { dummyProject, dummyIssues } from "@/features/issues/mock";

const IssuesPage = () => {
  const [issues, setIssues] = useState<Issue[]>(dummyIssues);
  const [activeIssueId, setActiveIssueId] = useState<string>(issues[0].id);
  const activeIssue =
    issues.find((issue) => issue.id === activeIssueId) ?? issues[0];

  return (
    <div className="grid min-h-screen grid-cols-[280px_1fr_320px]">
      <aside className="border-r border-black/10 dark:border-white/10 p-3">
        <div className="mb-3">
          <Input placeholder="Filter…" />
        </div>
        <ul className="space-y-1">
          {issues.map((issue) => (
            <li key={issue.id}>
              <button
                onClick={() => setActiveIssueId(issue.id)}
                aria-current={activeIssueId === issue.id ? "true" : undefined}
                className={`w-full rounded-[var(--radius)] px-3 py-2 text-left hover:bg-black/[.04] dark:hover:bg-white/[.06] ${
                  activeIssueId === issue.id
                    ? "bg-black/[.06] dark:bg-white/[.08]"
                    : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm">{issue.title}</span>
                  <Badge tone={STATUS_TO_TONE[issue.status]}>
                    {issue.status}
                  </Badge>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <main className="p-4">
        <div className="mb-3 flex items-center gap-2">
          <h2 className="text-lg font-semibold">
            {activeIssue?.title ?? "No issue selected"}
          </h2>
          <Badge tone={STATUS_TO_TONE[activeIssue.status]}>
            {activeIssue.status}
          </Badge>
        </div>
        <div className="space-y-3 text-sm text-zinc-700 dark:text-zinc-300">
          <p>{activeIssue?.description ?? "No description"}</p>
          <div className="flex gap-2">
            <Button size="sm">編集</Button>
            <Button size="sm" variant="outline">
              完了にする
            </Button>
          </div>
        </div>
      </main>

      <aside className="border-l border-black/10 dark:border-white/10 p-4">
        <h3 className="mb-2 text-sm font-semibold">Notes / TIL</h3>
        <div className="space-y-2">
          <Input placeholder="メモ…" />
          <Button size="sm">追加</Button>
        </div>
      </aside>
    </div>
  );
};

export default IssuesPage;
