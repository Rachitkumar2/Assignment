import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { User, Mail, Calendar } from 'lucide-react';

const Profile = () => {
    const { user } = useContext(AuthContext);

    if (!user) return null;

    return (
        <div className="max-w-2xl mx-auto flex justify-center items-center min-h-[60vh]">
            <div className="w-full bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden animate-slide-up transition-colors">
                <div className="bg-primary-600 dark:bg-primary-700 h-32 relative">
                    <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
                        <div className="w-32 h-32 rounded-full border-4 border-white dark:border-slate-900 bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                            <User size={64} />
                        </div>
                    </div>
                </div>

                <div className="pt-20 pb-8 px-8 text-center">
                    <h1 className="text-2xl font-bold text-slate-800 dark:text-white">{user.name}</h1>
                    <p className="text-slate-500 dark:text-slate-400">Member</p>

                    <div className="mt-8 flex flex-col gap-4 max-w-sm mx-auto">
                        <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                            <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-700 flex items-center justify-center text-primary-500 dark:text-primary-400 shadow-sm">
                                <Mail size={20} />
                            </div>
                            <div className="text-left">
                                <p className="text-xs text-slate-400 dark:text-slate-500 font-medium uppercase tracking-wider">Email</p>
                                <p className="text-slate-700 dark:text-slate-200 font-medium">{user.email}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                            <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-700 flex items-center justify-center text-primary-500 dark:text-primary-400 shadow-sm">
                                <Calendar size={20} />
                            </div>
                            <div className="text-left">
                                <p className="text-xs text-slate-400 dark:text-slate-500 font-medium uppercase tracking-wider">Joined</p>
                                <p className="text-slate-700 dark:text-slate-200 font-medium">
                                    {new Date(user.createdAt || Date.now()).toLocaleDateString(undefined, {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
