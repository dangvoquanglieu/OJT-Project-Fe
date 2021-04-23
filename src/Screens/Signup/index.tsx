import React, { useState } from 'react'
import { Container, Button, Form, Input, Label, Header, Grid, Segment, Message, Image } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { sendInforUserSignup } from '../../Redux/Action/userAction';
import { useSelector } from "react-redux";
import { RootState } from "../../Configs/store";
import { Redirect } from 'react-router';

const Signup = () => {
    const customer = useSelector((state: RootState) => state.userReducer.credentials);
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
    const [finishedSignup, setFinishedSignup] = useState(false);

    //hàm xử lý form 
    const changeInputValue = (event: any) => {
        const { name, value } = event.target
        setUserSignup({ ...userSignup, [name]: value });
    }
    const signUp = () => {
        //nếu password chưa được confirm thì setEqualPass = false, ngược lại bằng true
        //nếu password được confirm thì mới thực hiện hàm dispatch => chức năng signUp
        if (userSignup.password === userSignup.confirmPassword) {
            setEqualPass(true);
            dispatch(sendInforUserSignup(userSignup));
            setFinishedSignup(true);
        } else {
            setEqualPass(false);
        }
    }
    return (
        <Container>
            {finishedSignup === true ? <Redirect to="/signin"></Redirect> :
                <div>
                    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                        <Grid.Column style={{ maxWidth: 450 }}>
                            <Header as='h2' color='teal' textAlign='center'>
                                <Image src='https://react.semantic-ui.com/logo.png' /> Sign Up Account
                        </Header>
                            <Form size='large' onSubmit={signUp}>
                                <Segment stacked>
                                    <Form.Input required name="userName" onChange={changeInputValue} fluid icon='user' iconPosition='left' placeholder='UserName' />
                                    <Form.Input
                                        required
                                        fluid
                                        icon='lock'
                                        iconPosition='left'
                                        placeholder='Password'
                                        type='password'
                                        name="password"
                                        onChange={changeInputValue}
                                    />
                                    <Form.Input
                                        required
                                        fluid
                                        icon='lock'
                                        iconPosition='left'
                                        placeholder='Comfirm Password'
                                        type='password'
                                        name="confirmPassword"
                                        onChange={changeInputValue}
                                    />
                                    {equalPass === true ? "" : <Label basic color='red' pointing='left'>
                                        Password not confirm
                        </Label>}
                                    <Form.Input
                                        required
                                        fluid
                                        icon='spy'
                                        iconPosition='left'
                                        placeholder='First Name'
                                        name="firstName"
                                        onChange={changeInputValue}
                                    />

                                    <Form.Input
                                        required
                                        fluid
                                        icon='meh'
                                        iconPosition='left'
                                        placeholder='Last Name'
                                        name="lastName"
                                        onChange={changeInputValue}
                                    />

                                    <Form.Input
                                        required
                                        fluid
                                        icon='mail'
                                        iconPosition='left'
                                        placeholder='Email'
                                        type="email"
                                        name="email"
                                        onChange={changeInputValue}
                                    />

                                    <Form.Input
                                        required
                                        fluid
                                        icon='home'
                                        iconPosition='left'
                                        placeholder='Address'
                                        name="address"
                                        onChange={changeInputValue}
                                    />

                                    <Form.Input
                                        required
                                        fluid
                                        icon='phone'
                                        iconPosition='left'
                                        placeholder='PhoneNumber'
                                        name="phoneNumber"
                                        onChange={changeInputValue}
                                    />

                                    <Button type="submit" color='teal' fluid size='large'>
                                        Sing Up
                                </Button>
                                </Segment>
                            </Form>
                            <Message>
                                New to us? <a href='/signin'>Sign In</a>
                            </Message>
                        </Grid.Column>
                    </Grid>
                </div>
            }
        </Container >
    )
}

export default Signup