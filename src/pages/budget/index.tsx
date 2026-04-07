import React, { useEffect, useState } from "react";

type PlanItem = { id:number; price:number; };

export default function Budget() {
  const [plan,setPlan] = useState<PlanItem[]>([]);

  useEffect(()=>{
    const saved = JSON.parse(localStorage.getItem("plan") || "[]");
    setPlan(saved);
  },[]);

  const total = plan.reduce((s,p)=>s+p.price,0);
  const categories = {
    "Ăn uống": total*0.3,
    "Di chuyển": total*0.2,
    "Lưu trú": total*0.5
  }

  return (
    <div style={{ padding:20 }}>
      <h1 style={{ textAlign:"center" }}>Ngân sách</h1>
      <p style={{ fontWeight:"bold" }}>Tổng chi phí: {total.toLocaleString()} VND</p>

      {Object.entries(categories).map(([k,v])=>(
        <div key={k} style={{ marginBottom:15 }}>
          <div style={{ display:"flex", justifyContent:"space-between" }}>
            <span>{k}</span>
            <span>{v.toLocaleString()} VND</span>
          </div>
          <div style={{ background:"#eee", height:20, borderRadius:10, marginTop:5 }}>
            <div style={{ background:"#4CAF50", height:20, borderRadius:10, width:`${Math.min(v/total*100,100)}%` }} />
          </div>
        </div>
      ))}

      {total>5000000 && <p style={{ color:"red", fontWeight:"bold" }}>Cảnh báo: Vượt ngân sách!</p>}
    </div>
  )
}