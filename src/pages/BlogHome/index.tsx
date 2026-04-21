import { useState, useEffect } from "react";
import { Card, Input, Tag, Pagination } from "antd";
import { Link } from "umi";

const { Search } = Input;
const pageSize = 9;

export default function BlogHome() {
  const [posts] = useState<any[]>([
    {
      id: 1,
      title: "React cơ bản",
      summary: "Giới thiệu React...",
      author: "Admin",
      date: "2026-04-21",
      tags: ["react"],
      status: "published",
      views: 10
    },
    {
      id: 2,
      title: "JavaScript nâng cao",
      summary: "JS nâng cao...",
      author: "Admin",
      date: "2026-04-21",
      tags: ["js"],
      status: "draft",
      views: 5
    }
  ]);

  const [keyword, setKeyword] = useState("");
  const [tag, setTag] = useState("");
  const [page, setPage] = useState(1);
  const [filtered, setFiltered] = useState(posts);

  // debounce search
  useEffect(() => {
    const t = setTimeout(() => {
      let data = posts.filter(p =>
        p.title.toLowerCase().includes(keyword.toLowerCase())
      );
      if (tag) data = data.filter(p => p.tags.includes(tag));
      setFiltered(data);
      setPage(1);
    }, 300);
    return () => clearTimeout(t);
  }, [keyword, tag]);

  const current = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div style={{ padding: 20 }}>
      <h2>Blog</h2>

      <Search
        placeholder="Tìm kiếm..."
        onChange={e => setKeyword(e.target.value)}
        style={{ width: 300, marginBottom: 20 }}
      />

      {/* TAG FILTER */}
      <div style={{ marginBottom: 20 }}>
        {[...new Set(posts.flatMap(p => p.tags))].map(t => (
          <Tag key={t} onClick={() => setTag(t)} style={{ cursor: "pointer" }}>
            {t}
          </Tag>
        ))}
      </div>

      {/* CARD LIST */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
        {current.map(p => (
          <Card key={p.id} hoverable>
            <h3>
              <Link to={`/blog/${p.id}`}>{p.title}</Link>
            </h3>
            <p>{p.summary}</p>
            <p>{p.author} - {p.date}</p>
            {p.tags.map((t: string) => <Tag key={t}>{t}</Tag>)}
          </Card>
        ))}
      </div>

      <Pagination
        current={page}
        total={filtered.length}
        pageSize={pageSize}
        onChange={setPage}
        style={{ marginTop: 20 }}
      />
    </div>
  );
}