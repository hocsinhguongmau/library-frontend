import Welcome from '@/components/Welcome/'
import Intro from '@/components/Intro/'
import BookList from '@/components/BookList/'
import NewsLetter from '@/components/NewsLetter/'

export default function Home() {
  return (
    <>
      <Welcome />
      <Intro />
      <BookList />
      <NewsLetter />
    </>
  )
}
