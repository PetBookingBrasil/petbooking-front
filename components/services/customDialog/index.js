import React from 'react'

import {
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  InputLabel,
  IconButton,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  Typography
} from "@material-ui/core"
import { Close } from "@material-ui/icons"

export default function CustomDialog(props) {
  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      onBackdropClick={props.onClose}
      className="sns-dialog"
    >
      <DialogTitle className="sns-dialog-header">
        <Grid container justify="space-between" alignItems="center">
          <Grid item md={10}>
            <Typography variant="body1">
              {props.header}
            </Typography>
          </Grid>
          <Grid item md={2} className="d-flex justify-content-end">
            <IconButton onClick={props.onClose}>
              <Close />
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>
      {props.children}
    </Dialog>
  )
}
