import * as React from 'react';
import {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {useDispatch, useSelector} from "react-redux";
import {
    addRequisitesRequest,
    changeRequisitesRequest,
    deleteRequisitesRequest,
    fetchOneRequisitesRequest,
    fetchRequisitesRequest
} from "../../store/actions/requisitesActions";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import {Container, FormControl, Grid, IconButton, InputLabel, MenuItem, Select} from "@mui/material";
import {Editor} from "@tinymce/tinymce-react/lib/es2015/main/ts";
import ButtonWithProgress from "../UI/ButtonWithProgress/ButtonWithProgress";
import {makeStyles} from "@mui/styles";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import TextField from "@mui/material/TextField";

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 900,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const useStyles = makeStyles(theme => ({
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    container: {
        width: "90%",
        margin: "0 auto",
        marginTop: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            width: '60%',
        },
        [theme.breakpoints.up('md')]: {
            width: '50%',
        },
    },
}));

export default function BasicTabs() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = useSelector((state => state.users.user));
    const requisites = useSelector(state => state.requisites.requisites);
    const oneRequisites = useSelector(state => state.requisites.oneRequisite);

    const [value, setValue] = useState(0);
    const [action, setAction] = useState('');
    const [open, setOpen] = useState(false);
    const [data, setData] = useState({
        bank: '',
        requisites: ''
    });

    useEffect(() => {
        dispatch(fetchRequisitesRequest());

        if (!!oneRequisites) {
            setData({bank: oneRequisites.bank, requisites: oneRequisites.requisites});
        }
    }, [dispatch, oneRequisites]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setAction('');
        setData({
            bank: '',
            requisites: ''
        });
        setOpen(false);
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const inputChangeHandler = e => {
        setAction(e.target.value);
    };

    const handleBankChange = (content) => {
        dispatch(fetchOneRequisitesRequest(content));

        setData(prevState => {
            return {...prevState, bank: content}
        });
    };

    const handleEditorChange = (content) => {
        setData(prevState => {
            return {...prevState, requisites: content}
        });
    };

    const submitFormHandler = e => {
        e.preventDefault();
        if (action === 'edit') {
            dispatch(changeRequisitesRequest(data));
        } else if (action === 'add') {
            dispatch(addRequisitesRequest(data));
        }
        setOpen(false);
        setAction('');
        setData({
            bank: '',
            requisites: ''
        });
    };

    const deleteRequisite = (item) => {
        dispatch(deleteRequisitesRequest({bank: item}));
    };

    const print = () => {
        if (action === 'delete') {
            return (
                requisites.length !== 0 && requisites.map((item, index) => (
                    <div key={index} style={{margin: 20}}>
                        <IconButton
                            sx={{color: '#000',}}
                            onClick={() => deleteRequisite(item.bank, index)}

                        >
                            <DeleteForeverIcon/>
                        </IconButton>

                        {item.bank} <span className="post__content"
                                          style={{marginLeft: '50px', display: 'inline-block'}}
                                          dangerouslySetInnerHTML={{__html: item.requisites}}/></div>
                ))
            )
        } else if (action === 'edit') {
            return (
                <Grid
                    container
                    direction="column"
                    spacing={2}
                    autoComplete="off"
                    noValidate
                >
                    <Grid item xs={12} sm={8} md={7} lg={7} style={{margin: '20px 0'}}>
                        <FormControl variant="standard" fullWidth>
                            <InputLabel id="demo-controlled-open-select-label">Банк</InputLabel>
                            <Select
                                labelId="demo-controlled-open-select-label"
                                id="demo-controlled-open-select"
                                defaultValue=''
                                label="Банк"
                                name="bank"
                                required
                                onChange={handleBankChange}
                            >
                                <MenuItem value={''}></MenuItem>
                                {requisites.length !== 0 && requisites.map((item, index) => {
                                    return (
                                        <MenuItem key={index} value={item.bank}>{item.bank}</MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item>
                        <Editor
                            apiKey='rd2sys4x7q7uu8l0tvehv3sl6wisqzs1pp15gvq3jwssgvft'
                            value={data.requisites}
                            init={{
                                height: 400,
                                menubar: false,
                                plugins: [
                                    'advlist autolink lists link image',
                                    'charmap print preview anchor help',
                                    'searchreplace visualblocks code',
                                    'insertdatetime media table paste wordcount'
                                ],
                                toolbar:
                                    'undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media fullpage | forecolor backcolory | outdent indent'
                            }}
                            onEditorChange={handleEditorChange}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <ButtonWithProgress
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Изменить
                        </ButtonWithProgress>
                    </Grid>
                </Grid>
            )
        } else if (action === 'add') {
            return (
                <Grid
                    container
                    direction="column"
                    spacing={2}
                    autoComplete="off"
                    noValidate
                >
                    <Grid style={{margin: '20px 0'}} item>
                        <TextField id="outlined-basic" label="Банк" variant="outlined" fullWidth
                                   onChange={(e) => setData(prevState => {
                                       return {...prevState, bank: e.target.value}
                                   })}/>
                    </Grid>

                    <Grid item>
                        <Editor
                            apiKey='rd2sys4x7q7uu8l0tvehv3sl6wisqzs1pp15gvq3jwssgvft'
                            value={data.requisites}
                            init={{
                                height: 400,
                                menubar: false,
                                plugins: [
                                    'advlist autolink lists link image',
                                    'charmap print preview anchor help',
                                    'searchreplace visualblocks code',
                                    'insertdatetime media table paste wordcount'
                                ],
                                toolbar:
                                    'undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media fullpage | forecolor backcolory | outdent indent'
                            }}
                            onEditorChange={handleEditorChange}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <ButtonWithProgress
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Создать
                        </ButtonWithProgress>
                    </Grid>
                </Grid>
            )
        }
    };

    return (
        <Box sx={{width: '100%'}}>
            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                <Tabs value={value} onChange={handleChange} centered>
                    {requisites.length !== 0 && requisites.map((item, index) => (
                        <Tab label={item.bank} key={index} {...a11yProps(index)} />
                    ))}
                </Tabs>
                {user && user.role === 'admin' && (
                    <div>
                        <Button sx={{display: 'inline', width: 100, border: '1px solid grey', margin: '10px'}}
                                variant="text" onClick={handleOpen}>EDIT</Button>
                    </div>
                )}
            </Box>
            {requisites.length !== 0 && requisites.map((item, index) => (
                <TabPanel value={value} key={index} index={index}>
                    <span className="post__content" dangerouslySetInnerHTML={{__html: item.requisites}}/>
                </TabPanel>
            ))}


            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Container
                        component="section"
                        maxWidth="md"
                        className={classes.container}>
                        <Grid
                            container
                            direction="column"
                            component="form"
                            autoComplete="off"
                            onSubmit={submitFormHandler}
                            noValidate
                        >
                            <h2>Отредактировать реквизиты</h2>

                            <Grid item xs={12} sm={8} md={7} lg={7}>
                                <FormControl variant="standard" fullWidth>
                                    <InputLabel id="demo-controlled-open-select-label">Действие</InputLabel>
                                    <Select
                                        labelId="demo-controlled-open-select-label"
                                        id="demo-controlled-open-select"
                                        value={action}
                                        label="Действие"
                                        name="action"
                                        required
                                        onChange={inputChangeHandler}
                                    >
                                        <MenuItem value={''}></MenuItem>
                                        <MenuItem value={'edit'}>Изменить</MenuItem>
                                        <MenuItem value={'delete'}>Удалить</MenuItem>
                                        <MenuItem value={'add'}>Добавить</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            <div>
                                {print()}
                            </div>

                        </Grid>
                    </Container>
                </Box>
            </Modal>

        </Box>
    );
};