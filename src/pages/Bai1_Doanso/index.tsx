import { useState } from "react";
import { Button, Input, Card } from "antd";

export default function Bai1DoanSo() {
  const [randomNumber, setRandomNumber] = useState(
    Math.floor(Math.random() * 100) + 1
  );
  const [guess, setGuess] = useState("");
  const [attempts, setAttempts] = useState(10);
  const [message, setMessage] = useState("");

  const handleGuess = () => {
    if (attempts <= 0) return;
    const num = Number(guess);
    const newAttempts = attempts - 1;
    setAttempts(newAttempts);

    if (num < randomNumber) setMessage("Bạn đoán quá thấp!");
    else if (num > randomNumber) setMessage("Bạn đoán quá cao!");
    else {
      setMessage("🎉 Chúc mừng! Bạn đã đoán đúng!");
      return;
    }

    if (newAttempts === 0) {
      setMessage(`Bạn đã hết lượt! Số đúng là ${randomNumber}`);
    }
  };

  const resetGame = () => {
    setRandomNumber(Math.floor(Math.random() * 100) + 1);
    setAttempts(10);
    setGuess("");
    setMessage("");
  };

  return (
    <div
      style={{
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
        padding: 20,
      }}
    >
      {/* CSS chỉ áp dụng cho trang này */}
      <style>
        {`
          .custom-btn {
            background-color: #c40000 !important;
            border-color: #c40000 !important;
            color: white !important;
          }
          .custom-btn:hover {
            background-color: #a30000 !important;
            border-color: #a30000 !important;
          }
        `}
      </style>

      <Card title="🎯 Bài 1: Game đoán số" style={{ maxWidth: 400 }}>
        <p>Bạn còn {attempts} lượt đoán</p>

        <Input
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          placeholder="Nhập số từ 1 đến 100"
        />

        <br /><br />

        <Button className="custom-btn" onClick={handleGuess}>
          Đoán
        </Button>

        <Button onClick={resetGame} style={{ marginLeft: 10 }}>
          Chơi lại
        </Button>

        <p style={{ marginTop: 10 }}>{message}</p>
      </Card>
    </div>
  );
}