import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import Input from '../components/Input';
import { UserPlus } from 'lucide-react';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const { name, email, password, confirmPassword } = formData;

    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.id]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        setError('');
        try {
            await register(name, email, password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-[80vh]">
            <div className="w-full max-w-md p-8 bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-100 dark:border-slate-800 animate-slide-up transition-colors">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 mb-4">
                        <UserPlus size={24} />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Create Account</h2>
                    <p className="text-slate-500 dark:text-slate-400 mt-2">Join us and start managing tasks</p>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm border border-red-100 dark:border-red-900/50">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        id="name"
                        type="text"
                        label="Full Name"
                        value={name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                    />
                    <Input
                        id="email"
                        type="email"
                        label="Email Address"
                        value={email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        required
                    />
                    <Input
                        id="password"
                        type="password"
                        label="Password"
                        value={password}
                        onChange={handleChange}
                        placeholder="••••••••"
                        required
                    />
                    <Input
                        id="confirmPassword"
                        type="password"
                        label="Confirm Password"
                        value={confirmPassword}
                        onChange={handleChange}
                        placeholder="••••••••"
                        required
                    />

                    <button
                        type="submit"
                        className="w-full btn-primary mt-6 flex justify-center items-center gap-2"
                    >
                        <span>Create Account</span>
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-slate-500">
                    Already have an account?{' '}
                    <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium">
                        Sign in
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Signup;
