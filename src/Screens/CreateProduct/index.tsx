import { useState } from "react";
import { Link, Redirect } from "react-router-dom"
import { Button, Form, Grid, Header, Icon, Message, Segment } from "semantic-ui-react";
import { createProduct } from '../../Redux/Action/productAction';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Configs/store";

const CreateProduct = () => {
    const customer = useSelector((state: RootState) => state.userReducer.credentials);

    let authen = {
        role: "",
    }

    if (customer != null) {
        authen = customer;
    }

    const dispatch = useDispatch();

    const productCurrent = {
        name: "",
        price: 0,
        catelogy: "",
        dateCreate: new Date().toLocaleString(),
        img: "",
    }

    const [product, setProduct] = useState(productCurrent);

    const changeInputValue = (event: any) => {
        const { name, value } = event.target;
        setProduct({ ...product, [name]: value });
    }

    const create = () => {
        product.price = Number.parseInt(product.price + "");
        console.log(product);
        dispatch(createProduct(product));
    }

    return (
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            {authen.role === "Admin" ? <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' color='teal' textAlign='center'>
                    <Icon className="edit" /> Create Product
                        </Header>
                <Form size='large' onSubmit={create}>
                    <Segment stacked>
                        <Form.Input
                            type="text"
                            name="name"
                            fluid icon='info'
                            iconPosition='left'
                            placeholder='Name'
                            required
                            onChange={changeInputValue}
                        ></Form.Input>
                        <Form.Input
                            required
                            type="number"
                            name="price"
                            fluid icon='money bill alternate'
                            iconPosition='left'
                            placeholder='Price'
                            onChange={changeInputValue}
                        />
                        <Form.Input onChange={changeInputValue} required name="img" fluid icon='file image' iconPosition='left' placeholder='Image' />
                        <Form.Input
                            required
                            name="catelogy"
                            fluid icon='audio description'
                            iconPosition='left'
                            placeholder='Description'
                            onChange={changeInputValue}
                        />
                        <Button type="submit" color='teal' fluid size='large'>
                            Save
                                </Button>
                    </Segment>
                </Form>
                <Message>
                    <Link to="/manageProduct">Manage Product</Link>
                </Message>
            </Grid.Column> : <Redirect to="/signin"></Redirect>}
        </Grid>
    )
}

export default CreateProduct