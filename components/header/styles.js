import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import { Metrics, Colors } from "../../themes";

export const Component = styled(Grid)`
  z-index: 9;
  position: fixed;
  right: 0;
  top: 0;
  height: 60px;
  width: calc(100% - 60px);
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: -0.25px;
  transform: translate3d(0, 0, 0);
  padding: 0 ${Metrics.m0};

  background-color: ${Colors.primaryColor};
  color: ${Colors.transparentWhite};
`;

export const LogoWrapper = styled.div`
  z-index: 10;
  width: 38px;
  height: 60px;
  position: absolute;
  pointer-events: none;
  transition: opacity 0.4s cubic-bezier(0.65, 0.05, 0.36, 1) 1s;
  opacity: 1;
  top: 0;
  left: 50%;
  transform: translateX(-50%);

  display: flex;
  align-items: center;
`;

export const Image = styled.div`
  img {
    width: 38px;
    height: 33px;
  }
`;
