import chalk from 'chalk';
import fs from 'fs';
import md5 from 'md5';
import path from 'path';
import config from '~config';

export interface Post {
  metadata: Metadata;
  slug: string;
  content: string;
  type: 'md' | 'mdx';
}

export interface Metadata {
  title: string;
  date: string;
  summary?: string;
  image?: string;
  password?: string;
  draft?: boolean | string;
}

const getDefaultDate = (filePath: string): string => {
  const stats = fs.statSync(filePath);
  return new Date(stats.birthtime).toLocaleString();
};

const parseDate = (dateString: string): string | number => {
  const parsedDate = Date.parse(dateString);
  return isNaN(parsedDate) ? dateString : parsedDate;
};
const parseFrontmatter = (
  fileContent: string,
  fileName: string,
  filePath: string
) => {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  const match = frontmatterRegex.exec(fileContent);
  const defaultDate = getDefaultDate(filePath);
  const defaultTitle = fileName.replace(/\.mdx?$|\.md$/, ''); // Use file name as the default title

  if (match) {
    const frontMatterBlock = match[1];
    const content = fileContent.replace(frontmatterRegex, '').trim();
    const frontMatterLines = frontMatterBlock.trim().split('\n');
    const metadata: Partial<Metadata> = {};

    frontMatterLines.forEach((line) => {
      const [key, ...valueArr] = line.split(': ');
      let value: any = valueArr.join(': ').trim();
      value = value.replace(/^['"](.*)['"]$/, '$1'); // Remove quotes
      if (value === 'true') {
        value = true;
      } else if (value === 'false') {
        value = false;
      }
      if (key.trim() === 'date') {
        value = parseDate(value);
      }
      metadata[key.trim() as keyof Metadata] = value;
      if (!metadata.date) {
        metadata.date = defaultDate;
      }
    });

    return { metadata: metadata as Metadata, content };
  } else {
    // No frontmatter found, use default values
    const defaultFrontmatter = `---\ntitle: "${defaultTitle}"\ndate: ${defaultDate}\n---`;
    const updatedContent = `${defaultFrontmatter}\n\n${fileContent.trim()}`;
    // Write the updated content back to the file
    fs.writeFileSync(filePath, updatedContent);
    console.log(
      chalk.red(`检测到 ${filePath} 没有 frontmatter`, '已经自动更新')
    );
    return {
      metadata: {
        title: defaultTitle,
        date: defaultDate
      },
      content: fileContent.trim()
    };
  }
};

const getMDXFilesRecursive = (dir: string): string[] => {
  let mdxFiles: string[] = [];
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const isDirectory = fs.statSync(filePath).isDirectory();

    if (isDirectory) {
      // Recursively get MDX files from subdirectories
      mdxFiles = mdxFiles.concat(getMDXFilesRecursive(filePath));
    } else if (path.extname(file) === '.mdx' || path.extname(file) === '.md') {
      mdxFiles.push(filePath);
    }
  });

  return mdxFiles;
};

const readMDXFile = (filePath: string) => {
  const rawContent = fs.readFileSync(filePath, 'utf-8');
  return parseFrontmatter(rawContent, path.basename(filePath), filePath);
};

const getMDXData = (dir: string): Post[] => {
  if (!fs.existsSync(dir)) {
    console.log(chalk.red.bold('无法找到目录'), dir);
    return [];
  }
  const mdxFiles = getMDXFilesRecursive(dir);
  return mdxFiles.map((filePath) => {
    const { metadata, content } = readMDXFile(filePath);
    const filename = path.basename(filePath, path.extname(filePath));
    return {
      metadata,
      type: path.extname(filePath) === '.mdx' ? 'mdx' : 'md',
      slug: md5(filename).slice(0, config.md5Length),
      content
    };
  });
};

export const getBlogPosts = (dir: string = config.content) => {
  return getMDXData(path.join(process.cwd(), dir));
};

export const getPostFromParams = (slug: string) =>
  getBlogPosts().find((post) => post.slug === slug);
