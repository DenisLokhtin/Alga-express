import React from 'react';
import {Grid} from "@mui/material";
import FormElement from "../UI/Form/FormElement";

const Dimension = (props) => {
    const {width, height, length, getFieldError, packageHandler} = props;

    return (
        <Grid container justifyContent="space-between">
            <Grid item xs={12} sm={4} md={4} lg={3}>
                <FormElement
                    name="width"
                    value={width}
                    onChange={packageHandler}
                    type="number"
                    required
                    variant="outlined"
                    error={getFieldError('width')}
                    fullWidth
                    label="Ширина"
                />
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={3}>
                <FormElement
                    name="height"
                    value={height}
                    onChange={packageHandler}
                    type="number"
                    required
                    variant="outlined"
                    error={getFieldError('height')}
                    fullWidth
                    label="Высота"
                />
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={3}>
                <FormElement
                    name="length"
                    value={length}
                    onChange={packageHandler}
                    type="number"
                    required
                    variant="outlined"
                    error={getFieldError('length')}
                    fullWidth
                    label="Длина"
                />
            </Grid>
        </Grid>
    );
};

export default Dimension;