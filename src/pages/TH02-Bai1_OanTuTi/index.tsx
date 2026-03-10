import { useState } from "react";

export default function OanTuTi() {

  const choices = ["Búa", "Kéo", "Bao"];
  const [history, setHistory] = useState<any[]>([]);

  const playGame = (playerChoice: string) => {

    const randomIndex = Math.floor(Math.random() * 3);
    const computerChoice = choices[randomIndex];

    let result = "";

    if (playerChoice === computerChoice) {
      result = "Hòa";
    }
    else if (
      (playerChoice === "Búa" && computerChoice === "Kéo") ||
      (playerChoice === "Kéo" && computerChoice === "Bao") ||
      (playerChoice === "Bao" && computerChoice === "Búa")
    ) {
      result = "Thắng";
    }
    else {
      result = "Thua";
    }

    const newRound = {
      player: playerChoice,
      computer: computerChoice,
      result: result
    };

    setHistory([newRound, ...history]);
  };

  const resetHistory = () => {
    setHistory([]);
  };

  const getColor = (result: string) => {
    if (result === "Thắng") return "green";
    if (result === "Thua") return "red";
    return "orange";
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Trò chơi Oẳn Tù Tì</h1>

      <div style={{ marginBottom: 20 }}>
        <button onClick={() => playGame("Búa")}>Búa</button>
        <button onClick={() => playGame("Kéo")} style={{ marginLeft: 10 }}>Kéo</button>
        <button onClick={() => playGame("Bao")} style={{ marginLeft: 10 }}>Bao</button>

        <button
          onClick={resetHistory}
          style={{ marginLeft: 20, background: "red", color: "white" }}
        >
          Reset
        </button>
      </div>

      <h2>Lịch sử trận đấu</h2>

      <table
        style={{
          border: "1px solid black",
          borderCollapse: "collapse"
        }}
      >
        <thead>
          <tr>
            <th style={{ border: "1px solid black", padding: 10 }}>Người chơi</th>
            <th style={{ border: "1px solid black", padding: 10 }}>Máy</th>
            <th style={{ border: "1px solid black", padding: 10 }}>Kết quả</th>
          </tr>
        </thead>

        <tbody>
          {history.map((item, index) => (
            <tr key={index}>
              <td style={{ border: "1px solid black", padding: 10 }}>{item.player}</td>
              <td style={{ border: "1px solid black", padding: 10 }}>{item.computer}</td>
              <td
                style={{
                  border: "1px solid black",
                  padding: 10,
                  color: getColor(item.result),
                  
                }}
              >
                {item.result}
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}