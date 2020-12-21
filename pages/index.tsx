import React, { useState } from 'react'
import { NextPage } from 'next'
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core'
import ReactPlayer from 'react-player'
import _ from 'lodash'
import Layout from '../components/Layout'
import { useLocalStorage } from '../utils/useLocalStorage'
import { Comment } from '../types'
import { commentsToText, timeStr } from '../utils'
import CommentBox from './CommentBox'

const IndexPage: NextPage = () => {
  const [url, setUrl] = useLocalStorage<string>('url', '')
  const [time, setTime] = useState<number>(0)
  const [timeNewLine, setTimeNewLine] = useLocalStorage<boolean>(
    'timeNewLine',
    true
  )
  const [comments, setComments] = useLocalStorage<Record<string, Comment>>(
    'comments',
    {}
  )
  const [text, setText] = useState<string>('')

  const addComment = (text: string) => {
    const ids = Object.keys(comments)
      .map(Number)
      .sort((a, b) => a - b)

    const id = String((ids.pop() || 0) + 1)
    const newComment: Comment = { id, text, time }

    updateComment(newComment)
  }

  const updateComment = (comment: Comment) => {
    const newComments = [...Object.values(comments), comment]

    _.sortBy(newComments, ['time', 'id'])

    setComments(_.keyBy(newComments, 'id'))
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
      <div>
        <Typography variant="h5">コメントフォーム</Typography>
        <Typography>Time: {timeStr(time)}</Typography>
      </div>
      <Grid container spacing={1}>
        <Grid item xs={6}>
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
                updateComment(comment)
              }}
            />
          ))}
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h5">生成テキスト</Typography>
          <FormControlLabel
            style={{ display: 'block' }}
            control={
              <Checkbox onChange={(v, checked) => setTimeNewLine(checked)} />
            }
            label="改行する"
          />
          <TextField
            aria-readonly
            multiline
            value={commentsToText(Object.values(comments), timeNewLine)}
          />
        </Grid>
      </Grid>
    </Layout>
  )
}

export default IndexPage
