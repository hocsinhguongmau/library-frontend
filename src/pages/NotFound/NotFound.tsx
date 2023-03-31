import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="py-32">
      <div className="flex flex-row items-center justify-center gap-4">
        <span className="font-bold text-9xl">4</span>
        <div className="circle-animation">
          <div className="circle">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <span className="font-bold text-9xl">4</span>
      </div>
      <h2 className="mt-4 text-4xl font-bold text-center" role="heading">
        Page not found
      </h2>
      <h3 className="mt-4 text-xl text-center text-gray" role="alert" aria-live="polite">
        Sorry, we could not find the page you are looking for{' '}
      </h3>
      <p className="mt-10 text-center">
        <Link to="/" className="button button-filled" aria-labelledby="back-to-home">
          <span id="back-to-home">Back to home</span>
        </Link>
      </p>
    </div>
  )
}
