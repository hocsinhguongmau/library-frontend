import { ImLocation } from 'react-icons/im'
import { AiFillIdcard, AiFillSchedule } from 'react-icons/ai'

export default function Intro() {
  return (
    <section>
      <div className="section-wrapper">
        <div className="flex justify-center gap-4">
          <div>
            <h2 className="text-2xl text-primary">
              Public Library <br />
              <span className="text-secondary">EDUCATES, ENTERTAINS, & EMPOWERS</span>
              <br /> Our community.
            </h2>
            <p className="mt-4 text-xl">
              We offer a range of traditional and innovative library resources - physical and
              downloadable books and audiobooks, computers, WiFi, meeting rooms, databases, research
              tools, storytimes, and tutoring - plus bike repair stations, a makerspace, museum
              passes, and a variety of classes.
            </p>
          </div>
          <img
            src="/assets/images/map.png"
            alt="Locations"
            width="447"
            height="280"
            className="shrink-0 grow-0"
            role="presentation"
          />
        </div>
        <div className="mt-8">
          <nav>
            <ul className="flex justify-center gap-4 ">
              <li>
                <a href="/" className="button button-filled button-large">
                  <ImLocation /> Find your branch
                </a>
              </li>
              <li>
                <a href="/" className="button button-filled button-large">
                  <AiFillIdcard /> Get a card
                </a>
              </li>
              <li>
                <a href="/" className="button button-filled button-large">
                  <AiFillSchedule /> See our events
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </section>
  )
}
