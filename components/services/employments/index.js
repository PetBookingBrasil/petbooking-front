import React from "react";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import { Employment, ImageWrapper, Count, Initials } from "./styles";

export default function Employments({ employment, setEmployment, data }) {
  return (
    <Grid container alignItems="center">
      <Grid item md={2}>
        <Button
          variant="contained"
          fullWidth
          className={!!!employment.id ? "sns-active" : "sns-inactive"}
          onClick={() => setEmployment({})}
        >
          Ver todos
        </Button>
      </Grid>
      <Grid
        item
        md={10}
        className="d-flex o-auto align-start padding-t-2 padding-b-2"
      >
        {data.map((item, i) => (
          <Employment
            key={i}
            active={employment.id === item.id}
            onClick={() => setEmployment(item)}
          >
            <ImageWrapper>
              <Count>
                <Typography variant="caption">{item.skills.length}</Typography>
              </Count>
              {item.avatar_url.includes("fallback") && (
                <Initials>
                  <Typography variant="caption">{item.initials}</Typography>
                </Initials>
              )}
              {!item.avatar_url.includes("fallback") && (
                <img src={item.avatar_url}></img>
              )}
            </ImageWrapper>
            <Typography variant="caption" className="margin-t-1">
              {item.name}
            </Typography>
          </Employment>
        ))}
      </Grid>
    </Grid>
  );
}
