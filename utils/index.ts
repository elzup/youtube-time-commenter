import { Comment } from '../types'

export const timeStr = (time: number) => {
  const times: string[] = []
  const h = Math.floor(time / 3600)
  const m = Math.floor((time % 3600) / 60)
  const s = Math.floor(time % 60)

  if (h > 0) {
    times.push(`${h}`)
  }
  times.push(`${m}`.padStart(times.length > 0 ? 2 : 1, '0'))
  times.push(`${s}`.padStart(times.length > 0 ? 2 : 1, '0'))

  return times.join(':')
}

export const timeNum = (timeStr: string) => {
  const times = timeStr.split(':')
  const ss = times.pop()
  const mm = times.pop()
  const hh = times.pop()
  let time = 0

  time += Number(ss)
  if (mm) {
    time += Number(mm) * 60
  }
  if (hh) {
    time += Number(hh) * 3600
  }

  return time
}

export const commentsToText = (comments: Comment[], timeNewLine = false) =>
  comments
    .map(
      (comment) =>
        `${timeStr(comment.time)}${timeNewLine ? '\n' : ' '}${comment.text}`
    )
    .join('\n\n')
