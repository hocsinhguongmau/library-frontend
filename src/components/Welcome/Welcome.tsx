import { Link } from 'react-router-dom'

import Banner from './Banner'
import Event from './Event'

export default function Welcome() {
  return (
    <section aria-labelledby="main-heading">
      <div className="section-wrapper">
        <Link to="/" aria-label="Go to home page">
          <img
            src="/assets/images/logo.png"
            className="mx-auto"
            width={121}
            height={141}
            alt="Logo"
          />
        </Link>
        <h1 id="main-heading" className="mt-8 text-4xl text-center uppercase text-primary">
          Welcome to the <span className="text-secondary">Public Library!</span>
        </h1>
        <div className="grid grid-cols-12 gap-4 mt-8">
          <div className="col-span-7">
            <Banner />
          </div>
          <div className="col-span-5">
            <aside>
              <Event />
            </aside>
          </div>
        </div>
      </div>
    </section>
  )
}
