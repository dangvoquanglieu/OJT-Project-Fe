import { Button, Card, Header, Image, Grid, Rating } from "semantic-ui-react";
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
        <Grid.Column>
            <Card>
                {/* <Card.Content> */}
                <Image src={product.img} size='big' />
                <Card.Content textAlign="center">
                    <Card.Header textAlign="center">{product.name}</Card.Header>
                    <Card.Meta textAlign="center">
                        <span>{product.price}</span>
                    </Card.Meta>
                    <Card.Description textAlign="center">
                        <Rating icon='star' defaultRating={5} maxRating={5} />
                    </Card.Description>
                </Card.Content>
                <Card.Content textAlign="center">
                    <Link to={{ pathname: "/shoppingCart" }} >
                        <Button nverted color='teal' onClick={addToCart}>Add To Cart</Button>
                    </Link>
                </Card.Content>
            </Card>
        </Grid.Column>
    )
}

export default ProductItem