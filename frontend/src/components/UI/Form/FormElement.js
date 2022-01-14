import React from 'react';
import PropTypes from 'prop-types';
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";

const FormElement = ({label, name, value, onChange, required, error, autoComplete, type, select, options, multiline, rows}) => {
  let inputChildren = null;

  if (select) {
    inputChildren = options.map(option => (
      <MenuItem
        key={option._id}
        value={option._id}>
        {option.title}
      </MenuItem>
    ));
  }

  return (
    <Grid item xs={12}>
      <TextField
        select={select}
        multiline={multiline}
        rows={rows}
        type={type}
        required={required}
        autoComplete={autoComplete}
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        error={Boolean(error)}
        helperText={error}
      >
        {inputChildren}
      </TextField>
    </Grid>
  );
};

FormElement.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  error: PropTypes.string,
  autoComplete: PropTypes.string,
  type: PropTypes.string,
  select: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.object),
  multiline: PropTypes.bool,
  rows: PropTypes.number
};

export default FormElement;