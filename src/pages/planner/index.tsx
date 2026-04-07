import React, { useEffect, useState } from "react";

type PlanItem = {
  id: number;
  name: string;
  price: number;
  day: number;
};

export default function Planner() {
  const [plan, setPlan] = useState<PlanItem[]>([]);
  const [day, setDay] = useState<number>(1);
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>(0);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("plan") || "[]");
    setPlan(saved);
  }, []);

  const savePlan = (newPlan: PlanItem[]) => {
    setPlan(newPlan);
    localStorage.setItem("plan", JSON.stringify(newPlan));
  };

  const addItem = () => {
    if (!name || price <= 0) return alert("Nhập đầy đủ tên và giá!");
    const newItem: PlanItem = { id: Date.now(), name, price, day };
    savePlan([...plan, newItem]);
    setName("");
    setPrice(0);
  };

  const removeItem = (id: number) => {
    savePlan(plan.filter(p => p.id !== id));
  };

  const moveItem = (index: number, up: boolean) => {
    if ((up && index === 0) || (!up && index === plan.length - 1)) return;
    const newPlan = [...plan];
    const tmp = newPlan[index];
    newPlan[index] = newPlan[up ? index - 1 : index + 1];
    newPlan[up ? index - 1 : index + 1] = tmp;
    savePlan(newPlan);
  };

  const total = plan.reduce((s, p) => s + p.price, 0);

  return (
    <div style={{ padding:20 }}>
      <h1 style={{ textAlign:"center" }}>Lịch trình du lịch</h1>
      <div style={{ display:"flex", gap:10, flexWrap:"wrap", marginBottom:20 }}>
        <input placeholder="Tên điểm đến" value={name} onChange={e=>setName(e.target.value)} />
        <input type="number" placeholder="Chi phí" value={price} onChange={e=>setPrice(Number(e.target.value))} />
        <input type="number" placeholder="Ngày" min={1} value={day} onChange={e=>setDay(Number(e.target.value))} />
        <button style={{ background:"#2196F3", color:"white", border:"none", padding:"5px 10px", borderRadius:5 }} onClick={addItem}>Thêm</button>
      </div>

      <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
        {plan.map((p, idx)=>(
          <div key={p.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", border:"1px solid #ccc", padding:10, borderRadius:5, background:"#f9f9f9" }}>
            <div>
              <strong>Ngày {p.day}: {p.name}</strong> - {p.price.toLocaleString()} VND
            </div>
            <div>
              <button onClick={()=>moveItem(idx,true)}>↑</button>
              <button onClick={()=>moveItem(idx,false)}>↓</button>
              <button onClick={()=>removeItem(p.id)} style={{ marginLeft:5, color:"red" }}>Xóa</button>
            </div>
          </div>
        ))}
      </div>
      <h3 style={{ marginTop:20 }}>Tổng chi phí: {total.toLocaleString()} VND</h3>
      {total>5000000 && <p style={{ color:"red", fontWeight:"bold" }}>Vượt ngân sách!</p>}
    </div>
  )
}