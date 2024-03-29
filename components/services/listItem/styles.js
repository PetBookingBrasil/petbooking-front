import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import { Colors, Metrics } from ".././../../themes";

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

export const SkillBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5em;
  width: 100%;
  border-radius: 4px;
  font-size: 0.6em;
  background-color: ${Colors.lightGray};
  &:hover {
    cursor: pointer;
  }
`;

export const ImageWrapper = styled.div`
  position: relative;

  img {
    width: 2em;
    height: 2em;
    object-fit: cover;
    border-radius: 4px;
  }
`;

export const Count = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: -1em;
  right: -1em;
  width: 1.2em;
  height: 1.2em;
  background-color: ${Colors.primaryColor};
  padding: 1em;
  color: ${Colors.white};
  border-radius: 5px;
  font-size: 0.5em;
`;

export const Initials = styled.div`
  width: 2em;
  height: 2em;
  object-fit: cover;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${Colors.gray};
  color: ${Colors.white};
  font-weight: bold;
`;
