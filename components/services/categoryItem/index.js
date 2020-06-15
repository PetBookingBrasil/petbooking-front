import React from "react";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import ServiceItem from "../item";

import { Component } from "./styles";

export default function CategoryItem({
  data,
  employment,
  setEmployment,
  setFirstEmployment,
  subItem,
  editItem,
  removeItem,
}) {
  return (
    <Component item md={12}>
      <Grid container spacing={3} alignItems="center">
        <Grid item md={10}>
          <Typography variant="body1">{data.name}</Typography>
        </Grid>
      </Grid>
      {data.services.map((item, i) => (
        <ServiceItem
          key={i}
          data={item}
          setFirstEmployment={setFirstEmployment}
          setEmployment={setEmployment}
          editItem={editItem}
          removeItem={removeItem}
        />
      ))}
    </Component>
  );
}
