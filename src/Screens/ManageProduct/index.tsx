import React from 'react';
import { Link } from 'react-router-dom';
import { Image, Table } from 'semantic-ui-react';
import { useSelector } from "react-redux";
import { RootState } from "../../Configs/store"

const ManageProduct = () => {
    const listProduct = useSelector((state: RootState) => state.productReducer.productList);
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
                <Link to={{pathname:"/productDetail", state:product}}>View</Link>
            </Table.Cell>
        </Table.Row>
    ))
    return (
        <Table singleLine>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Price</Table.HeaderCell>
                    <Table.HeaderCell>Category</Table.HeaderCell>
                    <Table.HeaderCell>Date Create</Table.HeaderCell>
                    <Table.HeaderCell>Img</Table.HeaderCell>
                    <Table.HeaderCell></Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {renderProduct()}
            </Table.Body>
        </Table>
    )
}

export default ManageProduct
