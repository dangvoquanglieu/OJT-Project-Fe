import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../Configs/store";
import { Button, Checkbox, Header, Icon, Image, Table } from "semantic-ui-react";
import { ACTION } from "../../Redux/ActionType/actionType";
import { Link, Redirect } from "react-router-dom";

const ShoppingCart = () => {
    const customer = useSelector((state: RootState) => state.userReducer.credentials);
    const cart = useSelector((state: RootState) => state.shoppingCartReducer.cart);
    let totalCartItem = useSelector((state: RootState) => state.shoppingCartReducer.totalCartItem);
    let totalAmount = useSelector((state: RootState) => state.shoppingCartReducer.totalAmount);
    const rows = useSelector((state: RootState) => state.shoppingCartReducer.cart);
    const total = useSelector((state: RootState) => state.shoppingCartReducer.totalAmount);
    const dispatch = useDispatch();
    const removeCart = (id: any) => {
        const cloneCart = [...cart]
        const index = cloneCart.findIndex((item) => {
            return item.productCart.id === id;
        });
        console.log(index);
        console.log(id);
        if (index !== -1) {
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

    const increaseProduct = (id: any) => {
        const cloneCart = [...cart];
        const index = cloneCart.findIndex((item) => {
            return item.productCart.id === id;
        });
        if (index !== -1) {
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

    const decreaseProduct = (id: any) => {
        const cloneCart = [...cart];
        const index = cloneCart.findIndex((item) => {
            return item.productCart.id === id;
        });
        if (index !== -1) {
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
        <Table.Row>
            <Table.Cell collapsing>
                <Checkbox slider onClick={() => removeCart(row.productCart.id)} />
            </Table.Cell>
            <Table.Cell>
                <Image src={row.productCart.img} size='tiny' verticalAlign='middle' />{' '}
                <span> {row.productCart.name}</span>
            </Table.Cell>
            <Table.Cell>{row.productCart.catelogy}</Table.Cell>
            <Table.Cell>{row.productCart.price}</Table.Cell>
            <Table.Cell>
                <Button.Group>
                    <Button
                        icon
                        size='small'
                        basic
                        color='teal'
                        onClick={() => increaseProduct(row.productCart.id)}
                    >
                        <Icon name='plus' /></Button>
                    <Button basic color='teal'>{row.quantity}</Button>
                    <Button
                        icon
                        size='small'
                        basic
                        color='teal'
                        onClick={() => decreaseProduct(row.productCart.id)}
                    >
                        <Icon name='minus' /></Button>
                </Button.Group>
            </Table.Cell>
        </Table.Row>
    ))
    return (
        <div>
            {customer === null ? <Redirect to="/signin"></Redirect> :
                <div>
                    <Header as='h2' icon textAlign='center'>
                        <Icon name='shopping cart' circular />
                        <Header.Content>Shopping Cart</Header.Content>
                    </Header>
                    <Table celled compact definition>
                        <Table.Header fullWidth>
                            <Table.Row>
                                <Table.HeaderCell>Delete</Table.HeaderCell>
                                <Table.HeaderCell>Name</Table.HeaderCell>
                                <Table.HeaderCell>Category</Table.HeaderCell>
                                <Table.HeaderCell>Price</Table.HeaderCell>
                                <Table.HeaderCell>Quantity</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>

                            {renderItem()}
                        </Table.Body>

                        <Table.Footer fullWidth>
                            <Table.Row>
                                <Table.HeaderCell />
                                <Table.HeaderCell colSpan='4'>
                                    <Link to={{ pathname: "/checkOut" }}>
                                        <Button
                                            floated='right'
                                            icon
                                            labelPosition='left'
                                            size='small'
                                            color='teal'
                                        >
                                            <Icon name='payment' /> Checkout</Button>
                                    </Link>
                                    <Button color='black' floated='right' disabled size='small'>Total mount: {total}</Button>
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Footer>
                    </Table>
                </div>
            }

        </div>
    )
}

export default ShoppingCart