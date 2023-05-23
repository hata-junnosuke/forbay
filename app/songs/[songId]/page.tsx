import Link from 'next/link'
import { notFound } from 'next/navigation'
import { format } from 'date-fns'
import { ArrowUturnLeftIcon } from '@heroicons/react/24/solid'
import type { Database } from '../../../database.types'

import Youtube from '../../components/youtube'

type Song = Database['public']['Tables']['songs']['Row']

type PageProps = {
  params: {
    songId: string
  }
}

async function fetchSong(songId: string) {
  console.log(songId)
  const res = await fetch(
    `${process.env.url}/rest/v1/songs?id=eq.${songId}&select=*`,
    {
      headers: new Headers({
        apikey: process.env.apikey as string,
      }),
      cache: 'no-store',
      // 13.4以降必要。サーバー側でのキャッシュを無効化する
      // cache: 'force-cache',
    }
  )
  //   if (!res.ok) {
  //     throw new Error('Failed to fetch data in server')
  //   }
  const songs: Song[] = await res.json()
  return songs[0]
}

export default async function SongDetailPage({ params }: PageProps) {
  console.log(params)
  const song = await fetchSong(params.songId)
  if (!song) return notFound()
  return (
    <div className="mt-16 p-8">
      <Youtube song={song}/>
      <p>
        <strong className="mr-3">Task ID:</strong> {song.id}
      </p>
      <p>
        <strong className="mr-3">Title:</strong> {song.name}
      </p>
      <p>
        <strong className="mr-3">Content:</strong> {song.explanation}
      </p>
      <Link href={`/songs`}>
        <ArrowUturnLeftIcon className="mt-3 h-6 w-6 cursor-pointer text-blue-500" />
      </Link>
    </div>
  )
}
// export async function generateStaticParams() {
//   const res = await fetch(`${process.env.url}/rest/v1/songs?select=*`, {
//     headers: new Headers({
//       apikey: process.env.apikey as string,
//     }),
//   })
//   const songs: Song[] = await res.json()

//   return songs.map((song) => ({
//     songId: song.id.toString(),
//   }))
// }

