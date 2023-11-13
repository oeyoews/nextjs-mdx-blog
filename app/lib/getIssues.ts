import { Metadata } from 'next';

const baseurl = `https://api.github.com/repos/oeyoews/neotw`;
const headers = {
  Accept: 'application/vnd.github+json',
  'Content-Type': 'application/json',
  Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
};

export function generateMeta(): Metadata {
  return {
    title: 'neotw issues',
    description: 'neotw issues',
  };
}

export default async function getIssues(): Promise<Issues[]> {
  const response = await fetch(`${baseurl}/issues`, {
    method: 'GET',
    headers,
  });
  const data = await response.json();
  return data;
}

export async function getIssuesInfo(): Promise<IssuesInfo> {
  const response = await fetch(baseurl, {
    method: 'GET',
    headers,
  });
  const data = await response.json();
  return data;
}
