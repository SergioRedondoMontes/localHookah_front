import React from "react";
import Button from "@material-ui/core/Button";
import { default as DialogMui } from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function Dialog(props) {
  return (
    <DialogMui
      fullWidth={props.fullWidth}
      maxWidth={props.maxWidth}
      open={props.open}
      onClose={props.onClose}
    >
      <DialogTitle>{props.title}</DialogTitle>
      <DialogContent>{props.children}</DialogContent>
      <DialogActions>
        <Button onClick={props.onSubmit} color="primary">
          Guardar
        </Button>
        <Button onClick={props.onClose} color="primary">
          Cancelar
        </Button>
      </DialogActions>
    </DialogMui>
  );
}
