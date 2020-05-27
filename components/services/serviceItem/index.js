import React from "react";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

import Edit from "@material-ui/icons/Edit";
import Delete from "@material-ui/icons/Delete";
import AttachMoney from "@material-ui/icons/AttachMoney";
import Schedule from "@material-ui/icons/Schedule";

import { Component, SkillBtn, ImageWrapper, Initials } from "./styles";

export default function ServiceItem({
  data,
  setFirstEmployee,
  setEmployee,
  editItem,
}) {
  return (
    <Component item md={12}>
      <Grid container spacing={3} alignItems="center">
        <Grid item md={10}>
          <Grid container alignItems="center">
            <Grid item md={6}>
              {data.name}
            </Grid>
            <Grid item md={2} className="d-flex align-center">
              <AttachMoney className="margin-r-2" />
              <Typography variant="caption">
                {data.price_formatted !== "R$ 0,00"
                  ? data.price_formatted
                  : "não configurado"}
              </Typography>
            </Grid>
            <Grid item md={2} className="d-flex align-center">
              <Schedule className="margin-r-2" />
              <Typography variant="caption">
                {data.duration_formatted !== "zero"
                  ? data.duration_formatted
                  : "não configurado"}
              </Typography>
            </Grid>
            <Grid item md={2} className="d-flex align-center o-auto">
              {!!data.employments && !!!data.employments.length && (
                <SkillBtn onClick={() => setFirstEmployee()}>
                  <Typography variant="caption">
                    configurar habilidades
                  </Typography>
                </SkillBtn>
              )}
              {!!data.employments &&
                !!data.employments.length &&
                data.employments.map((item) => (
                  <Tooltip
                    title={item.name}
                    key={item.id}
                    onClick={() => setEmployee(item)}
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
        </Grid>
        <Grid item md={2} className="d-flex align-center justify-end">
          <IconButton onClick={() => editItem(data)}>
            <Edit />
          </IconButton>
          <IconButton>
            <Delete />
          </IconButton>
        </Grid>
      </Grid>
    </Component>
  );
}
