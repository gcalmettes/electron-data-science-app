import React from 'react';
import { Box, Heading, Button } from 'grommet';

export const AppBar = (props) => (
  <Box
    tag='header'
    direction='row'
    align='center'
    justify='between'
    background='brand'
    pad={{ left: 'medium', right: 'small', vertical: 'small' }}
    elevation='medium'
    style={{ zIndex: '1' }}
    {...props}
  />
);

export const AppBarTitle = ({ title, icon }) => (
  <AppBar>
    <Heading level='3' margin='none'>{title}</Heading>
    <Button icon={icon} onClick={() => {}} />
  </AppBar>
)