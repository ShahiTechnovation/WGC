import { getNews } from '@/lib/airtable'
import NewsClient from './client'

export const dynamic = 'force-dynamic'

export default async function NewsPage() {
  const posts = await getNews()
  return <NewsClient posts={posts} />
}
