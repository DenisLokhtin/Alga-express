import React, {useRef, useState} from 'react';
import {Button, Grid, TextField} from "@mui/material";
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles({
  input: {
    display: 'none'
  }
});

const FileInput = ({onChange, name, label, required, error, helperText, multiple}) => {
  const classes = useStyles();

  const inputRef = useRef();

  const [filename, setFilename] = useState('');

  const onFileChange = e => {
    if (e.target.files[0]) {
      setFilename(e.target.files[0].name);
    } else {
      setFilename('');
    }
    onChange(e);
  };

  const activateInput = () => {
    inputRef.current.click();
  };

  return (
    <>
      <input
        type="file"
        name={name}
        className={classes.input}
        onChange={onFileChange}
        ref={inputRef}
        multiple={multiple}
        required={required}
      />
      <Grid container direction="row" spacing={2} alignItems="center">
        <Grid item xs>
          <TextField
            disabled
            label={label}
            value={filename}
            error={error}
            helperText={helperText}
            onClick={activateInput}
          />
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={activateInput}>Загрузить</Button>
        </Grid>
      </Grid>
    </>
  );
};

export default FileInput;