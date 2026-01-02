const Task = require('../models/Task');
const User = require('../models/User');


const getTasks = async (req, res, next) => {
    try {
        const tasks = await Task.find({ user: req.user.id });
        res.status(200).json(tasks);
    } catch (error) {
        next(error);
    }
};


const createTask = async (req, res, next) => {
    try {
        if (!req.body.text) {
            res.status(400);
            throw new Error('Please add a text field');
        }

        const task = await Task.create({
            text: req.body.text,
            user: req.user.id,
        });

        res.status(200).json(task);
    } catch (error) {
        next(error);
    }
};

const updateTask = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            res.status(400);
            throw new Error('Task not found');
        }

       
        if (!req.user) {
            res.status(401);
            throw new Error('User not found');
        }

    
        if (task.user.toString() !== req.user.id) {
            res.status(401);
            throw new Error('User not authorized');
        }

        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
            }
        );

        res.status(200).json(updatedTask);
    } catch (error) {
        next(error);
    }
};

const deleteTask = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            res.status(400);
            throw new Error('Task not found');
        }

        if (!req.user) {
            res.status(401);
            throw new Error('User not found');
        }

       
        if (task.user.toString() !== req.user.id) {
            res.status(401);
            throw new Error('User not authorized');
        }

        await task.deleteOne();

        res.status(200).json({ id: req.params.id });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
};
