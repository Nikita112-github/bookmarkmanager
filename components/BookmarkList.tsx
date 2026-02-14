'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'

interface Bookmark {
  id: string
  url: string
  title: string
  created_at: string
  user_id: string
}

export default function BookmarkList() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
  const [url, setUrl] = useState('')
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    fetchBookmarks()
    
    // Set up real-time subscription
    const channel = supabase
      .channel('bookmarks_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'bookmarks',
        },
        async (payload) => {
          console.log('Real-time event:', payload)
          
          // Verify this change is for the current user
          const { data: { user } } = await supabase.auth.getUser()
          if (!user) return

          if (payload.eventType === 'INSERT') {
            const newBookmark = payload.new as Bookmark
            if (newBookmark.user_id === user.id) {
              setBookmarks((current) => {
                // Avoid duplicates
                if (current.some(b => b.id === newBookmark.id)) {
                  return current
                }
                return [newBookmark, ...current]
              })
            }
          } else if (payload.eventType === 'DELETE') {
            const deletedBookmark = payload.old as Bookmark
            if (deletedBookmark.user_id === user.id) {
              setBookmarks((current) => 
                current.filter((b) => b.id !== deletedBookmark.id)
              )
            }
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  async function fetchBookmarks() {
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      setLoading(false)
      return
    }

    const { data, error } = await supabase
      .from('bookmarks')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching bookmarks:', error)
    } else {
      setBookmarks(data || [])
    }
    setLoading(false)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    
    if (!url || !title) return

    setSubmitting(true)
    
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      alert('You must be logged in to add bookmarks')
      setSubmitting(false)
      return
    }

    const { error } = await supabase
      .from('bookmarks')
      .insert([{ url, title, user_id: user.id }])

    if (error) {
      console.error('Error adding bookmark:', error)
      alert('Failed to add bookmark')
    } else {
      setUrl('')
      setTitle('')
    }
    
    setSubmitting(false)
  }

  async function handleDelete(id: string) {
    const { error } = await supabase
      .from('bookmarks')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting bookmark:', error)
      alert('Failed to delete bookmark')
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="text-gray-600">Loading bookmarks...</div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Add New Bookmark</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter bookmark title"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              required
            />
          </div>
          <div>
            <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
              URL
            </label>
            <input
              type="url"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              required
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors"
          >
            {submitting ? 'Adding...' : 'Add Bookmark'}
          </button>
        </div>
      </form>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          My Bookmarks ({bookmarks.length})
        </h2>
        
        {bookmarks.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <p className="text-gray-600">No bookmarks yet. Add your first bookmark above!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {bookmarks.map((bookmark) => (
              <div
                key={bookmark.id}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-center justify-between"
              >
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate">
                    {bookmark.title}
                  </h3>
                  <a
                    href={bookmark.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-sm truncate block"
                  >
                    {bookmark.url}
                  </a>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(bookmark.created_at).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(bookmark.id)}
                  className="ml-4 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
