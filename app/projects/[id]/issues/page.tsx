"use client";

import { useEffect, useRef, useState } from "react";
import { Input } from "@/shared/ui/atoms/input";
import { Badge } from "@/shared/ui/atoms/badge";
import { Button } from "@/shared/ui/atoms/button";
import { Textarea } from "@/shared/ui/atoms/textarea";
import type { Issue, IssueStatus } from "@/features/issues/type";
import { STATUS_TO_TONE } from "@/features/issues/constants";
import { dummyProject, dummyIssues } from "@/features/issues/mock";
import { Settings, X, Pencil, Trash2 } from "lucide-react";
import { Note } from "@/features/notes/type";
import { IssueList } from "@/features/issues/components/IssueList";

const IssuesPage = () => {
  const [issues, setIssues] = useState<Issue[]>(dummyIssues);
  const [activeIssueId, setActiveIssueId] = useState<string>(issues[0].id);
  const [statusFilter, setStatusFilter] = useState<"all" | IssueStatus>("all");
  const [keyword, setKeyword] = useState("");
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [draftTitle, setDraftTitle] = useState("");
  const [openActions, setOpenActions] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [draftNote, setDraftNote] = useState("");

  const titleRef = useRef<HTMLInputElement>(null);

  /**
   * タイトルのインライン編集開始
   */
  const startEditTitle = () => {
    if (!activeIssue) return;
    setIsEditingTitle(true);
    setDraftTitle(activeIssue.title);
    setOpenActions(false);
  };

  /**
   * タイトルのインライン編集確定
   */
  const submitTitle = () => {
    const nextTitle = draftTitle.trim();
    if (!nextTitle || nextTitle === activeIssue?.title) {
      setIsEditingTitle(false);
      return;
    }
    setIssues(
      issues.map((issue) =>
        issue.id === activeIssueId ? { ...issue, title: nextTitle } : issue
      )
    );
    setIsEditingTitle(false);
  };

  /**
   * タイトルのインライン編集キャンセル
   */
  const cancelTitle = () => {
    setIsEditingTitle(false);
    setDraftTitle(activeIssue?.title);
  };

  // 編集モードに入ったらフォーカス/全選択
  useEffect(() => {
    if (!isEditingTitle) return;
    titleRef.current?.focus();
  }, [isEditingTitle]);

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

  /**
   * メモの追加
   */
  const addNote = () => {
    const content = draftNote.trim();
    if (!content) return;
    const now = new Date().toISOString();
    setNotes((prev) => [
      {
        id: crypto.randomUUID(),
        projectId: "demo-project", // 後で実データに差し替え
        content,
        createdAt: now,
      },
      ...prev,
    ]);
    setDraftNote("");
  };

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
        <IssueList
          issues={filteredIssues}
          activeIssueId={activeIssueId}
          onSelect={(id) => {
            setActiveIssueId(id);
            setIsEditingTitle(false);
            setDraftTitle("");
          }}
        />
      </aside>

      <main className="p-4 relative">
        {activeIssue ? (
          <>
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {!isEditingTitle ? (
                  <>
                    <h2 className="text-lg font-semibold">
                      {activeIssue?.title}
                    </h2>
                    <Badge tone={STATUS_TO_TONE[activeIssue.status]}>
                      {activeIssue.status}
                    </Badge>
                  </>
                ) : (
                  <Input
                    ref={titleRef}
                    value={draftTitle}
                    onChange={(e) => setDraftTitle(e.target.value)}
                    onBlur={submitTitle}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        e.currentTarget.blur();
                      }
                      if (e.key === "Escape") {
                        e.preventDefault();
                        cancelTitle();
                      }
                    }}
                    aria-label="Issueタイトル編集"
                    className="max-w-md"
                  />
                )}
              </div>
              <button
                type="button"
                aria-label="アクションメニューを開く"
                onClick={() => setOpenActions(!openActions)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-[var(--radius)] hover:bg-black/[.06] dark:hover:bg-white/[.08]"
              >
                <Settings className="w-4 h-4" />
              </button>
              {openActions && (
                <div
                  role="menu"
                  className="absolute right-0 top-10 z-10 mt-2 w-44 rounded-md border border-black/10 bg-background p-1 text-sm shadow-lg dark:border-white/15"
                >
                  <div className="flex items-center justify-between px-2 py-1.5">
                    <span className="font-medium">Actions</span>
                    <button
                      type="button"
                      onClick={() => setOpenActions(false)}
                      aria-label="閉じる"
                      className="inline-flex h-6 w-6 items-center justify-center rounded hover:bg-black/[.06] dark:hover:bg-white/[.08]"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <button
                    role="menuitem"
                    type="button"
                    className="flex w-full items-center gap-2 rounded px-2 py-1.5 hover:bg-black/[.06] dark:hover:bg-white/[.08]"
                    onClick={startEditTitle}
                  >
                    <Pencil className="h-4 w-4" />
                    <span>Edit</span>
                  </button>
                  <button
                    role="menuitem"
                    type="button"
                    className="flex w-full items-center gap-2 rounded px-2 py-1.5 hover:bg-black/[.06] dark:hover:bg-white/[.08]"
                    onClick={() => {}}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span>Delete</span>
                  </button>
                </div>
              )}
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
          <Textarea
            value={draftNote}
            onChange={(e) => setDraftNote(e.target.value)}
            onKeyDown={(e) => {
              // 送信は Cmd/Ctrl + Enter のみ
              if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
                e.preventDefault();
                addNote();
              }
            }}
            placeholder="メモ…（Cmd/Ctrl+Enterで追加 / Escでクリア）"
            aria-label="メモ追加"
          />
          <Button size="sm" onClick={addNote}>
            追加
          </Button>
        </div>

        {notes.length === 0 ? (
          <p className="mt-4 text-xs text-zinc-500">まだメモがありません</p>
        ) : (
          <ul className="mt-4 space-y-2">
            {notes.map((note) => (
              <li
                key={note.id}
                className="rounded border border-black/10 dark:border-white/10 p-2 text-sm whitespace-pre-wrap break-words"
              >
                {note.content}
                <div className="mt-1 text-[10px] text-zinc-500">
                  {new Date(note.createdAt).toLocaleString()}
                </div>
              </li>
            ))}
          </ul>
        )}
      </aside>
    </div>
  );
};

export default IssuesPage;
