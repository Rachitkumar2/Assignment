import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import { AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import toast from 'react-hot-toast';

const Dashboard = () => {
    const { user, loading: authLoading } = useContext(AuthContext);
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // all, active, completed
    const [search, setSearch] = useState('');

    useEffect(() => {
        if (!authLoading && !user) navigate('/login');
    }, [user, authLoading, navigate]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const config = {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                };
                const res = await axios.get('http://localhost:5000/api/tasks', config);
                setTasks(res.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        if (user) {
            fetchTasks();
        }
    }, [user]);

    const addTask = async (text) => {
        try {
            const config = {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            };
            const res = await axios.post('http://localhost:5000/api/tasks', { text }, config);
            setTasks([...tasks, res.data]);
            toast.success('Task created successfully');
        } catch (error) {
            console.error(error);
            toast.error('Failed to create task');
        }
    };

    const deleteTask = async (id) => {
        try {
            const config = {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            };
            await axios.delete(`http://localhost:5000/api/tasks/${id}`, config);
            setTasks(tasks.filter((task) => task._id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    const toggleTask = async (id) => {
        try {
            const taskToToggle = tasks.find((task) => task._id === id);
            const config = {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            };
            const res = await axios.put(
                `http://localhost:5000/api/tasks/${id}`,
                { ...taskToToggle, completed: !taskToToggle.completed },
                config
            );
            setTasks(tasks.map((task) => (task._id === id ? res.data : task)));
        } catch (error) {
            console.error(error);
        }
    };

    const filteredTasks = tasks
        .filter((task) => {
            if (filter === 'active') return !task.completed;
            if (filter === 'completed') return task.completed;
            return true;
        })
        .filter((task) => task.text.toLowerCase().includes(search.toLowerCase()));

    if (authLoading || loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-800 dark:text-white">My Tasks</h1>
                <p className="text-slate-500 dark:text-slate-400">Manage your daily goals and todos</p>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 p-6 mb-8">
                <TaskForm onAdd={addTask} />

                <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mt-6">
                    <div className="relative w-full sm:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={18} />
                        <input
                            type="text"
                            placeholder="Search tasks..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-lg focus:ring-2 focus:ring-primary-100 dark:focus:ring-primary-900 outline-none text-slate-600 dark:text-white placeholder-slate-400 dark:placeholder-slate-500"
                        />
                    </div>

                    <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                        {['all', 'active', 'completed'].map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-4 py-1.5 rounded-md text-sm font-medium capitalize transition-all ${filter === f
                                    ? 'bg-white dark:bg-slate-700 text-primary-600 dark:text-primary-400 shadow-sm'
                                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
                                    }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid gap-4">
                <AnimatePresence>
                    {filteredTasks.length > 0 ? (
                        filteredTasks.map((task) => (
                            <TaskCard
                                key={task._id}
                                task={task}
                                onDelete={deleteTask}
                                onToggle={toggleTask}
                            />
                        ))
                    ) : (
                        <div className="text-center py-12 text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-900 rounded-xl border border-dashed border-slate-200 dark:border-slate-800">
                            {search ? 'No tasks found matching your search' : 'No tasks yet. Add one above!'}
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Dashboard;
