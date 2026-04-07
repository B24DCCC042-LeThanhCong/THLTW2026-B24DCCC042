import React, { useState } from "react";

type Destination = {
  id:number;
  name:string;
  description:string;
  time:string;
  food:number;
  transport:number;
  stay:number;
  rating:number;
  img:string;
};

export default function Admin() {
  const [data,setData] = useState<Destination[]>([]);
  const [name,setName]=useState("");
  const [desc,setDesc]=useState("");
  const [time,setTime]=useState("");
  const [food,setFood]=useState(0);
  const [transport,setTransport]=useState(0);
  const [stay,setStay]=useState(0);
  const [rating,setRating]=useState(0);
  const [img,setImg]=useState("");

  const add = ()=>{
    if(!name) return alert("Nhập tên");
    setData([...data,{
      id:Date.now(),
      name,
      description:desc,
      time,
      food,
      transport,
      stay,
      rating,
      img
    }])
  }

  const remove=(id:number)=>{
    setData(data.filter(d=>d.id!==id))
  }

  return (
    <div style={{ padding:20 }}>
      <h1 style={{ textAlign:"center" }}>Quản trị điểm đến</h1>
      <div style={{ display:"flex", flexWrap:"wrap", gap:10, marginBottom:20 }}>
        <input placeholder="Tên" value={name} onChange={e=>setName(e.target.value)} />
        <input placeholder="Mô tả" value={desc} onChange={e=>setDesc(e.target.value)} />
        <input placeholder="Thời gian" value={time} onChange={e=>setTime(e.target.value)} />
        <input type="number" placeholder="Ăn uống" value={food} onChange={e=>setFood(Number(e.target.value))} />
        <input type="number" placeholder="Di chuyển" value={transport} onChange={e=>setTransport(Number(e.target.value))} />
        <input type="number" placeholder="Lưu trú" value={stay} onChange={e=>setStay(Number(e.target.value))} />
        <input type="number" placeholder="Rating" value={rating} onChange={e=>setRating(Number(e.target.value))} />
        <input placeholder="Link ảnh" value={img} onChange={e=>setImg(e.target.value)} />
        <button style={{ background:"#2196F3", color:"white", border:"none", padding:"5px 10px", borderRadius:5 }} onClick={add}>Thêm</button>
      </div>

      <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
        {data.map(d=>(
          <div key={d.id} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", border:"1px solid #ccc", padding:10, borderRadius:5, background:"#f9f9f9" }}>
            <div>
              <strong>{d.name}</strong> - {d.description} - {d.time} - Food:{d.food} - Transport:{d.transport} - Stay:{d.stay} - Rating:{d.rating}
            </div>
            <button style={{ color:"red" }} onClick={()=>remove(d.id)}>Xóa</button>
          </div>
        ))}
      </div>
    </div>
  )
}