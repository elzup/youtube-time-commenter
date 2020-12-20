import React, { useState } from 'react'
import { NextPage } from 'next'
import { Button, TextField, Typography } from '@material-ui/core'
import ReactPlayer from 'react-player'
import Layout from '../components/Layout'
import { useLocalStorage } from '../utils/useLocalStorage'

type Comment = {
  id: number
  time: number
  text: string
}

const IndexPage: NextPage = () => {
  const [url, setUrl] = useLocalStorage<string>('url', '')
  const [time, setTime] = useState<number>(0)
  const [index, setIndex] = useState<number>(1)
  const [comments, setComments] = useState<Record<number, Comment>>({})

  const addComment = (text: string) => {
    const newComments = { ...comments }

    newComments[index] = { time, text, id: index }
    setIndex((id) => id + 1)
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
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <Button>保存</Button>
      {Object.entries(comments).map((comment, id) => (
        <div key={id}>
          <TextField
            variant="outlined"
            multiline
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <Button>保存</Button>
        </div>
      ))}
    </Layout>
  )
}

export default IndexPage
