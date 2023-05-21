'use client'
import { useRouter } from 'next/navigation'

type Song =  {
  start: number | null,
  end: number | null,
}

interface RefreshBtnProps {
  song: Song,
}

export default function RefreshBtn({song}: RefreshBtnProps) {
  const router = useRouter()
  return (
    <button
      className="rounded bg-indigo-600 px-3 py-1 font-medium text-white hover:bg-indigo-700"
      onClick={() => {
        router.refresh()
      }}
    >
      {song.start}
    </button>
  )
}
