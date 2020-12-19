import React, { useState } from 'react'
import { NextPage } from 'next'
import { TextField, Typography } from '@material-ui/core'
import ReactPlayer from 'react-player'
import Layout from '../components/Layout'
import { useLocalStorage } from '../utils/useLocalStorage'

const IndexPage: NextPage = () => {
  const [url, setUrl] = useLocalStorage<string>('url', '')
  const [time, setTime] = useState<number>(0)

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
    </Layout>
  )
}

export default IndexPage
