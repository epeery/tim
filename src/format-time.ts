export default function formatTime(duration: number) {
  const seconds = Math.floor((duration / 1000) % 60)
  const minutes = Math.floor((duration / (1000 * 60)) % 60)
  const hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

  const hoursString = (hours < 10) ? '0' + hours : hours
  const minutesString = (minutes < 10) ? '0' + minutes : minutes
  const secondsString = (seconds < 10) ? '0' + seconds : seconds

  return hoursString + ':' + minutesString + ':' + secondsString
}
