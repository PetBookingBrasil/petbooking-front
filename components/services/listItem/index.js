import React from "react";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import Edit from "@material-ui/icons/Edit";
import Delete from "@material-ui/icons/Delete";
import AttachMoney from "@material-ui/icons/AttachMoney";
import Schedule from "@material-ui/icons/Schedule";

import { Component, SkillBtn, ImageWrapper, Initials } from "./styles";

export default function ListItem(props) {
  return (
    <Component item md={12} isService={!!props.subItem}>
      <Grid container spacing={3} alignItems="center">
        <Grid item md={10}>
          {!!!props.subItem && (
            <Typography variant="body1">{props.data.name}</Typography>
          )}

          {!!props.subItem && (
            <Grid container alignItems="center">
              <Grid item md={6}>
                {props.data.name}
              </Grid>
              <Grid item md={2} className="d-flex align-center">
                <React.Fragment>
                  <AttachMoney className="margin-r-2" />
                  <Typography variant="caption">
                    {props.data.price_formatted !== "R$ 0,00"
                      ? props.data.price_formatted
                      : "não configurado"}
                  </Typography>
                </React.Fragment>
              </Grid>
              <Grid item md={2} className="d-flex align-center">
                <React.Fragment>
                  <Schedule className="margin-r-2" />
                  <Typography variant="caption">
                    {props.data.duration_formatted !== "zero"
                      ? props.data.duration_formatted
                      : "não configurado"}
                  </Typography>
                </React.Fragment>
              </Grid>
              <Grid item md={2} className="d-flex align-center o-auto">
                {!!props.data.employments && !!!props.data.employments.length && (
                  <SkillBtn onClick={() => props.setFirstEmployee()}>
                    <Typography variant="caption">
                      configurar habilidades
                    </Typography>
                  </SkillBtn>
                )}
                {!!props.data.employments &&
                  !!props.data.employments.length &&
                  props.data.employments.map((item) => (
                    <Tooltip
                      title={item.name}
                      key={item.id}
                      onClick={() => props.setEmployee(item)}
                    >
                      <ImageWrapper className="margin-r-2">
                        {item.avatar_url.includes("fallback") ? (
                          <Initials>
                            <span>{item.initials}</span>
                          </Initials>
                        ) : (
                          <img src={item.avatar_url}></img>
                        )}
                      </ImageWrapper>
                    </Tooltip>
                  ))}
              </Grid>
            </Grid>
          )}
        </Grid>
        {!!props.subItem && (
          <React.Fragment>
            <Grid
              item
              md={1}
              className="d-flex align-center hover"
              onClick={() => props.editItem(props.data)}
            >
              <Edit className="margin-r-1" />
              <Typography variant="caption">Editar</Typography>
            </Grid>
            <Grid item md={1} className="d-flex align-center hover">
              <Delete className="margin-r-1" />
              <Typography variant="caption">Remover</Typography>
            </Grid>
          </React.Fragment>
        )}
      </Grid>
    </Component>
  );
}
