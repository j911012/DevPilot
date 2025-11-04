// app/projects/page.tsx
import Link from "next/link";

const ProjectsPage = () => {
  return (
    <main className="mx-auto max-w-4xl p-6">
      <h1 className="mb-4 text-xl font-semibold">Projects</h1>
      <ul className="space-y-2">
        <li>
          <Link
            className="text-blue-600 underline"
            href="/projects/demo/issues"
          >
            DevPilot
          </Link>
        </li>
      </ul>
    </main>
  );
};

export default ProjectsPage;
