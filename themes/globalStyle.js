import { createGlobalStyle } from "styled-components";
import { Metrics, Colors } from "./";

const GlobalStyle = createGlobalStyle`
  body, html {
      height: 100%;
      margin: 0;
      -webkit-font-smoothing: antialiased;
      @media (max-width: 768px) {
        font-size: 14px;
      }
      font-family: Nunito Sans !important;
    }


  .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: ${Colors.primaryColor} !important;
  }

  .MuiFormLabel-root.Mui-focused {
    color: ${Colors.primaryColor} !important;
  }

  .MuiButton-contained {
    background-color: ${Colors.primaryColor} !important;
    color: ${Colors.white} !important;
    outline: unset !important;
    text-transform: unset !important;
  }

  .MuiButton-root {
    padding: 0.8em 2em !important;
  }

  .MuiButton-containedSecondary {
    background-color: ${Colors.lightGray} !important;
    color: ${Colors.gray} !important;
  }

  .MuiTypography-subtitle1 {
    text-transform: unset !important;
  }

  .MuiInputBase-input {
    background-color: ${Colors.white} !important;
  }

  .MuiOutlinedInput-input {
    border-radius: 4px !important;
  }

  .MuiIconButton-root {
    outline: unset !important;
  }

  .o-auto {
    overflow-x: auto;
  }

  .sns-active {
    opacity: 1;
  }

  .sns-inactive {
    opacity: 0.6;
  }

  .sns-with-skill {
    border-left: 2px solid ${Colors.primaryColor} !important;
  }

  .sns-no-skills {
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
  }

  .sns-service-border {
    border-left: 1px solid ${Colors.primaryColor} !important;
  }

  .sns-employee {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    margin-right: 1em;

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
  }

  .sns-image {
    position: relative;

    .sns-skills-count {
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
    }

    img {
      width: 2em;
      height: 2em;
      object-fit: cover;
      border-radius: 4px;
    }
  }

  .sns-avatar-default {
    width: 2em;
    height: 2em;
    object-fit: cover;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $v2-avatar-gray;
    color: ${Colors.white};
    font-weight: bold;
  }

  .sns-list-item {
    border-left: 2px solid transparent;
    border-bottom: 1px dotted $v2-border-gray;
  }

  .sns-dialog {
    .MuiDialogTitle-root {
      padding: 0 1em !important;
    }
    .MuiDialog-paper {
      width: 70% !important;
      background-color: $v2-offwhite;
    }
    .MuiDialogContent-root,
    .MuiDialogActions-root {
      padding: 3em !important;
    }
    .sns-dialog-header {
      background-color: white !important;
    }
  }

  .sns-link {
    &:hover {
      cursor: pointer;
    }
  }

  .sns-service-input {
    .MuiAutocomplete-root {
      width: 70%;
    }
  }

  .sns-service-form {
  }

  .sns-collapse-title {
    padding: 0em 1em;
    background-color: ${Colors.primaryColor};
    color: ${Colors.white};
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;

    .MuiSvgIcon-root {
      color: ${Colors.white};
    }
  }

  .sns-collapse-body {
    width: 100%;
    padding: 2em;
    background-color: ${Colors.lightGray};
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;

    .sns-delete {
      padding: 0.7em !important;
      min-width: unset !important;
    }
  }



    ${genCommonClasses()}
`;

function genCommonClasses() {
  let styles = ``;
  for (let i = 0; i < 5; i++) {
    let metric =
      i === 0
        ? Metrics.m0
        : i === 1
        ? Metrics.m1
        : i === 2
        ? Metrics.m2
        : i === 3
        ? Metrics.m3
        : Metrics.m4;

    styles += `
      .padding-${i} {
        padding: ${metric} !important;
      }
      .padding-t-${i} {
        padding-top: ${metric} !important;
      }
      .padding-b-${i} {
        padding-bottom: ${metric} !important;
      }
      .padding-r-${i} {
        padding-right: ${metric} !important;
      }
      .padding-l-${i} {
        padding-left: ${metric} !important;
      }

      .margin-${i} {
        margin: ${metric} !important;
      }
      .margin-t-${i} {
        margin-top: ${metric} !important;
      }
      .margin-b-${i} {
        margin-bottom: ${metric} !important;
      }
      .margin-r-${i} {
        margin-right: ${metric} !important;
      }
      .margin-l-${i} {
        margin-left: ${metric} !important;
      }
    `;
  }

  styles += `
    .d-flex {
      display: flex !important;
    }
    .justify-end {
      justify-content: flex-end !important;
    }
    .justify-center {
      justify-content: center !important;
    }
    .align-center {
      align-items: center !important;
    }
  `;

  return styles;
}

export default GlobalStyle;
