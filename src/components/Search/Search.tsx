type Props = {
  classes: string
}

export default function Search({ classes }: Props) {
  return (
    <input
      type="text"
      className={classes}
      placeholder="Search our catalog"
      aria-label="Search our catalog"
    />
  )
}
