
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAdmin } from '../contexts/admin';
import './style.css'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useCategory } from '../contexts/category';
import { BoxLoading } from 'react-loadingg';
import moment from 'moment'
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';
const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});
const Students = () => {
    const classes = useStyles();
    const [stu, setStu] = useState([]);
    let context = useAdmin();
    useEffect(() => {
        const fetchProduct = async () => {
            if (stu.length == 0) {
                try {
                    let res = await context.getStudent();
                    setStu(res);
                } catch (error) {
                    addNoti('Something wrong','danger', 'Notification')
                }
            };
        }
        fetchProduct();
        return;
    }, []);
    let handleDelete = ((e) => {
        let id = e.target.getAttribute('data-item');
        //TODO
        context.deleteAccStudent(id).then((res) => {
            let temp = stu;
            temp = temp.filter(e => e._id != id);
            setStu(temp);
            return;
        }).catch((err) => {
           addNoti('Cannot delete student','danger', 'Notification')
            return;
        })
    })
    const addNoti = (mes, type, title) => {
        store.addNotification({
            title: title,
            message: mes,
            type: type,
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
                duration: 2000,
                onScreen: true
            }
        });
    }
    return (
        <div>
            <h2 className="page-header">
                Students
            </h2>
            {stu.length == 0 ? <BoxLoading /> : ''}
            <TableContainer component={Paper}>
                <Table className={classes} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>id</TableCell>
                            <TableCell align="left">Email</TableCell>
                            <TableCell align="left">Full name</TableCell>
                            <TableCell align="left">Password</TableCell>
                            <TableCell align="left">Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {stu.map((row) => (
                            <TableRow key={row._id}>
                                <TableCell component="th" scope="row">
                                    {row._id}
                                </TableCell>
                                <TableCell align="left">{row.email}</TableCell>
                                <TableCell align="left" > {row.full_name}</TableCell>
                                <TableCell align="left" data-item={row._id} className="pointer"> *********</TableCell>
                                <TableCell align="left" data-item={row._id} className="pointer" onClick={handleDelete}>Delete</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </div>
    )
}

export default Students


