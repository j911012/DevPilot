import { useRef, useEffect } from "react";
import { Input } from "@/shared/ui/atoms/input";
import { Badge } from "@/shared/ui/atoms/badge";
import { STATUS_TO_TONE } from "../constants";
import { IssueActionsMenu } from "./IssueActionsMenu";
import { Issue } from "../type";

type IssueHeaderProps = {
  issue: Issue;
  isEditing: boolean;
  draftTitle: string;
  onChangeDraftTitle: (title: string) => void;
  onSubmitTitle: () => void;
  onCancelTitle: () => void;
  onStartEditTitle: () => void;
  openActions: boolean;
  onOpenActionsChange: (open: boolean) => void;
  onDeleteIssue: () => void;
};

export const IssueHeader = ({
  issue,
  isEditing,
  draftTitle,
  onChangeDraftTitle,
  onSubmitTitle,
  onCancelTitle,
  onStartEditTitle,
  openActions,
  onOpenActionsChange,
  onDeleteIssue,
}: IssueHeaderProps) => {
  const titleRef = useRef<HTMLInputElement>(null);

  // 編集モードに入ったらフォーカス/全選択
  useEffect(() => {
    if (!isEditing) return;
    titleRef.current?.focus();
  }, [isEditing]);

  return (
    <div className="mb-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        {!isEditing ? (
          <>
            <h2 className="text-lg font-semibold">{issue.title}</h2>
            <Badge tone={STATUS_TO_TONE[issue.status]}>{issue.status}</Badge>
          </>
        ) : (
          <Input
            ref={titleRef}
            value={draftTitle}
            onChange={(e) => onChangeDraftTitle(e.target.value)}
            onBlur={onSubmitTitle}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                e.currentTarget.blur();
              }
              if (e.key === "Escape") {
                e.preventDefault();
                onCancelTitle();
              }
            }}
            aria-label="Issueタイトル編集"
            className="max-w-md"
          />
        )}
      </div>
      <IssueActionsMenu
        open={openActions}
        onOpenChange={onOpenActionsChange}
        onEdit={onStartEditTitle}
        onDelete={onDeleteIssue}
      />
    </div>
  );
};
