import { create } from '../fetch';
import { getIssuesInfo } from './getTotalIssues';

import config from '~config';

const baseurl = `https://api.github.com/repos/${config.githubRepo}`;

const headers = {
  Accept: 'application/vnd.github+json',
  'Content-Type': 'application/json',
  Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
};

const fetch = create(baseurl);

// https://docs.github.com/en/rest/issues/issues?apiVersion=2022-11-28

export default async function getIssues(page = 1): Promise<Issue[]> {
  const res = await fetch({
    url: `/issues?page=${page}&per_page=30&state=closed`,
    options: {
      headers, next: {
        revalidate: 60
      }
    }
  });
  const data = await res.json();
  return data.map((issue: Issue) => ({
    ...issue,
    date: new Date(issue.created_at),
    slug: issue.id.toString()
  }));
}

export const getAllIssues = async () => {
  const issuesInfo = await getIssuesInfo();
  const issues: Issue[] = [];
  const pages = Math.ceil(issuesInfo.total_count / 30);
  for (let i = 0; i < pages; i++) {
    issues.push(...(await getIssues(i + 1)));
  }

  return issues;
};

// 也可以通过id来查找， 减少http请求 nextjs 由于有请求缓存， 所以不用也可以.
export const getIssueBySlug = async (slug: string) => {
  const issues = await getAllIssues();
  return issues.find((issue) => issue.slug === slug);
};

export const getIssueComments = async (
  issueNumber: number
): Promise<IssueComment[]> => {
  const res = await fetch({
    url: `/issues/${issueNumber}/comments`,
    options: {
      headers
    }
  });
  return await res.json();
};
