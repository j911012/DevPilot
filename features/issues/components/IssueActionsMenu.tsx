import { Settings, X, Pencil, Trash2 } from "lucide-react";

type IssueActionsMenuProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit: () => void;
};

export const IssueActionsMenu = ({
  open,
  onOpenChange,
  onEdit,
}: IssueActionsMenuProps) => {
  return (
    <div
      className="relative inline-block"
      tabIndex={-1}
      onBlur={(e) => {
        const next = e.relatedTarget as Node | null; // 次に視線（フォーカス）が行く先
        if (!e.currentTarget.contains(next)) {
          // 次の行き先が“箱の外”なら閉じる
          onOpenChange(false);
        }
      }}
    >
      <button
        type="button"
        aria-label="アクションメニューを開く"
        onClick={() => onOpenChange(!open)}
        className="inline-flex h-8 w-8 items-center justify-center rounded-[var(--radius)] hover:bg-black/[.06] dark:hover:bg-white/[.08]"
      >
        <Settings className="w-4 h-4" />
      </button>
      {open && (
        <div
          role="menu"
          className="absolute right-0 top-8 z-10 mt-2 w-30 rounded-md border border-black/10 bg-background p-1 text-sm shadow-lg dark:border-white/15"
        >
          <button
            role="menuitem"
            type="button"
            className="flex w-full items-center gap-2 rounded px-2 py-1.5 hover:bg-black/[.06] dark:hover:bg-white/[.08]"
            onClick={() => onEdit()}
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
  );
};
