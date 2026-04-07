import React, { useState } from "react";

type Destination = {
  id: number;
  name: string;
  type: "biển" | "núi" | "thành phố";
  price: number;
  rating: number;
  img: string;
};

const data: Destination[] = [
  { id: 1, name: "Đà Nẵng", type: "biển", price: 3000000, rating: 4.5, img: "anh" },
  { id: 2, name: "Sa Pa", type: "núi", price: 2500000, rating: 4.2, img: "anh" },
  { id: 3, name: "Hà Nội", type: "thành phố", price: 2000000, rating: 4.0, img: "anh" },
  { id: 4, name: "Nha Trang", type: "biển", price: 2800000, rating: 4.3, img: "anh" },
];

export default function Home() {
  const [filter, setFilter] = useState<string>("all");
  const [sort, setSort] = useState<"price" | "rating" | "none">("none");

  let list = data.filter(d => filter === "all" ? true : d.type === filter);

  if (sort === "price") list = list.sort((a,b)=>a.price-b.price);
  else if (sort === "rating") list = list.sort((a,b)=>b.rating-a.rating);

  const addToPlan = (item: Destination) => {
    const plan = JSON.parse(localStorage.getItem("plan") || "[]");
    localStorage.setItem("plan", JSON.stringify([...plan, item]));
    alert("Đã thêm vào lịch trình!");
  }

  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ textAlign: "center", marginBottom: 20 }}>Khám phá điểm đến</h1>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 20 }}>
        <div>
          <label>Lọc: </label>
          <select onChange={e=>setFilter(e.target.value)} value={filter}>
            <option value="all">Tất cả</option>
            <option value="biển">Biển</option>
            <option value="núi">Núi</option>
            <option value="thành phố">Thành phố</option>
          </select>
        </div>
        <div>
          <label>Sort: </label>
          <select onChange={e=>setSort(e.target.value as any)} value={sort}>
            <option value="none">Mặc định</option>
            <option value="price">Giá</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </div>

      <div style={{ display:"flex", flexWrap:"wrap", gap:20, justifyContent:"center" }}>
        {list.map(d => (
          <div key={d.id} style={{ 
            border:"1px solid #ccc", 
            borderRadius:10, 
            width:200, 
            padding:10, 
            textAlign:"center",
            boxShadow:"2px 2px 8px rgba(0,0,0,0.1)"
          }}>
            <img src={d.img} alt={d.name} width="100%" style={{ borderRadius:10, height:120, objectFit:"cover" }} />
            <h4 style={{ margin: "10px 0 5px 0" }}>{d.name}</h4>
            <p style={{ margin: "2px 0" }}>Loại: {d.type}</p>
            <p style={{ margin: "2px 0" }}>Giá: {d.price.toLocaleString()} VND</p>
            <p style={{ margin: "2px 0" }}>Rating: {d.rating}</p>
            <button 
              onClick={()=>addToPlan(d)}
              style={{ padding:"5px 10px", borderRadius:5, background:"#4CAF50", color:"white", border:"none", cursor:"pointer" }}
            >Thêm</button>
          </div>
        ))}
      </div>
    </div>
  );
}