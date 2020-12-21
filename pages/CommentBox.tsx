import { Button, Card, TextField, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Comment } from '../types'
import { timeStr } from '../utils'

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

  useEffect(() => {
    setText(comment.text)
  }, [comment.text])

  return (
    <Box>
      <Typography variant="caption">{timeStr(comment.time)}</Typography>
      <TextField
        variant="outlined"
        fullWidth
        multiline
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button
        onClick={() => {
          updateComment({ ...comment, text })
        }}
      >
        更新
      </Button>
    </Box>
  )
}

export default CommentBox
