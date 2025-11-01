import type { IssueStatus } from "./type";

type Tone = "neutral" | "primary" | "success" | "warning";

export const STATUS_TO_TONE: Record<IssueStatus, Tone> = {
  backlog: "neutral",
  todo: "warning",
  in_progress: "primary",
  done: "success",
  archived: "neutral",
};
