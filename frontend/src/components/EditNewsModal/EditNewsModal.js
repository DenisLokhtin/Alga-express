import * as React from 'react';
import {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ButtonWithProgress from "../UI/ButtonWithProgress/ButtonWithProgress";
import {useDispatch, useSelector} from "react-redux";
import {Editor} from "@tinymce/tinymce-react/lib/es2015/main/ts";
import FormElement from "../UI/Form/FormElement";
import {changeNewsRequest, fetchOneNewsRequest} from "../../store/actions/newsActions";


const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const EditNewsModal = (props) => {
    const oneNews = useSelector(state => state.news.oneNews);

    const [data, setData] = useState({
        title: '',
        description: '',
        id: props.id,
    });

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchOneNewsRequest(props.id));

        setData({
            title: oneNews.title,
            description: oneNews.description,
            id: props.id,
        });
    }, [props.id, dispatch, oneNews.title, oneNews.description]);

    const submitFormHandler = e => {
        e.preventDefault();
        props.close();
        dispatch(changeNewsRequest(data));
        setData({
            title: '',
            description: '',
            id: '',
        });
    };

    const inputChangeHandler = e => {
        const {name, value} = e.target;

        setData(prevState => ({...prevState, [name]: value}));
    };

    const handleEditorChange = (content) => {
        setData(prevState => {
            return {...prevState, description: content}
        });
    };

    return (
        <div>
            <Modal
                open={props.open}
                onClose={props.close}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styleModal}>
                    <Grid style={{textAlign: "left"}} component="form" flexDirection="column"
                          onSubmit={submitFormHandler}
                    >
                        <h2>Изменить Новость</h2>
                        <Typography><b>Измените Заголовок:</b></Typography>

                        <FormElement
                            required
                            label="Название"
                            name="title"
                            value={data.title === undefined ? '' : data.title}
                            onChange={inputChangeHandler}
                        />

                        <Typography><b>Измените Описание:</b></Typography>

                        <Grid item>
                            <Editor
                                apiKey='jucp3aljkh783o2yj0379rihg44ldm2wgjxvz10pu9i9m7ja'
                                value={data.description}
                                init={{
                                    height: 600,
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

                        <Grid item xs={12} sm={8} md={7} lg={7}>
                            <ButtonWithProgress
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                style={{marginTop: 10, width: '172%'}}
                                disabled={data.title === '' && data.description === ''}
                            >
                                Подтвердить
                            </ButtonWithProgress>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </div>
    )
};

export default EditNewsModal;