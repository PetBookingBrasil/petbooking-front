import React from 'react';

import { Grid, Typography, Tooltip } from '@material-ui/core';
import { Edit, Delete, AttachMoney, Schedule, ErrorOutline } from '@material-ui/icons';

export default function ListItem(props) {
  return (
    <Grid
      item
      md={12}
      className={`sns-list-item pt-3 pb-3 px-2
        ${!!props.subItem ? 'sns-service-border ml-2' : ''} 
      `}
    >
      <Grid container spacing={3} alignItems="center">
        <Grid item md={10}>
          {!!!props.subItem && <Typography variant="body1">{props.data.name}</Typography>}

          {!!props.subItem && (
            <Grid container alignItems="center">
              <Grid item md={6}>
                {props.data.name}
              </Grid>
              <Grid item md={2} className="d-flex align-items-center">
                <React.Fragment>
                  <AttachMoney className="mr-2" />
                  <Typography variant="caption">
                    {props.data.price_formatted !== 'R$ 0,00'
                      ? props.data.price_formatted
                      : 'não configurado'}
                  </Typography>
                </React.Fragment>
              </Grid>
              <Grid item md={2} className="d-flex align-items-center">
                <React.Fragment>
                  <Schedule className="mr-2" />
                  <Typography variant="caption">
                    {props.data.duration_formatted !== 'zero'
                      ? props.data.duration_formatted
                      : 'não configurado'}
                  </Typography>
                </React.Fragment>
              </Grid>
              <Grid item md={2} className="d-flex align-items-center o-auto">
                {!!props.data.employments && !!!props.data.employments.length && (
                  <div className="sns-no-skills" onClick={() => props.setFirstEmployee()}>
                    <Typography variant="caption">configurar habilidades</Typography>
                  </div>
                )}
                {!!props.data.employments &&
                  !!props.data.employments.length &&
                  props.data.employments.map((item) => (
                    <Tooltip
                      title={item.name}
                      key={item.id}
                      onClick={() => props.setEmployee(item)}
                    >
                      <div className="sns-image mr-2">
                        {item.avatar_url.includes('fallback') ? (
                          <div className="sns-avatar-default">
                            <span>{item.initials}</span>
                          </div>
                        ) : (
                          <img src={item.avatar_url}></img>
                        )}
                      </div>
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
              className="d-flex align-items-center sns-link"
              onClick={() => props.editItem(props.data)}
            >
              <Edit className="mr-1" />
              <Typography variant="caption">Editar</Typography>
            </Grid>
            <Grid item md={1} className="d-flex align-items-center sns-link">
              <Delete className="mr-1" />
              <Typography variant="caption">Remover</Typography>
            </Grid>
          </React.Fragment>
        )}
      </Grid>
    </Grid>
  );
}
