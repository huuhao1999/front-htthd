
import { Button } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import 'animate.css';
import React, { useEffect, useState } from 'react';
import { BoxLoading } from 'react-loadingg';
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { useProduct } from '../contexts/product';
import './style.css';
const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});
const Products = () => {
    const classes = useStyles();
    const [products, setProducts] = useState([]);
    let context = useProduct();
    useEffect(() => {
        context.getProducts().then((res)=>{
            setProducts(res);
        })

    });
    const handleDelete = async (id) => {
        context.deleteProductById(id);
    }
    
    return (
        <div>
            <h2 className="page-header">
                Sản phẩm 
            </h2>
            <Button variant="contained" color="primary" href="/create-product">
                    Thêm sản phẩm
                </Button>
            {products.length == 0 ? <BoxLoading /> : ''}
            <TableContainer component={Paper}>
                <Table className={classes} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>id</TableCell>
                            <TableCell align="left">Tên</TableCell>
                            <TableCell align="left">Ảnh</TableCell>
                            <TableCell align="left">Giá</TableCell>
                            <TableCell align="left">Đã bán</TableCell>
                            <TableCell align="left">Tồn kho</TableCell>
                            <TableCell align="left">Thao tác</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {products.map((row) => (
                            <TableRow key={row._id}>
                                <TableCell component="th" scope="row">
                                    {row.id}
                                </TableCell>
                                <TableCell align="left">{row.name}</TableCell>
                                <TableCell align="left"><img src={row.urlImage} style={{height:50}}></img></TableCell>
                                <TableCell align="left">{row.price}</TableCell>
                                <TableCell align="left">{row.numberSold}</TableCell>
                                <TableCell align="left">{row.number}</TableCell>
                                <TableCell align="left">
                                    <Button onClick="">Sửa</Button>
                                    <Button onClick={() => handleDelete(row.id)}>Xóa</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </div>
    )
}

export default Products


