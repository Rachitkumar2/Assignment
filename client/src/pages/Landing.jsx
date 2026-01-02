import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';

const Landing = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
            <div className="animate-fade-in max-w-3xl">
                <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
                    Manage your tasks <br />
                    <span className="bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
                        with elegance
                    </span>
                </h1>
                <p className="text-xl text-slate-500 dark:text-slate-400 mb-10 max-w-2xl mx-auto">
                    Stay organized, focused, and get more done with our premium task management solution.
                    Simple, fast, and beautiful.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        to="/register"
                        className="btn-primary text-lg px-8 py-3 rounded-xl shadow-lg shadow-primary-500/30 w-full sm:w-auto flex items-center justify-center gap-2"
                    >
                        Start for free <ArrowRight size={20} />
                    </Link>
                    <Link
                        to="/login"
                        className="px-8 py-3 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-medium w-full sm:w-auto bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-colors"
                    >
                        Sign in
                    </Link>
                </div>

                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                    {[
                        { title: 'Smart Organization', desc: 'Categorize and filter your tasks with ease.' },
                        { title: 'Secure & fast', desc: 'Enterprise-grade security with lightning fast updates.' },
                        { title: 'Premium Design', desc: 'A beautiful interface that makes work a joy.' }
                    ].map((feature, i) => (
                        <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
                            <div className="w-10 h-10 rounded-lg bg-primary-50 dark:bg-slate-800 text-primary-600 dark:text-primary-400 flex items-center justify-center mb-4">
                                <CheckCircle size={20} />
                            </div>
                            <h3 className="font-bold text-slate-800 dark:text-white mb-2">{feature.title}</h3>
                            <p className="text-slate-500 dark:text-slate-400 text-sm">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Landing;
