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
import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { sendInforUserSignin } from "../../Redux/Action/userAction";
import axios from "axios";
import { HubConnectionBuilder } from "@microsoft/signalr";
import "react-chat-widget/lib/styles.css";
import { useHistory  } from 'react-router-dom';
import { Redirect } from "react-router";


const Ren = (user: any) => {
  return (
    <div>
      <h1>{user.userName}</h1>
      <h1>{user.password}</h1>
    </div>
  );
};

interface message {
  name: string;
  text: string;
}

const Signin = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  //khởi tạo đối tượng
  interface userSigninCurrent {
    username: string;
    password: string;
  }

  const [chat, setChat] = useState<userSigninCurrent[]>([]);
  const [content, setContent] = useState<Array<string>>([]);

  // const handleNewUserMessage = (newMessage: any) => {
  //   const mess:message={
  //     name:"huy",
  //     text:newMessage
  //   }
  //   sendmessage(mess);
  // };

  // const fotmatMess=(user:any)=>{
  //   addResponseMessage("["+user.name+"] : "+user.text);
  // }
  

  // useEffect(() => {
  //   const connection = new HubConnectionBuilder()
  //     .withUrl("https://localhost:44381/hubs/chat")
  //     .withAutomaticReconnect()
  //     .build();

  //     connection
  //     .start()
  //     .then((rs) => {
  //       console.log("Connected!");
  //       connection.on("ReceiveMessage", (message) => {
  //         fotmatMess(message);         
  //       });
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // }, []);

  //tạo state và hàm setState user signin
  const [userSignin, setUserSignin] = useState<userSigninCurrent[]>([]);
  //hàm xử lý form
  const changeInputValue = (event: any) => {
    const { name, value } = event.target;
    setUserSignin({ ...userSignin, [name]: value });
  };
  // const sendmessage = async (userSignin: any) => {
  //   try {
  //     await axios
  //       .post("https://localhost:44381/api/chat/messages", userSignin)
  //       .catch((e) => {
  //         console.log(e);
  //       });
  //   } finally {
  //   }
  // };
  //hàm signin
  const signIn = () => {
    dispatch(sendInforUserSignin(userSignin));
   history.replace("/chat");
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
              <Form.Field className={Styles.customFormFiled}>
                <Form.Input
                  error={{ content: "asdasdasd", pointing: "left" }}
                  input={
                    <input
                      required
                      name="UserName"
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
                      name="Password"
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

        <Grid.Column>
          <h1>{content}</h1>
        </Grid.Column>
      </Grid.Row>
      {/* <Widget handleNewUserMessage={handleNewUserMessage} /> */}
    </Grid>
  );
};

export default Signin;
