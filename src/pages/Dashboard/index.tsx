import { Card, Row, Col, Statistic, Timeline } from "antd";

export default function Dashboard() {
  const data = [
    { week: "T1", value: 3 },
    { week: "T2", value: 5 },
    { week: "T3", value: 4 },
    { week: "T4", value: 6 }
  ];

  const weight = [60, 59.5, 59, 58.8];

  return (
    <div style={{ padding: 20 }}>
      {/* CARD */}
      <Row gutter={16}>
        <Col span={6}><Card><Statistic title="Buổi tập" value={20} /></Card></Col>
        <Col span={6}><Card><Statistic title="Calo" value={5000} /></Card></Col>
        <Col span={6}><Card><Statistic title="Streak" value={7} /></Card></Col>
        <Col span={6}><Card><Statistic title="Goal %" value={75} /></Card></Col>
      </Row>

      {/* BAR CHART (FAKE) */}
      <Card title="Buổi tập theo tuần" style={{ marginTop: 20 }}>
        <div style={{ display: "flex", alignItems: "flex-end", height: 200 }}>
          {data.map(d => (
            <div key={d.week} style={{ marginRight: 20, textAlign: "center" }}>
              <div
                style={{
                  width: 40,
                  height: d.value * 20,
                  background: "#1890ff"
                }}
              />
              <div>{d.week}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* LINE CHART (FAKE) */}
      <Card title="Cân nặng" style={{ marginTop: 20 }}>
        <div style={{ display: "flex", alignItems: "flex-end", height: 200 }}>
          {weight.map((w, i) => (
            <div key={i} style={{ marginRight: 20 }}>
              <div
                style={{
                  width: 10,
                  height: w * 2,
                  background: "red"
                }}
              />
            </div>
          ))}
        </div>
      </Card>

      {/* TIMELINE */}
      <Card title="Buổi tập gần đây" style={{ marginTop: 20 }}>
        <Timeline>
          <Timeline.Item>Chạy bộ 30 phút</Timeline.Item>
          <Timeline.Item>Gym 45 phút</Timeline.Item>
        </Timeline>
      </Card>
    </div>
  );
}