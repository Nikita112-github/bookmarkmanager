import Header from '@/components/Header'
import BookmarkList from '@/components/BookmarkList'
import { createClient } from '@/utils/supabase/server'

export default async function Home() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {user ? (
          <BookmarkList />
        ) : (
          <div className="text-center py-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Welcome to Smart Bookmark Manager
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Sign in with Google to start saving and organizing your bookmarks
            </p>
            <div className="bg-white p-8 rounded-lg shadow-md max-w-md mx-auto">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Features:</h3>
              <ul className="text-left space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  Save bookmarks with titles and URLs
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  Private bookmarks - only you can see them
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  Real-time sync across all your devices
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  Easy delete functionality
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  Secure Google OAuth authentication
                </li>
              </ul>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-600 text-sm">
            Built with Next.js, Supabase, and Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  )
}
