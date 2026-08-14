export interface FeaturedRepo {
  name: string;
  description: string | null;
  url: string;
  homepage: string | null;
  stars: number;
  language: string | null;
}

const GITHUB_USER = 'thiago662';
const FEATURE_TOPIC = 'portfolio';

interface GitHubSearchItem {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  language: string | null;
}

export async function fetchFeaturedRepos(): Promise<FeaturedRepo[]> {
  const query = `user:${GITHUB_USER}+topic:${FEATURE_TOPIC}+archived:false+fork:false`;
  const url = `https://api.github.com/search/repositories?q=${query}&sort=updated`;
  const response = await fetch(url, {
    headers: { Accept: 'application/vnd.github+json' },
  });

  if (!response.ok) {
    console.warn(`[github] Falha ao buscar repositórios (status ${response.status}).`);
    return [];
  }

  const json = await response.json();
  const items: GitHubSearchItem[] = json.items ?? [];

  return items.map((item) => ({
    name: item.name,
    description: item.description,
    url: item.html_url,
    homepage: item.homepage || null,
    stars: item.stargazers_count,
    language: item.language,
  }));
}
