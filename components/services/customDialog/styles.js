import styled from "styled-components";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Colors } from ".././../../themes";

export const Component = styled(Dialog)`
  .MuiDialogTitle-root {
    padding: 0 1em !important;
  }
  .MuiDialog-paper {
    width: 70% !important;
    background-color: ${Colors.offwhite};
  }
  .MuiDialogContent-root,
  .MuiDialogActions-root {
    padding: 3em !important;
  }
  .sns-dialog-header {
    background-color: white !important;
  }
`;

export const Header = styled(DialogTitle)`
  background-color: ${Colors.white} !important;
`;
