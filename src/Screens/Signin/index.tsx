import {
  Container,
  Button,
  Form,
  Input,
  Label,
  Header,
  Grid,
} from "semantic-ui-react";
import Styles from "./signin.module.css";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { sendInforUserSignin } from "../../Redux/Action/userAction";

const Signin = () => {
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
    const { name, value } = event.target;
    setUserSignin({ ...userSignin, [name]: value });
  };

  //hàm signin
  const signIn = () => {
    dispatch(sendInforUserSignin(userSignin));
  };

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={10}>
          <div className={Styles.formCotent}>
            <Header as="h1" className={Styles.titleHeader}>
              {" "}
              Login
            </Header>
            <Header as="h3" className={Styles.subTitle}>
              {" "}
              Sign into your account
            </Header>
            <Form>
              <Form.Field className={Styles.customFormFiled} >
                <Form.Input error={{content:"asdasdasd", pointing: 'left'}}
                  input={
                    <input
                      required
                      name="userName"
                      onChange={changeInputValue}
                      placeholder="User Name"
                      type="text"
                      className={Styles.inputText}  
                    />
                  }
                ></Form.Input>
              </Form.Field>
              <Form.Field className={Styles.customFormFiled}>
                <Form.Input
                  input={
                    <input
                      required
                      name="password"
                      onChange={changeInputValue}
                      placeholder="Password"
                      type="password"
                      className={Styles.inputText}
                      id="password"
                    />
                  }
                ></Form.Input>
              </Form.Field>

              {/* <Link to={{ pathname: "/home" }}> */}
              <Button
                positive
                onClick={signIn}
                className={Styles.customBtn}
                type="submit"
              >
                SignIn
              </Button>
              {/* </Link> */}
            </Form>
          </div>
        </Grid.Column>

        <Grid.Column width={6}>
          <div className={Styles.areaImg}>
            <div className={Styles.content}>
              <h3>Welcome</h3>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy.
              </p>
            </div>
          </div>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default Signin;
