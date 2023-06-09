import SongListStatic from '../components/song-list-static'

export default function SongLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className="flex">
      <aside className={`h-[calc(100vh-56px)] w-1/4 bg-gray-200  text-blue-500 p-2`}>
        {/*@ts-ignore*/}
        <SongListStatic />
        {/* <div className="flex justify-center">
          <RefreshBtn />
        </div> */}
      </aside>
      <main className="flex flex-1 justify-center">{children}</main>
    </section>
  )
}
