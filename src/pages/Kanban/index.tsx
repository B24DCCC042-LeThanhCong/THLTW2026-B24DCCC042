import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const columns = {
  todo: 'Cần làm',
  inprogress: 'Đang làm',
  done: 'Hoàn thành'
};

export default function Kanban() {
  const [tasks, setTasks] = useState<any[]>([]);

  useEffect(() => {
    setTasks(JSON.parse(localStorage.getItem('TASKS') || '[]'));
  }, []);

  const save = (data: any[]) => {
    setTasks(data);
    localStorage.setItem('TASKS', JSON.stringify(data));
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const newTasks = [...tasks];
    const task = newTasks.find(t => t.id === result.draggableId);

    if (task) {
      task.status = result.destination.droppableId;
      save(newTasks);
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div style={{ display: 'flex', gap: 16 }}>
        {Object.entries(columns).map(([key, title]) => (
          <Droppable droppableId={key} key={key}>
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps} style={{ width: '33%' }}>
                <Card title={title}>
                  {tasks
                    .filter(t => t.status === key)
                    .map((task, index) => (
                      <Draggable draggableId={task.id} index={index} key={task.id}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                              padding: 10,
                              marginBottom: 10,
                              background: '#f0f0f0',
                              ...provided.draggableProps.style
                            }}
                          >
                            <b>{task.title}</b>
                            <div>{task.deadline}</div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </Card>
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
}