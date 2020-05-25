import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import Collapse from "@material-ui/core/Collapse";
import { Colors } from ".././../../themes";

export const CollapseTitle = styled(Grid)`
  padding: 0em 1em;
  background-color: ${Colors.primaryColor};
  color: ${Colors.white};
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;

  .MuiSvgIcon-root {
    color: ${Colors.white};
  }
`;

export const CollapseBody = styled(Collapse)`
  width: 100%;
  padding: 2em;
  background-color: ${Colors.backgroundGray};
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;

  button {
    padding: 0.7em !important;
    min-width: unset !important;
  }
`;
