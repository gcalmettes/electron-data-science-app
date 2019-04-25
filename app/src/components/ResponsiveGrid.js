import React from 'react';
import { ResponsiveContext, Grid } from 'grommet';

export const ResponsiveGrid = ({ children, areas, ...props }) => (
  <ResponsiveContext.Consumer>
    {size => (
      <Grid areas={areas[size]} {...props}>
        {children}
      </Grid>
    )}
  </ResponsiveContext.Consumer>
);


export const DashboardLayout = ({ children }) => (
  <ResponsiveGrid
    fill
    gap="xsmall"
    columns={["small", "flex"]}
    rows={["3.5em", "flex"]}
    areas={{
      xsmall: [
        { name: "console", start: [0, 0], end: [1, 0] },
        { name: "main", start: [0, 1], end: [1, 1] },
      ],
      small: [
        { name: "console", start: [0, 0], end: [1, 0] },
        { name: "main", start: [0, 1], end: [1, 1] },
      ],
      medium: [
        { name: "console", start: [0, 0], end: [0, 1] },
        { name: "main", start: [1, 0], end: [1, 1] },
      ],
      middle: [
        { name: "console", start: [0, 0], end: [0, 1] },
        { name: "main", start: [1, 0], end: [1, 1] },
      ]
    }}
  >
    { children }
  </ResponsiveGrid>
);