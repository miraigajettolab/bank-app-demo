import React from 'react';
import Paper from '@material-ui/core/Paper';
import FormLabel from '@material-ui/core/FormLabel';

export default function DataGridPlaceholder(props) {
    return <div>
            <FormLabel 
                component="legend" 
                style={{marginBottom: "10px"}}
            >
                {props.msg}
            </FormLabel>
            <Paper 
                style={{ height: props.height, width: '100%'}}
                variant="outlined"
            />
    </div>
}