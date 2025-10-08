import { Elysia } from "elysia"
import { scrapeHackerNews, type Article } from "./scraper"

let cachedArticles: Article[] = []
console.log("Cache diinisialisasi, saat ini kosong.")

async function updateCache() {
  console.log("🔄 Memperbarui cache...")
  const newArticles = await scrapeHackerNews()

  // Hanya perbarui cache jika hasil scraping tidak kosong
  if (newArticles.length > 0) {
    cachedArticles = newArticles
    console.log(
      "✅ Cache berhasil diperbarui dengan",
      cachedArticles.length,
      "artikel."
    )
  } else {
    console.log("⚠️ Gagal memperbarui cache, data lama tetap digunakan.")
  }
}

const app = new Elysia()

  .get("/top-articles", () => {
    return {
      message: "Data diambil dari cache",
      timestamp: new Date().toISOString(),
      articles: cachedArticles,
    }
  })

  .listen(3000)

console.log(
  `🦊 Server Elysia berjalan di http://${app.server?.hostname}:${app.server?.port}`
)

updateCache()

setInterval(updateCache, 600000)
