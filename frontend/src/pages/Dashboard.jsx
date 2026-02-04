import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { taskAPI } from '../services/api';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import './Dashboard.css';

function Dashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [showForm, setShowForm] = useState(false);
    const [editingTask, setEditingTask] = useState(null);

    useEffect(() => {
        // Check if user is logged in
        const userData = localStorage.getItem('user');
        if (!userData) {
            navigate('/login');
            return;
        }
        setUser(JSON.parse(userData));
        fetchTasks();
    }, [navigate]);

    const fetchTasks = async () => {
        try {
            setLoading(true);
            const response = await taskAPI.getMyTasks();
            setTasks(response.data.data);
        } catch (error) {
            showMessage('error', 'Failed to fetch tasks');
            if (error.response?.status === 401) {
                handleLogout();
            }
        } finally {
            setLoading(false);
        }
    };

    const handleCreateTask = async (taskData) => {
        try {
            await taskAPI.createTask(taskData);
            showMessage('success', 'Task created successfully!');
            setShowForm(false);
            fetchTasks();
        } catch (error) {
            showMessage('error', error.response?.data?.error || 'Failed to create task');
        }
    };

    const handleUpdateTask = async (id, taskData) => {
        try {
            await taskAPI.updateTask(id, taskData);
            showMessage('success', 'Task updated successfully!');
            setEditingTask(null);
            fetchTasks();
        } catch (error) {
            showMessage('error', error.response?.data?.error || 'Failed to update task');
        }
    };

    const handleDeleteTask = async (id) => {
        if (!window.confirm('Are you sure you want to delete this task?')) {
            return;
        }

        try {
            await taskAPI.deleteTask(id);
            showMessage('success', 'Task deleted successfully!');
            fetchTasks();
        } catch (error) {
            showMessage('error', error.response?.data?.error || 'Failed to delete task');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    const showMessage = (type, text) => {
        setMessage({ type, text });
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <div className="header-content">
                    <h1>Task Manager</h1>
                    <div className="user-info">
                        <span className="user-name">
                            {user?.name}
                            {user?.role === 'admin' && <span className="badge">Admin</span>}
                        </span>
                        <button onClick={handleLogout} className="btn-secondary">
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            <main className="dashboard-main">
                {message.text && (
                    <div className={`message ${message.type}`}>{message.text}</div>
                )}

                <div className="dashboard-actions">
                    <button
                        onClick={() => {
                            setShowForm(!showForm);
                            setEditingTask(null);
                        }}
                        className="btn-primary"
                    >
                        {showForm ? 'Cancel' : '+ New Task'}
                    </button>
                </div>

                {showForm && (
                    <TaskForm
                        onSubmit={handleCreateTask}
                        onCancel={() => setShowForm(false)}
                    />
                )}

                {editingTask && (
                    <TaskForm
                        task={editingTask}
                        onSubmit={(data) => handleUpdateTask(editingTask._id, data)}
                        onCancel={() => setEditingTask(null)}
                    />
                )}

                <TaskList
                    tasks={tasks}
                    onEdit={setEditingTask}
                    onDelete={handleDeleteTask}
                    onStatusChange={(id, status) =>
                        handleUpdateTask(id, { status })
                    }
                />
            </main>
        </div>
    );
}

export default Dashboard;
