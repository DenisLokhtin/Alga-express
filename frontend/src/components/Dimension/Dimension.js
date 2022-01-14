import React from 'react';
import {Grid} from "@mui/material";
import TextField from "@mui/material/TextField";

const Dimension = (props) => {
    const {width, height, length, getFieldError, dimensionsHandler} = props;

    return (
        <>
            <Grid item xs={12} sm={4} md={4} lg={4}>
                <TextField
                    name="width"
                    value={width}
                    onChange={dimensionsHandler}
                    type="number"
                    required
                    variant="outlined"
                    error={Boolean(getFieldError('width'))}
                    helperText={getFieldError('width')}
                    fullWidth
                    label="Ширина"
                />
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={4}>
                <TextField
                    name="height"
                    value={height}
                    onChange={dimensionsHandler}
                    type="number"
                    required
                    variant="outlined"
                    error={Boolean(getFieldError('height'))}
                    helperText={getFieldError('height')}
                    fullWidth
                    label="Высота"
                />
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={4}>
                <TextField
                    name="length"
                    value={length}
                    onChange={dimensionsHandler}
                    type="number"
                    required
                    variant="outlined"
                    error={Boolean(getFieldError('length'))}
                    helperText={getFieldError('length')}
                    fullWidth
                    label="Длина"
                />
            </Grid>
        </>
    );
};

export default Dimension;