import { Button, Card, TextField, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Comment } from '../types'
import { timeNum, timeStr } from '../utils'

type Props = {
  comment: Comment
  updateComment: (comment: Comment) => void
}
const Box = styled(Card)`
  margin-top: 8px;
  padding: 16px;
  /* border: padding: 8px; */
`

const CommentBox = ({ comment, updateComment }: Props) => {
  const [text, setText] = useState<string>('')
  const [time, setTime] = useState<string>('')

  useEffect(() => {
    setText(comment.text)
    setTime(timeStr(comment.time))
  }, [comment.text, comment.time])

  return (
    <Box>
      <Typography variant="caption">{timeStr(comment.time)}</Typography>
      <TextField
        variant="outlined"
        size="small"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />
      <TextField
        variant="outlined"
        fullWidth
        multiline
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button
        onClick={() => {
          updateComment({ ...comment, text, time: timeNum(time) })
        }}
      >
        更新
      </Button>
    </Box>
  )
}

export default CommentBox
