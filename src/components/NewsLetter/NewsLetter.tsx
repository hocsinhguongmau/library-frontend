export default function NewsLetter() {
  return (
    <section>
      <div className="flex items-center justify-between section-wrapper">
        <div>
          <h2 className="text-5xl text-primary">
            Sign up
            <span className="block mt-3 text-3xl italic uppercase text-secondary">
              For our newsletter
            </span>
          </h2>
        </div>
        <form className="flex gap-4">
          <input
            id="fullname"
            name="fullname"
            type="text"
            placeholder="Full name"
            className="self-start w-full input-large"
          />
          <input
            id="email"
            name="email"
            type="text"
            placeholder="Email"
            className="self-start w-full input-large"
          />
          <input type="submit" value="Submit" className="button button-large button-filled" />
        </form>
      </div>
    </section>
  )
}
