import React from 'react'

import { Grid, Typography, Button } from '@material-ui/core';

function Employees(props) {
  return (
    <Grid container spacing={3} alignItems="center">
      <Grid item md={2}>
        <Button 
          variant="contained" 
          fullWidth 
          className={!!!props.employee.id ? 'sns-active' : 'sns-inactive'}
          onClick={() => props.setEmployee({})}
        >
          Ver todos
        </Button>
      </Grid>
      <Grid item md={10} className="d-flex o-auto">
        {props.data.map((item, i) => (
          <div
            key={i} 
            className={`
              sns-employee 
              ${props.employee.id === item.id ? 'sns-active' : 'sns-inactive'}
            `}
            onClick={() => props.setEmployee(item)}
          >
            <div className="sns-image">
              <span className="sns-skills-count">
                <span>{item.skills.length}</span>
              </span>
              {item.avatar_url.includes("fallback") && (
                <div className="sns-avatar-default">
                  <span>
                    {item.initials}
                  </span>
                </div>
              )}
              {!item.avatar_url.includes("fallback") && (
                <img src={item.avatar_url}></img>
              )}
            </div>
            <Typography variant="caption">{item.name}</Typography>
          </div>
        ))}
      </Grid>
    </Grid>
  );
}

export default props => <Employees {...props} />;