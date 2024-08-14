import React, { useEffect, useState } from 'react';
import './App.css';
import { getTasks } from './API';
import { handleEditTask, handleDeleteTask, handleAddTask } from './button';

function App() {
  const [tasks, setTasks] = useState([]);
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskData, setEditTaskData] = useState({ title: '', description: '', status: '' });
  const [newTaskData, setNewTaskData] = useState({ title: '', description: '', status: 'pending' });

  useEffect(() => {
    getTasks().then(data => {
      console.log('Данные задач:', data);
      setTasks(data);
    });
  }, []);

  const handleEditClick = (task) => {
    setEditTaskId(task.id);
    setEditTaskData({ title: task.title, description: task.description, status: task.status });
  };

  const handleSaveClick = () => {
    handleEditTask(editTaskId, editTaskData, setTasks);
    setEditTaskId(null); // Сбросить состояние редактирования после сохранения
  };

  const handleAddTaskClick = () => {
    handleAddTask(newTaskData, setTasks);
    setNewTaskData({ title: '', description: '', status: 'pending' }); // Сброс данных новой задачи
  };

  return (
    <div className='body'>
      <h1>Список задач</h1>
      <div className='main_table'>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Заголовок</th>
              <th>Описание</th>
              <th>Статус</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(task => (
              <tr key={task.id}>
                <td>{task.id}</td>
                <td>
                  {task.id === editTaskId ? (
                    <input 
                      type='text' 
                      value={editTaskData.title} 
                      onChange={(e) => setEditTaskData({ ...editTaskData, title: e.target.value })} 
                    />
                  ) : (
                    task.title
                  )}
                </td>
                <td>
                  {task.id === editTaskId ? (
                    <input 
                      type='text' 
                      value={editTaskData.description} 
                      onChange={(e) => setEditTaskData({ ...editTaskData, description: e.target.value })} 
                    />
                  ) : (
                    task.description
                  )}
                </td>
                <td>
                  {task.id === editTaskId ? (
                    <select 
                      value={editTaskData.status} 
                      onChange={(e) => setEditTaskData({ ...editTaskData, status: e.target.value })}>
                      <option value='completed'>Выполнена</option>
                      <option value='pending'>Невыполнена</option>
                    </select>
                  ) : (
                    (task.status === 'completed' ? 'Выполнена' : 'Невыполнена')
                  )}
                </td>
                <td>
                  {task.id === editTaskId ? (
                    <button onClick={handleSaveClick}>Сохранить</button>
                  ) : (
                    <>
                      <button className='edit_button' onClick={() => handleEditClick(task)}>Редактировать</button>
                      <button className='delete_button' onClick={() => handleDeleteTask(task.id, setTasks)}>Удалить</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='add_task'>
        <h2>Добавить новую задачу</h2>
        <input 
          type='text' 
          placeholder='Заголовок' 
          value={newTaskData.title} 
          onChange={(e) => setNewTaskData({ ...newTaskData, title: e.target.value })} 
        />
        <input 
          type='text' 
          placeholder='Описание' 
          value={newTaskData.description} 
          onChange={(e) => setNewTaskData({ ...newTaskData, description: e.target.value })} 
        />
        <select 
          value={newTaskData.status} 
          onChange={(e) => setNewTaskData({ ...newTaskData, status: e.target.value })}>
          <option value='completed'>Выполнена</option>
          <option value='pending'>Невыполнена</option>
        </select>
        <button className='add_button' onClick={handleAddTaskClick}>Добавить задачу</button>
      </div>
    </div>
  );
}

export default App;