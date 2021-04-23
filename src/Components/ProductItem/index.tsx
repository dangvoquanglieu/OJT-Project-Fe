import { Button } from "semantic-ui-react";
import { useSelector } from "react-redux";
import { RootState } from "../../Configs/store";
import { useDispatch } from "react-redux";
import { ACTION } from "../../Redux/ActionType/actionType";
import { Link } from 'react-router-dom';

const ProductItem = ({ product }: any) => {
    const dispatch = useDispatch();
    const cart = useSelector((state: RootState) => state.shoppingCartReducer.cart);
    let totalCartItem = useSelector((state: RootState) => state.shoppingCartReducer.totalCartItem);
    let totalAmount = useSelector((state: RootState) => state.shoppingCartReducer.totalAmount);
    const addToCart = () => {
        const cloneCart = [...cart];
        const cartItem = {
            productCart: product,
            quantity: 1,
        };

        const index = cloneCart.findIndex((item) => {
            return item.productCart.id === product.id;
        });

        if (index === -1) {
            cloneCart.push(cartItem);
            totalAmount += cartItem.productCart.price;
        }
        else {
            cloneCart[index].quantity++;
            totalAmount += cloneCart[index].productCart.price;
        }
        totalCartItem = totalCartItem + 1;
        console.log(cloneCart);
        dispatch({
            type: ACTION.ADD_CART,
            payload: {
                cart: cloneCart,
                totalCartItem: totalCartItem,
                total: totalAmount,
            }
        })
    };
    return (
        <div className="card">
            <div className="image">
                <img src={product.img} />
            </div>
            <div className="content">
                <div className="header">{product.name}</div>
                <div className="meta">
                    <a>{product.price}</a>
                </div>
                <div className="description">
                    {product.catelogy}
                </div>
            </div>
            <div className="extra content">
                <Link to={{ pathname: "/shoppingCart" }} >
                    <Button onClick={addToCart}>Add To Cart</Button>
                </Link>
            </div>
        </div>
    )
}

export default ProductItem