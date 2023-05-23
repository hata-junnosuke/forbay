import Link from 'next/link'
import type { Database } from '../../database.types'

type Song = Database['public']['Tables']['songs']['Row']

async function fetchSongs() {
  const res = await fetch(`${process.env.url}/rest/v1/songs?select=*`, {
    headers: new Headers({
      apikey: process.env.apikey as string,
    }),
    cache: 'no-store',
    // サーバー側でのキャッシュを無効化する
    // cache: 'force-cache',
  })
  if (!res.ok) {
    throw new Error('Failed to fetch data in server')
  }
  const songs: Song[] = await res.json()
  return songs
}

export default async function SongListStatic() {
  const songs = await fetchSongs()
  return (
    <div className="p-4 ">
      <p className="mb-4 pb-3 text-xl font-medium underline underline-offset-4  text-black">
        応援歌一覧
      </p>
      <ul>
        {songs?.map((song) => (
          <li key={song.id} className="my-1 text-base">
            {/* prefetchは13.4以降つけるようになった */}
            <Link prefetch={false} href={`/songs/${song.id}`}>
              {song.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
