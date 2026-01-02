const Input = ({ label, id, error, ...props }) => {
    return (
        <div className="space-y-1">
            {label && (
                <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {label}
                </label>
            )}
            <input
                id={id}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all duration-200 bg-white dark:bg-slate-800 dark:border-slate-700 dark:text-white
          ${error ? 'border-red-500 focus:ring-red-200 dark:focus:ring-red-900' : 'border-slate-300 dark:border-slate-700'}
        `}
                {...props}
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
    );
};

export default Input;
