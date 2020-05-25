import styled from "styled-components";
import { Colors } from ".././../../themes";

export const Employee = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  margin-right: 1em;

  opacity: ${(props) => (!!props.active ? 1 : 0.5)};

  &:hover {
    cursor: pointer;
  }

  .MuiTypography-caption {
    margin-top: 1em;
    text-align: center;
    color: ${Colors.primaryColor};
    font-size: 0.6em !important;
    width: 10em;
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
