import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Progress, List, Tag } from 'antd';

export default function Dashboard() {
  const [tasks, setTasks] = useState<any[]>([]);

  useEffect(() => {
    setTasks(JSON.parse(localStorage.getItem('TASKS') || '[]'));
  }, []);

  const total = tasks.length;
  const done = tasks.filter(t => t.status === 'done').length;
  const overdue = tasks.filter(
    t => new Date(t.deadline) < new Date() && t.status !== 'done'
  ).length;

  const percent = total ? Math.round((done / total) * 100) : 0;

  const upcoming = [...tasks]
    .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
    .slice(0, 5);

  const recent = [...tasks].slice(-5).reverse();

  return (
    <div>
      <Row gutter={16}>
        <Col span={6}>
          <Card bordered={false}>
            <h4>Tổng Task</h4>
            <h1>{total}</h1>
          </Card>
        </Col>

        <Col span={6}>
          <Card bordered={false}>
            <h4>Hoàn thành</h4>
            <h1 style={{ color: 'green' }}>{done}</h1>
          </Card>
        </Col>

        <Col span={6}>
          <Card bordered={false}>
            <h4>Quá hạn</h4>
            <h1 style={{ color: 'red' }}>{overdue}</h1>
          </Card>
        </Col>

        <Col span={6}>
          <Card bordered={false}>
            <h4>Tiến độ</h4>
            <Progress percent={percent} />
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: 20 }}>
        <Col span={12}>
          <Card title="Sắp đến hạn">
            <List
              dataSource={upcoming}
              renderItem={(item) => (
                <List.Item>
                  <div>
                    <b>{item.title}</b>
                    <div>{item.deadline}</div>
                    <Tag color={
                      item.priority === 'high'
                        ? 'red'
                        : item.priority === 'medium'
                        ? 'orange'
                        : 'green'
                    }>
                      {item.priority}
                    </Tag>
                  </div>
                </List.Item>
              )}
            />
          </Card>
        </Col>

        <Col span={12}>
          <Card title="Task mới">
            <List
              dataSource={recent}
              renderItem={(item) => (
                <List.Item>
                  <div>
                    <b>{item.title}</b>
                    <div>{item.deadline}</div>
                    <Tag>{item.status}</Tag>
                  </div>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}