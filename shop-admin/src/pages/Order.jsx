
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useOrder } from '../contexts/order';
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
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';
import statusConfig from '../config/status';
const customerTableHead = [
    '',
    'Order name',
    'Update',
    'Delete',
]



const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});
const Orders = () => {
    const classes = useStyles();
    let { orders } = useOrder();
    let context = useOrder();
    const [Order, setOrder] = useState([]);
    useEffect(() => {
        context.fetchOrder().then((res)=>{
            setOrder(res);
        })

    });
    const validateOrder = async (id) => {
        context.validateOrder(id)
    }
    return (
        <div>
            <h2 className="page-header">
                Đơn hàng
            </h2>
            <TableContainer component={Paper}>
                <Table className={classes} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>id</TableCell>
                            <TableCell align="left">Địa chỉ</TableCell>
                            <TableCell align="left">Sản phẩm</TableCell>
                            <TableCell align="left">Thời gian</TableCell>
                            <TableCell align="right">Trạng thái</TableCell>
                            <TableCell align="right">Xác nhận</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Order.map((row) => (
                            <TableRow key={row.name}>
                                <TableCell component="th" scope="row">
                                    {row.order.id}
                                </TableCell>
                                <TableCell align="left">{row.order.detailAddress + ', ' + row.order.district + ', ' + row.order.province}</TableCell>
                                <TableCell align="left">{row.productIds.map((id) => (<a href= {`/products/${id}`}>{id + ' '}</a>))}</TableCell>
                                <TableCell align="left">{row.order.updateAt}</TableCell>
                                <TableCell align="right" data-item={row._id} className="pointer"> {statusConfig[row.order.status]} </TableCell>
                                <TableCell align="right" data-item={row._id} className="pointer">
                                    { (row.order.status == 0 || row.order.status == 1) 
                                        ? <Button onClick={() => validateOrder(row.order.id)}> Xác nhận
                                        </Button> 
                                        : <span>Đã xác nhận</span>
                                    }
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </div>
    )
}

export default Orders
