import React from "react";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import ServiceItem from "../serviceItem";

import { Component } from "./styles";

export default function ServiceCategoryItem({
  data,
  employee,
  setEmployee,
  setFirstEmployee,
  subItem,
  editItem,
}) {
  return (
    <Component item md={12}>
      <Grid container spacing={3} alignItems="center">
        <Grid item md={10}>
          <Typography variant="body1">{data.name}</Typography>
        </Grid>
      </Grid>
      {data.services.map((item) => (
        <ServiceItem
          data={item}
          setFirstEmployee={setFirstEmployee}
          setEmployee={setEmployee}
          editItem={editItem}
        />
      ))}
    </Component>
  );
}
