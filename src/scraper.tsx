import axios from "axios"
import * as cheerio from "cheerio"

const url = "https://news.ycombinator.com"

export type Article = {
  rank: number
  title: string
  url: string
}

export async function scrapeHackerNews(): Promise<Article[]> {
  try {
    const { data } = await axios.get(url)
    const $ = cheerio.load(data)
    const articles: Article[] = []

    $(".athing").each((index, element) => {
      if (index >= 10) return

      const titleElement = $(element).find(".titleline > a")
      const title = titleElement.text()
      const url = titleElement.attr("href") || ""
      const rank = index + 1

      articles.push({ rank, title, url })
    })

    // Kembalikan datanya
    return articles
  } catch (error) {
    console.error("❌ Gagal melakukan scraping:", error)

    return []
  }
}
