type Props = {
  classes: string
}

export default function Loading({ classes }: Props) {
  return (
    <div className={`${classes} bouncing-loader`} aria-busy="true" aria-label="Loading...">
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}
