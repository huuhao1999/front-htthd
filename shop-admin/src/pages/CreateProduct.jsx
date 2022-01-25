import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { useState } from 'react';
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';
const category = [{ id: 2, name: 'Đồ điện tử' },
    { id: 3, name: 'Thuốc' },
    { id: 4, name: 'Trái cây' },
    { id: 5, name: 'Cơm tấm' },
    { id: 6, name: 'Hải sản' },
    { id: 7, name: 'Thịt heo' },
    { id: 9, name: 'Nước' },
    { id: 10, name: 'Bánh kẹo' },
    { id: 11, name: 'Đồ ăn vặt' },
    { id: 12, name: 'Sữa, sữa chua, kem' },
    { id: 13, name: 'Gia vị, phụ gia' },
    { id: 14, name: 'Thực phẩm khô và đồ hộp' }];
const useStyles = makeStyles((theme) => ({
    button: {
        display: 'block',
        marginTop: theme.spacing(2),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));
export default function AddressForm() {
    const classes = useStyles();
    const [choose, setChoose] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [fullDescription, setFullDescription] = useState('');
    const [cate, setCate] = useState([]);
    const [title, setTitle] = useState('');
    const [url_image, setUrl_image] = useState('');
    const [short_description, setShortDescription] = useState('');
    const [changeEditer, setChangeEditer] = useState('');
    const [Loading, setLoading] = useState(true);
    const handleChange = (event) => {
        setChoose(event.target.value);
    };
    const handleCreateCourse = () => {
        let entity = {
            category_id: choose || 1,
            name: title,
            url_image: url_image,
            short_description: short_description,
            full_description: fullDescription.replaceAll('rgb(255,255,255)', '')
        }
        console.log(entity);
        if (!title || !url_image || !short_description) {
            alert('Bạn phải nhập đầy đủ thông tin mới được đăng');
            return;
        }

    }
    const updateInputValue = async (event) => {
        if (event.target.name == 'name') setTitle(event.target.value);
        if (event.target.name == 'url_image') setUrl_image(event.target.value);
        if (event.target.name == 'short_description') setShortDescription(event.target.value);
    }
    return (
        <React.Fragment>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        required
                        name="name"
                        label="Tên sản phẩm"
                        fullWidth
                        autoComplete="shipping address-line1"
                        onChange={evt => updateInputValue(evt)}
                    />
                </Grid>
                <FormControl className={classes.formControl} style={{ minWidth: '200px' }}>
                    <InputLabel id="demo-controlled-open-select-label">Thể loại</InputLabel>
                    <Select
                        labelId="demo-controlled-open-select-label"
                        id="demo-controlled-open-select"
                        open={open}
                        onClose={() => { setOpen(false); }}
                        onOpen={() => { setOpen(true); }}
                        value={choose}
                        onChange={handleChange}
                        name='category'
                    >
                        {category.map((item) => (
                            <MenuItem value={item.id}>{item.name}</MenuItem>
                        ))}

                    </Select>
                </FormControl>
                <Grid item xs={12}>
                    <TextField
                        id="address2"
                        name="url_image"
                        label="Link the course's photo"
                        fullWidth
                        onChange={evt => updateInputValue(evt)}
                        autoComplete="shipping address-line2"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="address2"
                        name="short_description"
                        label="Short description"
                        fullWidth
                        autoComplete="shipping address-line2"
                        onChange={evt => updateInputValue(evt)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <p style={{ fontsSize: '17px', opacity: '0.6', marginBottom: '10px' }}>Full description</p>
                    <p style={{ border: '1px solid rgb(132 132 132 / 52%)', padding: '10px', minHeight: 300 }}>  </p>
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" style={{ opacity: 0.8 }} onClick={handleCreateCourse}>Post Course</Button>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}