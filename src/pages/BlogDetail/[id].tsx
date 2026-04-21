export default function BlogDetail(props: any) {
  const { id } = props.match.params;

  const posts = [
    {
      id: 1,
      title: "React cơ bản",
      content: "Nội dung React...",
      tags: ["react"],
      views: 10
    },
    {
      id: 2,
      title: "JS",
      content: "Nội dung JS...",
      tags: ["js"],
      views: 5
    }
  ];

  const post = posts.find(p => p.id === Number(id));
  if (!post) return <div>Not found</div>;

  post.views++;

  const related = posts.filter(
    p => p.id !== post.id && p.tags.some(t => post.tags.includes(t))
  );

  return (
    <div style={{ padding: 20 }}>
      <button onClick={() => window.history.back()}>← Back</button>

      <h1>{post.title}</h1>
      <p>Lượt xem: {post.views}</p>

      <div style={{ margin: "20px 0" }}>{post.content}</div>

      <h3>Bài liên quan</h3>
      {related.map(p => <div key={p.id}>{p.title}</div>)}
    </div>
  );
}