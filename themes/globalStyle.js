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
      font-family: Roboto !important;
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
    background-color: ${Colors.backgroundGray} !important;
    color: ${Colors.text} !important;
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

  .hover {
    &:hover {
      cursor: pointer;
    }
  }

  .service-input {
    .MuiAutocomplete-root {
      width: 70%;
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
    .flex-1 {
      flex: 1 !important;
    }
  `;

  return styles;
}

export default GlobalStyle;
