import React from 'react';
import {Grid} from "@mui/material";
import FormElement from "../UI/Form/FormElement";

const Dimension = (props) => {
    const {width, height, length, getFieldError, packageHandler} = props;

    return (
        <Grid container justifyContent="space-between">
            <FormElement
                xs={12} sm={4} md={4} lg={3}
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
            <FormElement
                xs={12} sm={4} md={4} lg={3}
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
            <FormElement
                xs={12} sm={4} md={4} lg={3}
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
    );
};

export default Dimension;