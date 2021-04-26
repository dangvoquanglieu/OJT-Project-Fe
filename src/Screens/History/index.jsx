import { Table, Rating } from 'semantic-ui-react';
import { useSelector } from "react-redux";
import { RootState } from "../../Configs/store";
import { Redirect } from 'react-router';

const History = () => {
    const customer = useSelector((state: RootState) => state.userReducer.credentials);
    const orderHistory = useSelector((state: RootState) => state.historyReducer.order);

    const renderItem = () => orderHistory.map((item) => (
        <Table.Row>
            <Table.Cell>
                {item.id}
            </Table.Cell>
            <Table.Cell singleLine>{item.userName}</Table.Cell>
            <Table.Cell>
                <Rating icon='star' defaultRating={3} maxRating={3} />
            </Table.Cell>
            <Table.Cell textAlign='left'>
                {item.total}
            </Table.Cell>
            <Table.Cell>
                {item.cart.map(product => (
                    <span>{product.productName + "/" + product.price + "/" + product.amount}<br></br></span>
                ))}
            </Table.Cell>
        </Table.Row>
    ))
    let authen = {
        role: "",
        userName: "",
    }
    if (customer !== null) {
        authen = customer
    }

    return (
        <div>
            {authen.role === "Customer" ? <Table celled padded>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell singleLine>ID Order</Table.HeaderCell>
                        <Table.HeaderCell>UserName</Table.HeaderCell>
                        <Table.HeaderCell>Efficacy</Table.HeaderCell>
                        <Table.HeaderCell>Total</Table.HeaderCell>
                        <Table.HeaderCell>Product</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {renderItem()}
                </Table.Body>
            </Table> : <Redirect to="/signin"></Redirect>}
        </div>
    )
}

export default History;