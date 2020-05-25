import React from "react";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import { Employee, ImageWrapper, Count, Initials } from "./styles";

function Employees(props) {
  return (
    <Grid container spacing={3} alignItems="center">
      <Grid item md={2}>
        <Button
          variant="contained"
          fullWidth
          className={!!!props.employee.id ? "sns-active" : "sns-inactive"}
          onClick={() => props.setEmployee({})}
        >
          Ver todos
        </Button>
      </Grid>
      <Grid item md={10} className="d-flex o-auto">
        {props.data.map((item, i) => (
          <Employee
            key={i}
            active={props.employee.id === item.id}
            onClick={() => props.setEmployee(item)}
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
            <Typography variant="caption">{item.name}</Typography>
          </Employee>
        ))}
      </Grid>
    </Grid>
  );
}

export default (props) => <Employees {...props} />;
