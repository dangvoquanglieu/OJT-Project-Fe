import { Container, Button, Form, Input, Label, Header } from 'semantic-ui-react';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { sendInforUserSignin } from '../../Redux/Action/userAction';
import { Link, Redirect } from "react-router-dom";
import { useSelector } from "react-redux"; 
import { RootState } from "../../Configs/store";
const Signin = () => {

    const customer = useSelector((state: RootState) => state.userReducer.credentials);
    const dispatch = useDispatch();

    //khởi tạo đối tượng 
    const userSigninCurrent = {
        userName: "",
        password: "",
    };

    //tạo state và hàm setState user signin
    const [userSignin, setUserSignin] = useState(userSigninCurrent);

    //hàm xử lý form
    const changeInputValue = (event: any) => {
        const { name, value } = event.target
        setUserSignin({ ...userSignin, [name]: value });
    }

    //hàm signin
    const signIn = () => {
        <Redirect to="/"></Redirect>
        dispatch(sendInforUserSignin(userSignin));
    }

    return (

        <Container>

            {customer === null ? <div>
                <Header as="h1" content="Login"></Header>
                <Form onSubmit={signIn}>
                    <Form.Field width='6'>
                        <Label>User Name</Label>
                        <Input required name="userName" onChange={changeInputValue} placeholder='User Name' />
                    </Form.Field>
                    <Form.Field width='6'>
                        <Label>Password</Label>
                        <Input required type="password" name="password" onChange={changeInputValue} placeholder='Password' />
                    </Form.Field>
                    {/* <Link to={{ pathname: "/" }}> */}
                    <Button positive type="submit">SignIn</Button>

                    {/* </Link> */}
                </Form>
            </div> : <Redirect to="/"></Redirect>}
        </Container>
    )
}

export default Signin