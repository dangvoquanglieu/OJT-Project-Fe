import { Button, Form, Header, Grid, Segment, Message, Image } from 'semantic-ui-react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { sendInforUserSignin } from '../../Redux/Action/userAction';
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../Configs/store";
// import styles from "./signin.module.css";
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

        <div>
            {customer === null ? <div>
                <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Header as='h2' color='teal' textAlign='center'>
                            <Image src='https://react.semantic-ui.com/logo.png' /> Log-in to your account
                        </Header>
                        <Form size='large' onSubmit={signIn}>
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

                                <Button type="submit" color='teal' fluid size='large'>
                                    Login
                                </Button>
                            </Segment>
                        </Form>
                        <Message>
                            New to us? <a href='/signup'>Sign Up</a>
                        </Message>
                    </Grid.Column>
                </Grid>
            </div> : <Redirect to="/"></Redirect>}

        </div>
    )
}

export default Signin