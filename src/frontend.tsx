import React, { useState, useEffect } from "react"
import ReactDOM from "react-dom/client"
import type { Article } from "./scraper"
import "./index.css"

function App() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchArticles() {
      try {
        const response = await fetch("/top-articles")
        if (!response.ok) {
          throw new Error("Gagal mengambil data dari server")
        }
        const data = await response.json()
        setArticles(data.articles)
      } catch (err) {
        setError("Tidak dapat memuat artikel. Pastikan server API berjalan.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [])

  if (loading) {
    return (
      <div className="text-center text-xl font-semibold">
        📡 Menghubungi API...
      </div>
    )
  }

  if (error) {
    return <div className="text-center text-red-400 text-xl">{error}</div>
  }

  return (
    <div className="max-w-2xl w-full mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-6 text-orange-400">
        🔥 Hacker News Top 10
      </h1>
      <div className="bg-gray-800/50 rounded-lg shadow-lg p-2">
        <ol className="list-decimal list-inside space-y-2">
          {articles.map((article) => (
            <li
              key={article.rank}
              className="p-3 border-b border-gray-700 last:border-b-0 hover:bg-gray-700/50 rounded-md transition-colors"
            >
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg text-white hover:underline"
              >
                {article.title}
              </a>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

const rootElement = document.getElementById("root")
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}
