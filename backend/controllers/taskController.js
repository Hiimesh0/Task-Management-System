const Task = require('../models/Task');
const { ErrorResponse } = require('../utils/errorHandler');

/**
 * @desc    Create new task
 * @route   POST /api/v1/tasks
 * @access  Private
 */
exports.createTask = async (req, res, next) => {
    try {
        const { title, description, status } = req.body;

        // Validate input
        if (!title) {
            return next(new ErrorResponse('Please provide a task title', 400));
        }

        // Create task with authenticated user
        const task = await Task.create({
            title,
            description,
            status: status || 'pending',
            createdBy: req.user._id,
        });

        res.status(201).json({
            success: true,
            data: task,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Get all tasks for logged in user
 * @route   GET /api/v1/tasks
 * @access  Private
 */
exports.getMyTasks = async (req, res, next) => {
    try {
        const tasks = await Task.find({ createdBy: req.user._id })
            .sort({ createdAt: -1 })
            .populate('createdBy', 'name email');

        res.status(200).json({
            success: true,
            count: tasks.length,
            data: tasks,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Get single task
 * @route   GET /api/v1/tasks/:id
 * @access  Private
 */
exports.getTask = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id).populate(
            'createdBy',
            'name email'
        );

        if (!task) {
            return next(new ErrorResponse('Task not found', 404));
        }

        // Check if user owns the task or is admin
        if (
            task.createdBy._id.toString() !== req.user._id.toString() &&
            req.user.role !== 'admin'
        ) {
            return next(
                new ErrorResponse('Not authorized to access this task', 403)
            );
        }

        res.status(200).json({
            success: true,
            data: task,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Update task
 * @route   PUT /api/v1/tasks/:id
 * @access  Private (Owner only)
 */
exports.updateTask = async (req, res, next) => {
    try {
        let task = await Task.findById(req.params.id);

        if (!task) {
            return next(new ErrorResponse('Task not found', 404));
        }

        // Check if user owns the task
        if (task.createdBy.toString() !== req.user._id.toString()) {
            return next(new ErrorResponse('Not authorized to update this task', 403));
        }

        // Update task
        task = await Task.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({
            success: true,
            data: task,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Delete task
 * @route   DELETE /api/v1/tasks/:id
 * @access  Private (Owner only)
 */
exports.deleteTask = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return next(new ErrorResponse('Task not found', 404));
        }

        // Check if user owns the task
        if (task.createdBy.toString() !== req.user._id.toString()) {
            return next(new ErrorResponse('Not authorized to delete this task', 403));
        }

        await task.deleteOne();

        res.status(200).json({
            success: true,
            data: {},
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Get all tasks (Admin only)
 * @route   GET /api/v1/tasks/admin/all
 * @access  Private/Admin
 */
exports.getAllTasks = async (req, res, next) => {
    try {
        const tasks = await Task.find()
            .sort({ createdAt: -1 })
            .populate('createdBy', 'name email role');

        res.status(200).json({
            success: true,
            count: tasks.length,
            data: tasks,
        });
    } catch (error) {
        next(error);
    }
};
