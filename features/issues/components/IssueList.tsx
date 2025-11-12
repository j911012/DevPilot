import type { Issue } from "../type";
import { STATUS_TO_TONE } from "../constants";
import { Badge } from "@/shared/ui/atoms/badge";

type IssueListProps = {
  issues: Issue[];
  activeIssueId: string;
  onSelect: (id: string) => void;
};

export const IssueList = ({
  issues,
  activeIssueId,
  onSelect,
}: IssueListProps) => {
  return (
    <ul className="space-y-1">
      {issues.map((issue: Issue) => (
        <li key={issue.id}>
          <button
            onClick={() => onSelect(issue.id)}
            aria-current={activeIssueId === issue.id ? "true" : undefined}
            className={`w-full rounded-[var(--radius)] px-3 py-2 text-left hover:bg-black/[.04] dark:hover:bg-white/[.06] ${
              activeIssueId === issue.id
                ? "bg-black/[.06] dark:bg-white/[.08]"
                : ""
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm">{issue.title}</span>
              <Badge tone={STATUS_TO_TONE[issue.status]}>{issue.status}</Badge>
            </div>
          </button>
        </li>
      ))}
    </ul>
  );
};
