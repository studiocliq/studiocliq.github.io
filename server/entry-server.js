import { jsxs, jsx } from "react/jsx-runtime";
import { renderToString } from "react-dom/server";
import { Link, useParams, Routes, Route, StaticRouter } from "react-router";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkRehype from "remark-rehype";
import rehypeKatex from "rehype-katex";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";
const __vite_glob_0_0 = '---\ntitle: Hello World\ndate: 2025-01-01\n---\n\nThis is my first blog post with **markdown** support.\n\n## Code Highlighting\n\nInline code: `const x = 42`\n\n```typescript\nfunction greet(name: string): string {\n  return `Hello, ${name}!`;\n}\n\nconsole.log(greet("World"));\n```\n\n## LaTeX Math\n\nInline math: $E = mc^2$\n\nBlock math:\n\n$$\n\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}\n$$\n\n## Tables\n\n| Name    | Role       | Language   |\n|---------|------------|------------|\n| Alice   | Developer  | TypeScript |\n| Bob     | Designer   | CSS        |\n| Charlie | Writer     | Markdown   |\n\n## Blockquote\n\n> The best way to predict the future is to invent it.\n> — Alan Kay\n\n## Lists\n\n- Item one\n- Item two\n- Item three\n\n1. First\n2. Second\n3. Third\n\n## Task List\n\n- [x] Setup Vite\n- [x] Add routing\n- [x] Add markdown support\n- [ ] Write more posts\n';
const postFiles = /* @__PURE__ */ Object.assign({
  "/content/posts/hello-world.md": __vite_glob_0_0
});
function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) {
    return { data: {}, content: raw };
  }
  const [, frontmatter, content] = match;
  const data = {};
  for (const line of frontmatter.split("\n")) {
    const colonIndex = line.indexOf(":");
    if (colonIndex !== -1) {
      const key = line.slice(0, colonIndex).trim();
      const value = line.slice(colonIndex + 1).trim();
      data[key] = value;
    }
  }
  return { data, content };
}
function getAllPosts() {
  const posts = [];
  for (const [path, raw] of Object.entries(postFiles)) {
    const slug = path.replace("/content/posts/", "").replace(".md", "");
    const { data } = parseFrontmatter(raw);
    posts.push({
      slug,
      title: data.title ?? slug,
      date: data.date ?? ""
    });
  }
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}
function getPost(slug) {
  const path = `/content/posts/${slug}.md`;
  const raw = postFiles[path];
  if (!raw) return null;
  const { data, content } = parseFrontmatter(raw);
  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? "",
    content
  };
}
function Home() {
  const posts = getAllPosts();
  return /* @__PURE__ */ jsxs("main", { children: [
    /* @__PURE__ */ jsx("h1", { children: "Blog" }),
    /* @__PURE__ */ jsx("ul", { children: posts.map((post) => /* @__PURE__ */ jsxs("li", { children: [
      /* @__PURE__ */ jsx(Link, { to: `/posts/${post.slug}`, children: post.title }),
      /* @__PURE__ */ jsx("time", { dateTime: post.date, children: post.date })
    ] }, post.slug)) })
  ] });
}
function About() {
  return /* @__PURE__ */ jsxs("main", { children: [
    /* @__PURE__ */ jsx("h1", { children: "About" }),
    /* @__PURE__ */ jsx("section", { children: /* @__PURE__ */ jsx("h2", { children: "Career" }) }),
    /* @__PURE__ */ jsxs("section", { children: [
      /* @__PURE__ */ jsx("h2", { children: "Links" }),
      /* @__PURE__ */ jsx("ul", { children: /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "https://github.com/", target: "_blank", rel: "noopener noreferrer", children: "GitHub" }) }) })
    ] })
  ] });
}
const processor = unified().use(remarkParse).use(remarkGfm).use(remarkMath).use(remarkRehype).use(rehypeKatex).use(rehypeHighlight).use(rehypeStringify);
function Markdown({ children }) {
  const html = processor.processSync(children).toString();
  return /* @__PURE__ */ jsx("div", { dangerouslySetInnerHTML: { __html: html } });
}
function Post() {
  const { slug } = useParams();
  const post = slug ? getPost(slug) : null;
  if (!post) {
    return /* @__PURE__ */ jsx("main", { children: /* @__PURE__ */ jsx("h1", { children: "Post not found" }) });
  }
  return /* @__PURE__ */ jsxs("article", { children: [
    /* @__PURE__ */ jsxs("header", { children: [
      /* @__PURE__ */ jsx("h1", { children: post.title }),
      /* @__PURE__ */ jsx("time", { dateTime: post.date, children: post.date })
    ] }),
    /* @__PURE__ */ jsx(Markdown, { children: post.content })
  ] });
}
function App() {
  return /* @__PURE__ */ jsxs("div", { className: "page", children: [
    /* @__PURE__ */ jsxs("nav", { children: [
      /* @__PURE__ */ jsx(Link, { to: "/", children: "Home" }),
      /* @__PURE__ */ jsx(Link, { to: "/about", children: "About" })
    ] }),
    /* @__PURE__ */ jsxs(Routes, { children: [
      /* @__PURE__ */ jsx(Route, { path: "/", element: /* @__PURE__ */ jsx(Home, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/about", element: /* @__PURE__ */ jsx(About, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/posts/:slug", element: /* @__PURE__ */ jsx(Post, {}) })
    ] })
  ] });
}
function render(url) {
  return renderToString(
    /* @__PURE__ */ jsx(StaticRouter, { location: url, children: /* @__PURE__ */ jsx(App, {}) })
  );
}
export {
  render
};
