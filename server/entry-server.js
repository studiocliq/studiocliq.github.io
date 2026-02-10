import { jsxs, jsx } from "react/jsx-runtime";
import { renderToString } from "react-dom/server";
import { Link, useParams, Routes, Route, StaticRouter } from "react-router";
import { useRef, useEffect } from "react";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkRehype from "remark-rehype";
import rehypeKatex from "rehype-katex";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import mermaid from "mermaid";
const __vite_glob_0_0 = '---\ntitle: Hello World\ndate: 2025-01-01\n---\n\nThis is my first blog post with **markdown** support.\n\n## Code Highlighting\n\nInline code: `const x = 42`\n\n```typescript\nfunction greet(name: string): string {\n  return `Hello, ${name}!`;\n}\n\nconsole.log(greet("World"));\n```\n\n### Syntax Support\n\nThe blog supports many languages including TypeScript, Python, and Rust.\n\n### Theme Options\n\nCode blocks use the GitHub light theme by default.\n\n## LaTeX Math\n\nInline math: $E = mc^2$\n\nBlock math:\n\n$$\n\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}\n$$\n\n### Inline Equations\n\nUse single dollar signs for inline math like $a^2 + b^2 = c^2$.\n\n### Block Equations\n\nUse double dollar signs for centered block equations.\n\n## Tables\n\n| Name    | Role       | Language   |\n|---------|------------|------------|\n| Alice   | Developer  | TypeScript |\n| Bob     | Designer   | CSS        |\n| Charlie | Writer     | Markdown   |\n\n## Blockquote\n\n> The best way to predict the future is to invent it.\n> — Alan Kay\n\n## Lists\n\n- Item one\n- Item two\n- Item three\n\n1. First\n2. Second\n3. Third\n\n## Task List\n\n- [x] Setup Vite\n- [x] Add routing\n- [x] Add markdown support\n- [ ] Write more posts\n\n## Mermaid Diagrams\n\n```mermaid\ngraph LR\n    A[Write Markdown] --> B[Build with Vite]\n    B --> C[Static HTML]\n    C --> D[Deploy]\n```\n';
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
function EmailIcon() {
  return /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", className: "sns-icon", children: /* @__PURE__ */ jsx("path", { d: "M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" }) });
}
function GitHubIcon() {
  return /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", className: "sns-icon", children: /* @__PURE__ */ jsx("path", { d: "M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" }) });
}
function LinkedInIcon() {
  return /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", className: "sns-icon", children: /* @__PURE__ */ jsx("path", { d: "M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" }) });
}
function About() {
  return /* @__PURE__ */ jsxs("main", { children: [
    /* @__PURE__ */ jsx("h1", { children: "About" }),
    /* @__PURE__ */ jsxs("ul", { className: "sns-list", children: [
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("a", { href: "mailto:parkgone23@gmail.com", children: [
        /* @__PURE__ */ jsx(EmailIcon, {}),
        "parkgone23@gmail.com"
      ] }) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("a", { href: "https://github.com/studiocliq", target: "_blank", rel: "noopener noreferrer", children: [
        /* @__PURE__ */ jsx(GitHubIcon, {}),
        "GitHub"
      ] }) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("a", { href: "https://www.linkedin.com/in/cliq/", target: "_blank", rel: "noopener noreferrer", children: [
        /* @__PURE__ */ jsx(LinkedInIcon, {}),
        "LinkedIn"
      ] }) })
    ] }),
    /* @__PURE__ */ jsx("section", { children: /* @__PURE__ */ jsx("h2", { children: "Career" }) })
  ] });
}
mermaid.initialize({
  startOnLoad: false,
  theme: "base",
  themeVariables: {
    primaryColor: "#e8e0d0",
    primaryTextColor: "#2c2416",
    primaryBorderColor: "#5c4d3a",
    lineColor: "#5c4d3a",
    secondaryColor: "#f5f1e8",
    tertiaryColor: "#f5f1e8",
    fontFamily: '"Palatino Linotype", Palatino, "Book Antiqua", Georgia, serif'
  }
});
function rehypeMermaid() {
  return (tree) => {
    const visit = (node) => {
      if (node.tagName === "pre" && node.children?.length === 1 && node.children[0].tagName === "code") {
        const code = node.children[0];
        const classes = code.properties?.className || [];
        if (classes.includes("language-mermaid")) {
          const text = code.children[0]?.value || "";
          node.properties = { className: ["mermaid"] };
          node.children = [{ type: "text", value: text }];
        }
      }
      if (node.children) node.children.forEach(visit);
    };
    visit(tree);
  };
}
function extractHeadings(markdown) {
  const headings = [];
  const lines = markdown.split("\n");
  for (const line of lines) {
    const match = line.match(/^(#{2,6})\s+(.+)$/);
    if (match) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
      headings.push({ id, text, level });
    }
  }
  return headings;
}
const processor = unified().use(remarkParse).use(remarkGfm).use(remarkMath).use(remarkRehype).use(rehypeKatex).use(rehypeMermaid).use(rehypeHighlight).use(rehypeSlug).use(rehypeStringify);
function Markdown({ children }) {
  const ref = useRef(null);
  const html = processor.processSync(children).toString();
  useEffect(() => {
    if (ref.current?.querySelector(".mermaid")) {
      mermaid.run({ nodes: ref.current.querySelectorAll(".mermaid") });
    }
  }, [html]);
  return /* @__PURE__ */ jsx("div", { ref, dangerouslySetInnerHTML: { __html: html } });
}
function TableOfContents({ headings }) {
  if (headings.length === 0) {
    return null;
  }
  return /* @__PURE__ */ jsx("nav", { className: "toc", children: /* @__PURE__ */ jsx("ul", { className: "toc-list", children: headings.map((heading) => /* @__PURE__ */ jsx(
    "li",
    {
      className: `toc-item toc-h${heading.level}`,
      children: /* @__PURE__ */ jsx("a", { href: `#${heading.id}`, children: heading.text })
    },
    heading.id
  )) }) });
}
function Post() {
  const { slug } = useParams();
  const post = slug ? getPost(slug) : null;
  if (!post) {
    return /* @__PURE__ */ jsx("main", { children: /* @__PURE__ */ jsx("h1", { children: "Post not found" }) });
  }
  const headings = extractHeadings(post.content);
  return /* @__PURE__ */ jsxs("div", { className: "post-layout", children: [
    /* @__PURE__ */ jsxs("article", { className: "post-content", children: [
      /* @__PURE__ */ jsxs("header", { children: [
        /* @__PURE__ */ jsx("h1", { children: post.title }),
        /* @__PURE__ */ jsx("time", { dateTime: post.date, children: post.date })
      ] }),
      /* @__PURE__ */ jsx(Markdown, { children: post.content })
    ] }),
    /* @__PURE__ */ jsx("aside", { className: "post-sidebar", children: /* @__PURE__ */ jsx(TableOfContents, { headings }) })
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
