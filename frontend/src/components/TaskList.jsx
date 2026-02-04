import './TaskList.css';

function TaskList({ tasks, onEdit, onDelete, onStatusChange }) {
    if (tasks.length === 0) {
        return (
            <div className="empty-state">
                <p>No tasks yet. Create your first task to get started!</p>
            </div>
        );
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <div className="task-list">
            <h2>My Tasks ({tasks.length})</h2>
            <div className="tasks-grid">
                {tasks.map((task) => (
                    <div key={task._id} className={`task-card ${task.status}`}>
                        <div className="task-header">
                            <h3>{task.title}</h3>
                            <span className={`status-badge ${task.status}`}>
                                {task.status}
                            </span>
                        </div>

                        {task.description && (
                            <p className="task-description">{task.description}</p>
                        )}

                        <div className="task-meta">
                            <small>Created: {formatDate(task.createdAt)}</small>
                            {task.updatedAt !== task.createdAt && (
                                <small>Updated: {formatDate(task.updatedAt)}</small>
                            )}
                        </div>

                        <div className="task-actions">
                            <button
                                onClick={() =>
                                    onStatusChange(
                                        task._id,
                                        task.status === 'pending' ? 'completed' : 'pending'
                                    )
                                }
                                className="btn-status"
                            >
                                Mark as {task.status === 'pending' ? 'Completed' : 'Pending'}
                            </button>
                            <button onClick={() => onEdit(task)} className="btn-edit">
                                Edit
                            </button>
                            <button onClick={() => onDelete(task._id)} className="btn-delete">
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TaskList;
