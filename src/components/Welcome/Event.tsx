import { Link } from 'react-router-dom'

export default function Event() {
  return (
    <Link to="/">
      <img
        src="/assets/images/library-events.png"
        alt="Event"
        width={410}
        height={361}
        className="w-full"
        title="Library Events"
        aria-label="Library Events"
      />
    </Link>
  )
}
