import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
} from "@material-ui/core";

export function useDialogAlert(dialogContent, buttonLabel) {
  const [open, setOpen] = useState(false);
  function openDialog() {
    setOpen(true);
  }
  function handleClose() {
    setOpen(false);
  }
  function DialogAlert({ children }) {
    return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialogContent}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            {buttonLabel}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
  return [openDialog, DialogAlert];
}
