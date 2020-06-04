import styled from "styled-components";
import { Metrics, Colors } from "../../themes";

export const Component = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: ${Metrics.m0} ${Metrics.m3};
  margin-left: 60px;
  margin-top: ${Metrics.m4};
`;

export const Nav = styled.div`
  width: 240px;
  height: 100% !important;
  display: block;
  z-index: 10;
  overflow: hidden;
  position: fixed;
  font-size: 0.85rem;
  font-weight: 600;
  top: 0;
  left: 0;
  transform: translate3d(calc(-100% + 60px), 0, 0);
  will-change: transform;
  transition: transform 0.4s cubic-bezier(0.65, 0.05, 0.36, 1) 1s;
  background-color: ${Colors.lightGray};

  &:hover {
    transform: translate3d(0, 0, 0);
    transition: transform 0.6s cubic-bezier(0.65, 0.05, 0.36, 1) 0s;

    header {
      .business-name {
        color: rgba(#fff, 1);
        transform: translateX(0px);
        transition-delay: 0.2s;
      }
    }
  }
`;

export const AvatarWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 60px;
  background-color: ${Colors.gray};
`;

export const Name = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  padding: 0.438em ${Metrics.m1} 0.438em ${Metrics.m0};

  img {
    width: 32px;
    height: 32px;
  }

  p {
    line-height: 1rem;
    color: ${Colors.white};
  }
`;

export const NavBody = styled.nav`
  &:hover {
    @media (max-height: 700px) {
      overflow-y: scroll;
      padding-bottom: 5em;
    }
  }

  width: 100%;
  height: 100%;
  position: relative;
  z-index: 9999;
  display: block;
`;

export const NavLink = styled.a`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  padding: 0.438em ${Metrics.m1};

  span {
    transition: all 0.2s cubic-bezier(0.65, 0.05, 0.36, 1) 0s;
  }

  &:nth-of-type(2),
  &:nth-of-type(3),
  &:nth-of-type(4) {
    img {
      width: 17px;
      height: 17px;
    }
  }
`;

export const NavIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  will-change: background-color;
  transition: all 0.2s cubic-bezier(0.65, 0.05, 0.36, 1) 0s;

  img {
    width: 32px;
    height: 32px;
  }
`;
