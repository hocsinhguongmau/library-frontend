import { useAppDispatch } from '@/redux/store'
import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'

import { addNewBook } from '@/redux/features/book/booksSlice'

export default function AddBook() {
  const dispatch = useAppDispatch()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm()

  const onSubmit: SubmitHandler<any> = (data) => {
    const id = uuidv4()
    dispatch(addNewBook({ id, ...data }))
    reset()
  }
  const [open, setOpen] = useState(false)

  const toggleForm = () => {
    setOpen(!open)
  }

  return (
    <>
      <p>
        <button className="button button-outlined" onClick={toggleForm}>
          Add new book
        </button>
      </p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`max-w-xl mx-auto ${open ? '' : 'hidden'}`}>
        <div className="form-row">
          <label htmlFor="isbn">ISBN:</label>
          <input type="text" id="isbn" {...register('isbn', { required: true })} />
        </div>
        <p className="error">{errors.isbn && <span>ISBN is required</span>}</p>
        <div className="form-row">
          <label htmlFor="title">Title:</label>

          <input type="text" id="title" {...register('title', { required: true })} />
        </div>
        <p className="error">{errors.title && <span>Title is required</span>}</p>
        <div className="form-row">
          <label htmlFor="picture">Picture:</label>
          <input type="text" id="picture" {...register('picture', { required: true })} />
        </div>
        <p className="error">{errors.picture && <span>Picture is required</span>}</p>
        <div className="form-row">
          <label htmlFor="description">Description:</label>
          <textarea id="description" {...register('description')} cols={30} rows={10}></textarea>
        </div>
        <div className="form-row">
          <label htmlFor="publisher">Publisher:</label>
          <select id="publisher" {...register('publisher')}>
            <option value="1">Penguin Random House</option>
            <option value="2">HarperCollins</option>
            <option value="3">Simon & Schuster</option>
            <option value="4">Macmillan Publishers</option>
          </select>
        </div>
        <div className="form-row">
          <label htmlFor="author">Author:</label>
          <select id="author" {...register('author')}>
            <option value="1">Louisa Calderon</option>
            <option value="2">Hampton Kennedy</option>
            <option value="3">Atkinson Duncan</option>
            <option value="4">Erica Glover</option>
            <option value="6">Christian Ramsey</option>
          </select>
        </div>
        <div className="form-row">
          <label htmlFor="category">Category:</label>
          <select id="category" {...register('category')}>
            <option value="1">Fiction</option>
            <option value="2">Non-Fiction</option>
            <option value="3">Children</option>
            <option value="4">Young Adult</option>
            <option value="6">Science Fiction</option>
            <option value="7">Fantasy</option>
            <option value="8">Romance</option>
          </select>
        </div>
        <div className="form-row">
          <label htmlFor="status">Status:</label>
          <select id="status" defaultValue={'available'} {...register('status')}>
            <option value="available">Available</option>
            <option value="borrowed">Borrowed</option>
          </select>
        </div>
        <div className="form-row">
          <label htmlFor="publishedDate">Published date:</label>
          <input
            type="text"
            id="publishedDate"
            {...register('publishedDate', { required: true })}
          />
        </div>
        <p className="error">{errors.publishedDate && <span>Date is required</span>}</p>
        <button className="mt-4 button button-outlined" type="submit">
          Add Book
        </button>
      </form>
    </>
  )
}
