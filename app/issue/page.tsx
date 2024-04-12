import GithubIssueList from '~components/GitHubIssue/GithubIssueList';
import { getAllIssues } from '~lib/issues/getIssues';
import Summary from '~components/Summary';
import { Divider } from '~components/ArticleComponents';

export const metadata = {
  title: 'issues',
  description: 'issues'
};

export const revalidate = 60;

export default async function IssueComponent() {
  const issues = await getAllIssues();

  // console.log(issues.filter((issue) => issue.number === 54));

  return (
    <>
      <Summary text="GitHub Issue" header="Issues" />
      <GithubIssueList issues={issues} />;
    </>
  );
}
