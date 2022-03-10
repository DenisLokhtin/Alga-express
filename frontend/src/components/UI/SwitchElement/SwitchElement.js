import React from 'react';
import {FormControlLabel, Switch} from "@mui/material";

const SwitchElement = ({checked, onChange}) => {
    return (
        <FormControlLabel
            control={<Switch checked={checked} onChange={onChange}/>}
            label='История'
        />
    );
};

export default SwitchElement;