import React from 'react';
var data = JSON.parse(localStorage.getItem('cart_web'));


export default class Cart extends React.Component{
    render() {
        if (data != null)
            return <div class="col-md-12 col-sm-12 col-xs-12">
                <div class="headline">
                    <h2>Shopping cart</h2>
                </div>
                <div class="table-responsive">
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th class="cart-product item">Sản phẩm</th>
                                <th class="cart-product-name item">Tên sản phẩm</th>
                                <th class="cart-qty item">Số lượng</th>
                                <th class="cart-unit item">Giá</th>
                                <th class="cart-delivery item">Vận chuyển</th>
                                <th class="cart-sub-total last-item">Tổng</th>
                                <th class="cart-romove item">Xóa</th>
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                                <td colspan="7">
                                    <div class="shopping-cart-btn">
                                        <button type="button" class="btn btn-default left-cart">Tiếp tục mua sắm</button>
                                        <button type="button" class="btn btn-default right-cart right-margin">Xóa toàn bộ giỏ hàng</button>
                                        <button type="button" class="btn btn-default right-cart">Cập nhật giỏ hàng</button>
                                    </div>
                                </td>
                            </tr>
                        </tfoot>
                        <tbody>
                            {data.map(item => {
                                return <tr>
                            <td class="cart-image">
                                <a href="#" class="entry-thumbnail">
                                    <img  src="#" alt=""/>
                                </a>
                            </td>
                            <td class="cart-product-name-info">
                                <div class="cc-tr-inner">
                                    <h4 class="cart-product-description"><a href="#">{item.name}</a></h4>
                            </div>
                            </td>
                            <td class="cart-product-quantity">
                                <div class="quant-input">
                                    <input type="number" size="4" class="input-text qty text" title="Qty" value="1" name="quantity[113]" max="119" min="0" step="1"/>
                                </div>
                            </td>
                            <td class="cart-product-price"><div class="cc-pr">{item.price}</div></td>
                            <td class="cart-product-delivery"><div class="cc-pr">Free shipping</div></td>
                            <td class="cart-product-sub-total"><div class="cc-pr">{item.price}</div></td>
                            <td class="romove-item">
                                <a href="#"><img src="https://www.google.com/url?sa=i&url=https%3A%2F%2Ffindicons.com%2Ficon%2F132057%2Fdelete&psig=AOvVaw2qJ76Lf02c71DmxL71Zd2N&ust=1643197711980000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCMCPidLqzPUCFQAAAAAdAAAAABAJ" alt=""/>
                                </a>
                            </td>
                        </tr>
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        else
            return <div></div>
    }
}
