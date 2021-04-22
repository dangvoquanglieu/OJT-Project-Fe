import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../Configs/store";
import {Button} from "semantic-ui-react";
import {ACTION} from "../../Redux/ActionType/actionType";

const ShoppingCart = () => {
    const cart = useSelector((state: RootState) => state.shoppingCartReducer.cart);
    let totalCartItem = useSelector((state: RootState) => state.shoppingCartReducer.totalCartItem);
    let totalAmount = useSelector((state: RootState) => state.shoppingCartReducer.totalAmount);
    const rows = useSelector((state: RootState) => state.shoppingCartReducer.cart);
    const total = useSelector((state: RootState) => state.shoppingCartReducer.totalAmount);
    const dispatch = useDispatch();
    const removeCart = (id:any) => {
        const cloneCart = [...cart]
        const index = cloneCart.findIndex((item) => {
            return item.productCart.id === id;
        });
        console.log(index);
        console.log(id);
        if (index != -1) {
            totalAmount -= cloneCart[index].quantity * cloneCart[index].productCart.price;
            totalCartItem -= cloneCart[index].quantity;
            cloneCart.splice(index, 1);
        }
        dispatch({
            type: ACTION.DELETE_CART,
            payload: {
                cart: cloneCart,
                totalCartItem: totalCartItem,
                total: totalAmount,
            }
        })
    };

    const increaseProduct = (id:any) => {
        const cloneCart = [...cart];
        const index = cloneCart.findIndex((item) => {
            return item.productCart.id === id;
        });
        if (index != -1) {
            cloneCart[index].quantity++;
            totalAmount += cloneCart[index].productCart.price;
            totalCartItem++;
        }
        dispatch({
            type: ACTION.INCREASE_PRODUCT,
            payload: {
                cart: cloneCart,
                totalCartItem: totalCartItem,
                total: totalAmount,
            }
        })
    }

    const decreaseProduct = (id:any) => {
        const cloneCart = [...cart];
        const index = cloneCart.findIndex((item) => {
            return item.productCart.id === id;
        });
        if (index != -1) {
            if (cloneCart[index].quantity > 0) {
                cloneCart[index].quantity--;
                totalAmount -= cloneCart[index].productCart.price;
                totalCartItem--;
            }

            if (cloneCart[index].quantity === 0) {
                cloneCart.splice(index, 1);
            }

        }
        dispatch({
            type: ACTION.DECREASE_PRODUCT,
            payload: {
                cart: cloneCart,
                totalCartItem: totalCartItem,
                total: totalAmount,
            }
        })
    }
    const renderItem = () => rows.map((row: any) => (
        <tr>
            <td data-label="Name">{row.productCart.name}</td>
            <td data-label="Age">{row.productCart.catelogy}</td>
            <td data-label="Job">{row.productCart.price}</td>
            <td data-label="Job">
                <img width="80px" src={row.productCart.img}></img>
            </td>
            <td data-label="Job">{row.quantity}</td>
            <Button onClick={() => increaseProduct(row.productCart.id)} >+</Button>
            <Button onClick={() => decreaseProduct(row.productCart.id)} >-</Button>
            <Button onClick={() => removeCart(row.productCart.id)}> Delete</Button>
        </tr>
    ))
    return (
        <table className="ui celled table">
            <thead>
                <tr><th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Img</th>
                    <th>Quantity</th>
                    <th>Option</th>
                </tr></thead>
            <tbody>
                {renderItem()}
            </tbody>
            <div>Total mount: {total}</div>
        </table>
        
    )
}

export default ShoppingCart