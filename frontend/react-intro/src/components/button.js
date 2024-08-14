export const handleEditTask = (taskId, updatedTaskData, setTasks) => {
    console.log(`Редактировать задачу с ID: ${taskId}`, updatedTaskData);
    
    fetch(`http://127.0.0.1:8000/api/tasks/${taskId}/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTaskData),
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(err => {
                throw new Error(`Ошибка сети: ${err.message}`);
            });
        }
        return response.json();
    })
    .then(updatedTask => {
        setTasks(prevTasks => 
            prevTasks.map(task => (task.id === updatedTask.id ? updatedTask : task))
        );
        console.log(`Задача с ID: ${taskId} обновлена`, updatedTask);
    })
    .catch(error => {
        console.error('Ошибка при редактировании задачи:', error);
    });
};

export const handleDeleteTask = (taskId, setTasks) => {
    console.log(`Удалить задачу с ID: ${taskId}`);
    fetch(`http://127.0.0.1:8000/api/tasks/${taskId}/`, {
        method: 'DELETE',
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка сети');
            }
            setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
            console.log(`Задача с ID: ${taskId} удалена`);
        })
        .catch(error => {
            console.error('Ошибка при удалении задачи:', error);
        });
};

export const handleAddTask = (newTaskData, setTasks) => {
    console.log('Добавить новую задачу:', newTaskData);
    
    fetch('http://127.0.0.1:8000/api/tasks/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTaskData),
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(err => {
                throw new Error(`Ошибка сети: ${err.message}`);
            });
        }
        return response.json();
    })
    .then(addedTask => {
        setTasks(prevTasks => [...prevTasks, addedTask]);
        console.log('Задача добавлена:', addedTask);
    })
    .catch(error => {
        console.error('Ошибка при добавлении задачи:', error);
    });
};