'use client';

import GithubIssueItem from '~components/GitHubIssue/GithubIssueItem';
import YearHeader from '~components/PostList/YearHeader';

export default function GithubIssueList({ issues }: { issues: Issue[] }) {
  let currentYear: number;

  const sortByDate = (a: Issue, b: Issue) => {
    return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
  };

  const filteredIssues = issues.filter(
    (issue) => issue.state_reason !== 'not_planned',
  );

  const GithubIssueListContent = () => (
    <ul className="list-none my-4 prose dark:prose-invert">
      {filteredIssues.sort(sortByDate).map((issue, index) => {
        const { title, updated_at } = issue;
        const postYear = new Date(updated_at).getFullYear();
        const yearHeader = currentYear !== postYear && (
          <YearHeader postYear={postYear} />
        );
        currentYear = postYear;

        return (
          <GithubIssueItem
            issue={issue}
            index={index}
            key={title}
            order={index === filteredIssues.length - 1 ? 'end' : 'normal'}
          >
            {yearHeader}
          </GithubIssueItem>
        );
      })}
    </ul>
  );

  return <GithubIssueListContent />;
}
