export type Project = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type IssueStatus =
  | "backlog"
  | "todo"
  | "in_progress"
  | "done"
  | "archived";

export type Issue = {
  id: string;
  projectId: string;
  title: string;
  status: IssueStatus;
  description?: string;
  tasks?: string[];
  tags?: string[];
  createdAt: string;
  updatedAt: string;
};
