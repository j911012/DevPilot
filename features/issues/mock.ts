import { Issue, Project } from "./type";

// 固定のダミーUUID（開発中に変わらない方がデバッグしやすい）
const PROJECT_ID = "11111111-1111-1111-1111-111111111111";

export const dummyProject: Project = {
  id: PROJECT_ID,
  name: "DevPilot",
  createdAt: "2025-01-01T00:00:00.000Z",
  updatedAt: "2025-01-01T00:00:00.000Z",
};

export const dummyIssues: Issue[] = [
  {
    id: "22222222-2222-2222-2222-222222222222",
    projectId: PROJECT_ID,
    title: "検索の空状態を作る",
    status: "backlog",
    description: "0件時のUIと再検索導線",
    tags: ["ux", "a11y"],
    createdAt: "2025-11-01T10:10:00Z",
    updatedAt: "2025-11-01T10:10:00Z",
  },
  {
    id: "33333333-3333-3333-3333-333333333333",
    projectId: PROJECT_ID,
    title: "Issue詳細のインライン編集",
    status: "in_progress",
    description: "タイトルをEnter/Escで編集",
    tags: ["inline-edit"],
    createdAt: "2025-11-01T10:15:00Z",
    updatedAt: "2025-11-01T10:20:00Z",
  },
  {
    id: "44444444-4444-4444-4444-444444444444",
    projectId: PROJECT_ID,
    title: "コマンドパレット土台（⌘K）",
    status: "todo",
    createdAt: "2025-11-01T10:30:00Z",
    updatedAt: "2025-11-01T10:30:00Z",
  },
  {
    id: "55555555-5555-5555-5555-555555555555",
    projectId: PROJECT_ID,
    title: "サイドバー実装",
    status: "done",
    createdAt: "2025-11-01T10:40:00Z",
    updatedAt: "2025-11-01T10:50:00Z",
  },
];
