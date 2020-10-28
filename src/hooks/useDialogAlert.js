import React, { useState } from 'react'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
} from '@material-ui/core'
/**
 * Use a dialog box to alert the user
 *
 * @returns{array} An array containing the function to open the dialog box and the component itself
 */
export function useDialogAlert() {
  const [open, setOpen] = useState(false)
  function openDialog() {
    setOpen(true)
  }
  function closeDialog() {
    setOpen(false)
  }
  function DialogAlert({ dialogContent, buttonLabel }) {
    return (
      <Dialog
        open={open}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            {dialogContent}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color='primary' autoFocus>
            {buttonLabel}
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
  return [openDialog, DialogAlert, closeDialog]
}
