import { Link, Redirect } from 'react-router-dom';
import { Button, Image, Table } from 'semantic-ui-react';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../Configs/store";
import { deleteProduct } from '../../Redux/Action/productAction';

const ManageProduct = () => {
    const customer = useSelector((state: RootState) => state.userReducer.credentials);

    let authen = {
        role: "",
    }

    if (customer != null) {
        authen = customer;
    }
    const dispatch = useDispatch();

    const listProduct = useSelector((state: RootState) => state.productReducer.productList);

    const removeProduct = (productId: any) => {
        dispatch(deleteProduct(productId));
        console.log(productId);
    }
    const renderProduct = () => listProduct.map((product: any, index: any) => (
        <Table.Row>
            <Table.Cell>{product.name}</Table.Cell>
            <Table.Cell>{product.price}</Table.Cell>
            <Table.Cell>{product.catelogy}</Table.Cell>
            <Table.Cell>{product.dateCreate}</Table.Cell>
            <Table.Cell>
                <Image src={product.img} size='tiny' verticalAlign='middle' />
            </Table.Cell>
            <Table.Cell>
                <Link to={{ pathname: "/productDetail", state: product }}>View</Link>
            </Table.Cell>
            <Table.Cell>
                <Button basic color="red" onClick={() => removeProduct(product.id)}>Delete</Button>
            </Table.Cell>
        </Table.Row>
    ))
    return (
        <div>
            {authen.role === "Admin" ? <Table singleLine>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Price</Table.HeaderCell>
                    <Table.HeaderCell>Category</Table.HeaderCell>
                    <Table.HeaderCell>Date Create</Table.HeaderCell>
                    <Table.HeaderCell>Img</Table.HeaderCell>
                    <Table.HeaderCell></Table.HeaderCell>
                    <Table.HeaderCell></Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {renderProduct()}
            </Table.Body>
        </Table> : <Redirect to="/signin"></Redirect>}
        </div>
    )
}

export default ManageProduct
