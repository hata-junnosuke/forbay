// DBの型をインポート
import type { Database } from '../../database.types'
// 日付の型を設定
import { format } from 'date-fns'

type Song = Database['public']['Tables']['songs']['Row']

async function fetchSongs() {
  // await new Promise((resolve) => setTimeout(resolve, 2000))
  // RestでAPIを叩く
  const res = await fetch(`${process.env.url}/rest/v1/songs?select=*`, {
    headers: new Headers({
      apikey: process.env.apikey as string,
    }),
    cache: 'no-store',
  })
  if (!res.ok) {
    throw new Error('Failed to fetch data in server')
  }
  const songs: Song[] = await res.json()
  return songs
}

export default async function SongsList() {
  const songs = await fetchSongs()
  return (
    <div>
      <p className="my-4 pb-3 text-xl font-medium underline underline-offset-4">
        Songs
      </p>
      <ul className="m-3">
        {songs.map((song) => (
          <li key={song.id}>
            <p> {song.name}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
