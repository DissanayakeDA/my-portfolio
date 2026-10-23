export const GITHUB_USERNAME = "DissanayakeDA";
const MAX_REPOS = 5;

interface GitHubRepo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  fork: boolean;
  updated_at: string;
}

export interface Project {
  key: string;
  title: string;
  category: string;
  year: string;
  href: string;
  description: string;
  tags: string[];
  /** Preview image; when absent a typographic poster is rendered */
  image?: string;
  live?: boolean;
}

export const LIVE_PROJECTS: Project[] = [
  {
    key: "onlinephysics",
    title: "OnlinePhysics",
    category: "Live platform",
    year: "2025",
    href: "https://onlinephysics.lk",
    description:
      "An online physics learning platform for Sri Lankan students — interactive lessons, practice problems and resources aligned with the local curriculum.",
    tags: ["Education", "E-Learning", "Production"],
    live: true,
  },
];

const prettify = (name: string) => name.replace(/[-_]/g, " ");

function toProject(repo: GitHubRepo): Project {
  return {
    key: String(repo.id),
    title: prettify(repo.name),
    category: repo.language ?? "Repository",
    year: new Date(repo.updated_at).getFullYear().toString(),
    href: repo.html_url,
    description: repo.description || "Source code and documentation on GitHub.",
    tags: [repo.language, repo.stargazers_count > 0 ? `★ ${repo.stargazers_count}` : null].filter(
      (t): t is string => !!t
    ),
    image: `https://opengraph.githubassets.com/1/${GITHUB_USERNAME}/${repo.name}`,
  };
}

/**
 * Live projects plus top GitHub repos, fetched on the server so they are in the
 * HTML crawlers see. Revalidated hourly; falls back to live projects only.
 */
export async function getProjects(): Promise<Project[]> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
        },
        next: { revalidate: 3600 },
      }
    );
    if (!res.ok) throw new Error(`GitHub responded ${res.status}`);
    const data: GitHubRepo[] = await res.json();
    const repos = data
      .filter((r) => r.name !== GITHUB_USERNAME && !r.fork)
      .sort(
        (a, b) =>
          b.stargazers_count - a.stargazers_count ||
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      )
      .slice(0, MAX_REPOS)
      .map(toProject);
    return [...LIVE_PROJECTS, ...repos];
  } catch {
    // Live projects still render if GitHub is unreachable or rate-limited
    return LIVE_PROJECTS;
  }
}
