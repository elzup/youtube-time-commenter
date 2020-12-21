import { Button, Card, TextField, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Comment } from '../types'
import { timeNum, timeStr } from '../utils'

type Props = {
  comment: Comment
  updateComment: (comment: Comment) => void
  deleteComment: () => void
}
const Box = styled(Card)`
  margin-top: 8px;
  padding: 16px;
  /* border: padding: 8px; */
`

const CommentBox = ({ comment, updateComment, deleteComment }: Props) => {
  const [text, setText] = useState<string>('')
  const [time, setTime] = useState<number>(0)
  const [timeLabel, setTimeLabel] = useState<string>('')

  useEffect(() => {
    setText(comment.text)
    setTime(comment.time)
    setTimeLabel(timeStr(comment.time))
  }, [comment.text, comment.time])
  const changed = comment.text !== text || timeStr(comment.time) !== timeLabel

  return (
    <Box>
      <TextField
        variant="outlined"
        size="small"
        value={timeLabel}
        error={isNaN(time)}
        onChange={(e) => {
          setTimeLabel(e.target.value)
          setTime(timeNum(e.target.value))
        }}
      />
      <TextField
        variant="outlined"
        fullWidth
        multiline
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button color="secondary" onClick={deleteComment}>
          削除
        </Button>
        <Button
          color={changed ? 'primary' : 'default'}
          disabled={!changed || isNaN(time)}
          onClick={() => {
            updateComment({ ...comment, text, time })
          }}
        >
          更新
        </Button>
      </div>
    </Box>
  )
}

export default CommentBox
