import React from "react";
import type { Task } from "../../types/task";

import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

function Tasks({ tasks } : { tasks : Task[]}) {

    return (
        <>
            <Box sx={{ width: '100%' }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    {
                        tasks.map((task) => (
                            <Grid size={6} key={task?.id}>
                                <Item>
                                    <h4>{task?.name}</h4>
                                    <text>{task?.description}</text>
                                    <label>{task?.status} {task?.createdAt}</label>
                                </Item>
                            </Grid>
                        ))
                    }
                </Grid>
            </Box>
        </>
    );
}

export default React.memo(Tasks);