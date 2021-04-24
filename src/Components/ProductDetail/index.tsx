import { Link } from "react-router-dom"
import { Button, Form, Grid, Header, Icon, Image, Message, Segment, Select } from "semantic-ui-react"
import React, { useState } from 'react';
const ProductDetail = ({ location }: any) => {
    const productCurrent = {
        name: "",
        price: "",
        category: "",
        dateCreate: new Date().toLocaleString(),
        img: "",
    }
    const [product, setProduct] = useState(location.state);
    return (
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' color='teal' textAlign='center'>
                    <Icon className="edit" /> Update Product
                        </Header>
                <Form size='large'>
                    <Segment stacked>
                        <Form.Input
                            
                            name="name"
                            fluid icon='info'
                            iconPosition='left'
                            placeholder='Name'
                            value={product.name}
                        ></Form.Input>
                        <Form.Input
                            required
                            type="number"
                            name="price"
                            fluid icon='money bill alternate'
                            iconPosition='left'
                            placeholder='Price'
                            value={product.price}
                        />
                        <Select placeholder="Select Category">
                            <Select.Menu>
                                <Select.Item>Lieu</Select.Item>
                                <Select.Item>Lieu</Select.Item>
                            </Select.Menu>

                        </Select>
                        <Form.Input
                            required
                            name="createDate"
                            fluid icon='calendar alternate'
                            iconPosition='left'
                            value={product.dateCreate}
                        />
                        <Form.Input type="file" required name="img" fluid icon='file image' iconPosition='left' placeholder='Image' />

                        <Button type="submit" color='teal' fluid size='large'>
                            Save
                                </Button>
                    </Segment>
                </Form>
                <Message>
                    <Link to="/manageProduct">Manage Product</Link>
                </Message>
            </Grid.Column>
        </Grid>
    )
}

export default ProductDetail