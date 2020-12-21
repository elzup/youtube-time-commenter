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
  const [comments, setComments] = useLocalStorage<Comment[]>('comments', [])
  const [text, setText] = useState<string>('')

  const addComment = (text: string) => {
    const ids = comments.map((c) => Number(c.id))
    const maxId = _.max(ids) || 0
    const id = String(maxId + 1)
    const newComment: Comment = { id, text, time }

    updateComment(newComment)
  }

  const updateComment = (comment: Comment) => {
    const newComments = _.keyBy(comments, 'id')

    newComments[comment.id] = comment

    const res = _.sortBy(_.values(newComments), ['time', 'id'])

    setComments(res)
  }
  const deleteComment = (commentId: string) => {
    const newComments = _.keyBy(comments, 'id')

    delete newComments[commentId]
    setComments(_.values(newComments))
  }

  return (
    <Layout>
      <TextField
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
            multiline
            fullWidth
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div style={{ display: 'grid', justifyContent: 'flex-end' }}>
            <Button
              disabled={text === ''}
              onClick={() => {
                addComment(text)
                setText('')
              }}
            >
              保存
            </Button>
          </div>
          {Object.entries(comments).map(([id, comment]) => (
            <CommentBox
              key={id}
              comment={comment}
              updateComment={(comment) => {
                updateComment(comment)
              }}
              deleteComment={() => {
                deleteComment(comment.id)
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
