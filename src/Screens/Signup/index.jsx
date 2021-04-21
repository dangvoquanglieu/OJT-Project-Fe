import React, { useState } from 'react'
import { Form, Label, Input, Button, Container, Header } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { sendInforUserSignup } from '../../Redux/Action/userAction';
import { Link } from 'react-router-dom';

const Signup = () => {

    const dispatch = useDispatch();

    //khởi tạo đối tượng user
    const currentUser = {
        userName: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        phoneNumber: "",
        role: "Customer"
    };
    //tạo state và hàm setState cho đối tượng user signup
    const [userSignup, setUserSignup] = useState(currentUser);

    //tạo state và hàm setState cho biến xác định confirm password
    const [equalPass, setEqualPass] = useState(true);

    //hàm xử lý form 
    const changeInputValue = (event) => {
        const { name, value } = event.target
        setUserSignup({ ...userSignup, [name]: value });
    }
    const signUp = () => {
        //nếu password chưa được confirm thì setEqualPass = false, ngược lại bằng true
        //nếu password được confirm thì mới thực hiện hàm dispatch => chức năng signUp
        if (userSignup.password === userSignup.confirmPassword) {
            setEqualPass(true);
            dispatch(sendInforUserSignup(userSignup));
        } else {
            setEqualPass(false);
        }
    }
    return (
        <Container>
            <Header as="h1" content="Sign Up"></Header>
            <Form>
                <Form.Group widths='equal'>
                    <Form.Field>
                        <Label>User Name</Label>
                        <Input required name="userName" onChange={changeInputValue} placeholder='User Name' />
                    </Form.Field>
                    <Form.Field>
                        <Label>Password</Label>
                        <Input type="password" required name="password" onChange={changeInputValue} placeholder='Password' />
                    </Form.Field>
                </Form.Group>
                <Form.Group widths='equal'>
                    <Form.Field>
                        <Label>Confirm Password</Label>
                        <Input type="password" required name="confirmPassword" onChange={changeInputValue} placeholder='Confirm Password' />
                        {equalPass === true ? "" : <Label basic color='red' pointing='left'>
                            Password not confirm
                        </Label>}
                    </Form.Field>
                    <Form.Field>
                        <Label>First Name</Label>
                        <Input required name="firstName" onChange={changeInputValue} placeholder='First Name' />
                    </Form.Field>
                </Form.Group>
                <Form.Group widths='equal'>
                    <Form.Field>
                        <Label>Last Name</Label>
                        <Input required name="lastName" onChange={changeInputValue} placeholder='Last Name' />
                    </Form.Field>
                    <Form.Field>
                        <Label>Email</Label>
                        <Input type="email" required name="email" onChange={changeInputValue} placeholder='Email' />
                    </Form.Field>
                </Form.Group>
                <Form.Group widths='equal'>
                    <Form.Field>
                        <Label>Address</Label>
                        <Input required name="address" onChange={changeInputValue} placeholder='Address' />
                    </Form.Field>
                    <Form.Field>
                        <Label>PhoneNumber</Label>
                        <Input required name="phoneNumber" onChange={changeInputValue} placeholder='PhoneNumber' />
                    </Form.Field>
                </Form.Group>
                {/* <Link to={{ pathname: "/signin" }}> */}
                    <Button onClick={signUp} positive >SignUp</Button>
                {/* </Link> */}
            </Form>
        </Container >
    )
}

export default Signup