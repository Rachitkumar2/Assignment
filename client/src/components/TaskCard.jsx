import { Trash2, CheckCircle, Circle } from 'lucide-react';
import { motion } from 'framer-motion';

const TaskCard = ({ task, onDelete, onToggle }) => {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            whileHover={{ scale: 1.02 }}
            className={`p-4 rounded-xl border shadow-sm transition-colors duration-200 
        ${task.completed ? 'bg-slate-50 border-slate-200 dark:bg-slate-900 dark:border-slate-800' : 'bg-white border-slate-200 hover:shadow-md dark:bg-slate-800 dark:border-slate-700 dark:hover:bg-slate-750'}
      `}
        >
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-start gap-3 flex-1">
                    <button
                        onClick={() => onToggle(task._id)}
                        className={`mt-1 transition-colors ${task.completed ? 'text-green-500' : 'text-slate-300 hover:text-primary-500 dark:text-slate-600 dark:hover:text-primary-400'}`}
                    >
                        {task.completed ? <CheckCircle size={20} /> : <Circle size={20} />}
                    </button>

                    <p className={`text-slate-800 dark:text-slate-200 ${task.completed ? 'line-through text-slate-400 dark:text-slate-600' : ''}`}>
                        {task.text}
                    </p>
                </div>

                <button
                    onClick={() => onDelete(task._id)}
                    className="text-slate-400 hover:text-red-500 transition-colors p-1 rounded-full hover:bg-red-50"
                >
                    <Trash2 size={18} />
                </button>
            </div>

            <div className="mt-3 text-xs text-slate-400 pl-8">
                {new Date(task.createdAt).toLocaleDateString()}
            </div>
        </motion.div>
    );
};

export default TaskCard;
