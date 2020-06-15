import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import { Colors, Metrics } from "../../../themes";

export const Component = styled(Grid)`
  border-left: 2px solid transparent;
  border-bottom: 1px dotted ${Colors.lightGray};
  padding: ${Metrics.m3} ${Metrics.m2} ${Metrics.m3} ${Metrics.m2};

  ${(props) =>
    !!props.isService &&
    `
      margin-left: ${Metrics.m2}
      border-left: 1px solid ${Colors.primaryColor} !important;
    `}
`;
