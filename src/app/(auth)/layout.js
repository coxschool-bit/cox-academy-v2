export default function AuthLayout({ children }) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-md border border-gray-100">
                {children}
            </div>
        </div>
    );
}
