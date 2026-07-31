import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const username = process.env.GITHUB_USERNAME ?? "bartek-filipiuk";
const token = process.env.GITHUB_TOKEN;
const outputPath = path.resolve("data/github-repositories.json");

const headers = {
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
  "User-Agent": `${username}-portfolio-builder`,
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
};

const repositories = [];

for (let page = 1; page <= 10; page += 1) {
  const response = await fetch(
    `https://api.github.com/users/${username}/repos?type=public&sort=updated&per_page=100&page=${page}`,
    { headers },
  );

  if (!response.ok) {
    throw new Error(`GitHub API returned ${response.status}: ${await response.text()}`);
  }

  const batch = await response.json();
  repositories.push(...batch);
  if (batch.length < 100) break;
}

const normalized = repositories
  .map((repository) => ({
    name: repository.name,
    fullName: repository.full_name,
    description: repository.description,
    url: repository.html_url,
    homepage: repository.homepage || null,
    language: repository.language,
    topics: repository.topics ?? [],
    stars: repository.stargazers_count,
    forks: repository.forks_count,
    archived: repository.archived,
    fork: repository.fork,
    size: repository.size,
    createdAt: repository.created_at,
    updatedAt: repository.updated_at,
    pushedAt: repository.pushed_at,
    license: repository.license?.spdx_id ?? null,
    defaultBranch: repository.default_branch,
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

const payload = `${JSON.stringify(
  {
    generatedAt: new Date().toISOString(),
    username,
    repositories: normalized,
  },
  null,
  2,
)}\n`;

let previous = "";
try {
  previous = await readFile(outputPath, "utf8");
} catch {
  // First run.
}

const stablePrevious = previous.replace(/"generatedAt": ".*?"/, '"generatedAt": "__ignored__"');
const stableNext = payload.replace(/"generatedAt": ".*?"/, '"generatedAt": "__ignored__"');

if (stablePrevious === stableNext) {
  console.log("GitHub repository data is already current.");
  process.exit(0);
}

await mkdir(path.dirname(outputPath), { recursive: true });
await writeFile(outputPath, payload, "utf8");
console.log(`Updated ${outputPath} with ${normalized.length} public repositories.`);
