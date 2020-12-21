import React, { useState } from 'react'
import { NextPage } from 'next'
import { Button, TextField, Typography } from '@material-ui/core'
import ReactPlayer from 'react-player'
import Layout from '../components/Layout'
import { useLocalStorage } from '../utils/useLocalStorage'
import { Comment } from '../types'
import CommentBox from './CommentBox'

const timeStr = (time: number) => {
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

const commentsToText = (comments: Comment[]) =>
  comments
    .map((comment) => `${timeStr(comment.time)} ${comment.text}`)
    .join('\n\n')

const IndexPage: NextPage = () => {
  const [url, setUrl] = useLocalStorage<string>('url', '')
  const [time, setTime] = useState<number>(0)
  const [comments, setComments] = useLocalStorage<Record<string, Comment>>(
    'comments',
    {}
  )
  const [text, setText] = useState<string>('')

  const addComment = (text: string) => {
    const ids = Object.keys(comments)
      .map(Number)
      .sort((a, b) => a - b)

    console.log(ids)
    const id = String((ids.pop() || 0) + 1)

    const newComment: Comment = { id, text, time }

    updateComment(id, newComment)
  }

  const updateComment = (id: string, comment: Comment) => {
    const newComments = { ...comments }

    newComments[id] = comment
    setComments(newComments)
  }

  return (
    <Layout>
      <TextField
        variant="outlined"
        label="URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <ReactPlayer
        controls
        url={url}
        onProgress={({ playedSeconds }) => setTime(playedSeconds)}
      />
      <Typography>Time: {time}</Typography>
      <TextField
        variant="outlined"
        multiline
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button
        onClick={() => {
          addComment(text)
          setText('')
        }}
      >
        保存
      </Button>
      {Object.entries(comments).map(([id, comment]) => (
        <CommentBox
          key={id}
          comment={comment}
          updateComment={(comment) => {
            updateComment(id, comment)
          }}
        />
      ))}
      <TextField
        aria-readonly
        multiline
        value={commentsToText(Object.values(comments))}
      />
    </Layout>
  )
}

export default IndexPage
