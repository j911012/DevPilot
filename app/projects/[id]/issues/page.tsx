"use client";

import { useState } from "react";
import { Input } from "@/shared/ui/atoms/input";
import { Badge } from "@/shared/ui/atoms/badge";
import { Button } from "@/shared/ui/atoms/button";
import type { Issue, IssueStatus } from "@/features/issues/type";
import { STATUS_TO_TONE } from "@/features/issues/constants";
import { dummyProject, dummyIssues } from "@/features/issues/mock";

const IssuesPage = () => {
  const [issues, setIssues] = useState<Issue[]>(dummyIssues);
  const [activeIssueId, setActiveIssueId] = useState<string>(issues[0].id);
  const [statusFilter, setStatusFilter] = useState<"all" | IssueStatus>("all");
  const [keyword, setKeyword] = useState("");

  const normalizedKeyword = keyword.trim().toLowerCase();

  // ステータスとキーワードでフィルタリングしたIssue一覧を取得する
  const filteredIssues = issues.filter((issue) => {
    // statusFilter === "all" が trueの時、全件表示なので式全体は即true。それ以外の時は issue.status が statusFilter と一致するかどうかをチェック。
    const matchesStatus =
      statusFilter === "all" || issue.status === statusFilter;

    // タイトルと説明文を1つの検索対象文字列に結合して、小文字化（大小無視検索のため）
    const searchableText = `${issue.title} ${
      issue.description ?? ""
    }`.toLowerCase();

    // キーワード未入力なら全件ヒット、入力ありなら検索対象文字列にそのキーワードが含まれていればヒット
    const matchesKeyword =
      normalizedKeyword === "" || searchableText.includes(normalizedKeyword);

    // ステータスとキーワードの両方の条件を満たしたものだけをフィルタリング結果に含める
    return matchesStatus && matchesKeyword;
  });

  // アクティブなIssueを取得（フィルタ結果優先に）
  const activeIssue =
    filteredIssues.find((issue) => issue.id === activeIssueId) ??
    filteredIssues[0] ??
    null; // フィルタリング結果が空の場合はnullを返す

  return (
    <div className="grid min-h-screen grid-cols-[280px_1fr_320px]">
      <aside className="border-r border-black/10 dark:border-white/10 p-3">
        <div className="mb-3 flex items-center gap-2">
          <Input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="検索"
            aria-label="キーワードフィルタ"
            className="flex-1 min-w-0"
          />

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value as "all" | IssueStatus)
            }
            className="ml-2 h-9 w-24 shrink-0 rounded-[var(--radius)] border border-black/10 dark:border-white/15 bg-background px-2 text-sm"
            aria-label="ステータスフィルタ"
          >
            <option value="all">All</option>
            <option value="backlog">backlog</option>
            <option value="todo">todo</option>
            <option value="in_progress">in_progress</option>
            <option value="done">done</option>
            <option value="archived">archived</option>
          </select>
        </div>
        <ul className="space-y-1">
          {filteredIssues.map((issue: Issue) => (
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
        {activeIssue ? (
          <>
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
          </>
        ) : (
          <p>No issue selected</p>
        )}
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
