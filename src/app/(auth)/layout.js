export default function AuthLayout({ children }) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-peach-light p-4">
            <div className="w-full max-w-md p-8 bg-ivory-pure rounded-xl shadow-md border border-dusty-light/20">
                {children}
            </div>
        </div>
    );
}
