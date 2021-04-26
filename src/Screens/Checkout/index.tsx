import { useSelector } from "react-redux";
import { Redirect } from "react-router";
import { Button, Header, Icon, Image, Table } from "semantic-ui-react";
import { RootState } from "../../Configs/store";
import {createOrder} from "../../Redux/Action/shoppingCartAction";

const Checkout = () => {
    const customer = useSelector((state: RootState) => state.userReducer.credentials);
    const rows = useSelector((state: RootState) => state.shoppingCartReducer.cart);
    const totalAmount = useSelector((state: RootState) => state.shoppingCartReducer.totalAmount);
    let userLogin = {
        userName: "",
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        phoneNumber: "",
        role: "",
    };
    if (customer != null) {
        userLogin = customer;
    }

    const renderItem = () => rows.map((row: any) => (
        <Table.Row>
            <Table.Cell>
                <Image src={row.productCart.img} size='tiny' verticalAlign='middle' />{' '}
                <span> {row.productCart.name}</span>
            </Table.Cell>
            <Table.Cell>{row.productCart.catelogy}</Table.Cell>
            <Table.Cell>{row.productCart.price}</Table.Cell>
            <Table.Cell>{row.quantity}</Table.Cell>
        </Table.Row>
    ))

    const order = () => {
        const order = {
            userName: userLogin.userName,
            adress: userLogin.address,
            phone: userLogin.phoneNumber,
            total: totalAmount,
            cart: [{}],
        }
        rows.map( (item:any) => {
            order.cart.push({
                idProduct: item.productCart.id,
                productName: item.productCart.name,
                amount: item.quantity,
                price: item.productCart.price,
            })
        })
        console.log(order);
        createOrder(order);
    }
    return (
        <div>
            {userLogin.role !== "Customer" ? <Redirect to="/signin"></Redirect> :
                <div>
                    <Table celled compact definition>
                        <Table.Header fullWidth>
                            <Table.Row>
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
                                <Table.HeaderCell colSpan='4'>
                                    <div>
                                        <Header as='h2' icon textAlign='center'>
                                            <Icon name='users' circular />
                                            <Header.Content>{userLogin.firstName + " " + userLogin.lastName}</Header.Content>
                                            <Header.Subheader>
                                                {userLogin.email + "/" + userLogin.phoneNumber}
                                            </Header.Subheader>
                                            <Header.Subheader>
                                                {userLogin.address}
                                            </Header.Subheader>
                                        </Header>
                                    </div>
                                    {/* <Link to={{ pathname: "/checkOut" }}> */}
                                    <Button
                                        floated='right'
                                        icon
                                        labelPosition='left'
                                        size='small'
                                        color='teal'
                                        onClick={order}
                                    >
                                        <Icon name='payment' />Order</Button>
                                    {/* </Link> */}
                                    <Button color='black' floated='right' disabled size='small'>Total mount: {totalAmount}</Button>
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Footer>
                    </Table>
                </div>
            }
        </div>
    )
}

export default Checkout