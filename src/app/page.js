import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-dusty-light via-white to-peach-light flex flex-col justify-between">
      {/* Header / Navbar */}
      <header className="px-6 py-4 flex justify-between items-center bg-ivory-pure backdrop-blur-md border-b border-dusty-light/20 sticky top-0 z-50">
        <div className="flex items-center space-x-2">
          <span className="text-2xl">🎓</span>
          <span className="text-xl font-bold text-gray-800">Cox Academy</span>
        </div>
        <div className="space-x-4">
          <Link href="/login" className="text-sm font-semibold text-gray-600 hover:text-dusty-medium transition">
            Sign In
          </Link>
          <Link href="/signup" className="px-4 py-2 text-sm font-semibold text-ivory-pure bg-dusty-medium hover:bg-dusty-dark rounded-full transition shadow-sm">
            Get Started
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-grow flex flex-col items-center justify-center text-center px-6 py-12 max-w-4xl mx-auto">
        <div className="inline-flex items-center space-x-2 bg-peach-light text-peach-dark px-3 py-1 rounded-full text-xs font-semibold mb-6 animate-pulse">
          <span>✨</span>
          <span>Now powered by Cloud Firestore</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-dusty-dark tracking-tight mb-6 font-serif">
          A Secure, Unified Hub for Your <span className="text-peach-dark">Homeschool Journey</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mb-10 leading-relaxed">
          Manage lessons, track attendance, organize student portfolios, and submit assignments effortlessly—all in one beautifully synchronized family space.
        </p>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-16">
          <Link href="/signup" className="px-8 py-3 text-base font-semibold text-white bg-gradient-to-r from-dusty-medium to-peach-medium hover:from-dusty-dark hover:to-peach-dark rounded-xl shadow-md transition transform hover:-translate-y-0.5">
            Create Household Account
          </Link>
          <Link href="/login" className="px-8 py-3 text-base font-semibold text-gray-700 bg-ivory-pure hover:bg-ivory bg-ivory-pure border border-dusty-light/30 rounded-xl shadow-sm transition transform hover:-translate-y-0.5">
            Access My Portal
          </Link>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-left">
          <div className="bg-ivory-pure p-6 rounded-2xl shadow-sm border border-dusty-light/20">
            <span className="text-3xl mb-4 block">📚</span>
            <h3 className="font-bold text-gray-800 text-lg mb-2">Subject Portals</h3>
            <p className="text-gray-500 text-sm">Organize courses, lessons, and assignments with dynamic, custom color-coding.</p>
          </div>
          <div className="bg-ivory-pure p-6 rounded-2xl shadow-sm border border-dusty-light/20">
            <span className="text-3xl mb-4 block">🎨</span>
            <h3 className="font-bold text-gray-800 text-lg mb-2">Student Portfolios</h3>
            <p className="text-gray-500 text-sm">Upload handwritten work, log extracurriculars, and securely attach files using Cloud Storage.</p>
          </div>
          <div className="bg-ivory-pure p-6 rounded-2xl shadow-sm border border-dusty-light/20">
            <span className="text-3xl mb-4 block">🏡</span>
            <h3 className="font-bold text-gray-800 text-lg mb-2">Household Control</h3>
            <p className="text-gray-500 text-sm">Complete tenant isolation. Keep multiple child, parent, and external teacher profiles synchronized.</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-dusty-light/20 bg-ivory-pure text-center text-xs text-gray-400">
        <p>© 2026 Cox Academy. Built with Firebase and Next.js.</p>
      </footer>
    </div>
  );
}
