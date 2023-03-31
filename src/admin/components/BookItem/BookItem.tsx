import { removeBook, updateBook } from '@/redux/features/book/booksSlice'
import { useAppDispatch } from '@/redux/store'
import { IBook } from '@/types'

export default function BookItem({ id, title, picture, publishedDate }: IBook) {
  const dispatch = useAppDispatch()
  const bookChange: Omit<IBook, 'id'> = {
    picture: 'https://picsum.photos/id/3/200/300.webp',
    isbn: '9789-0-6-0',
    title: 'Updated title',
    description:
      'Irure excepteur aliqua minim et minim. Anim deserunt nisi eu sunt commodo aliquip ut velit.',
    author: '2',
    category: '1',
    publisher: '10',
    status: 'borrowed',
    publishedDate: '1971-02-08'
  }

  const handleRemoveBook = (id: string) => {
    dispatch(removeBook(id))
  }

  const handleUpdateBook = (id: string, newData: Omit<IBook, 'id'>) => {
    dispatch(updateBook({ id, newData }))
  }

  return (
    <div key={id} className="relative">
      <img src={picture} alt={title} width={200} height={300} className="w-full" />
      <h4 className="mt-4 text-xl font-bold capitalize">{title}</h4>
      <p>Published date: {publishedDate}</p>
      <div className="flex gap-4 mt-4">
        <button className="button button-outlined" onClick={() => handleRemoveBook(id)}>
          Remove
        </button>
        <button className="button button-outlined" onClick={() => handleUpdateBook(id, bookChange)}>
          Update
        </button>
      </div>
    </div>
  )
}
