import fs from 'fs';
import MarkdownWrapper from '~app/ui/MarkdownWrapper';

function page() {
  const readme = fs.readFileSync('README.md', 'utf-8');
  return (
    <div className="prose max-w-none">
      <MarkdownWrapper text={readme} />
    </div>
  );
}

export default page;
