import React, { useState, useRef, useEffect } from "react";
import "react-chat-widget/lib/styles.css";
import axios from "axios";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { Widget, addResponseMessage } from "react-chat-widget";
import { useSelector } from "react-redux";
import { RootState } from "../../Configs/store";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
export default function Chat() {
  interface message {
    idconnection:string,
    name: string | null;
    text: string;
  }
  
  interface userConnected {
    idConnected:string
  }

  const classes = useStyles();
  const [selectUserOnline, SetselectUserOnline] = useState<string>('');
  const [userOnline,setUserOnline] = useState<userConnected[]>([]);

  const handleChange = (event:any) => {
    SetselectUserOnline(event.target.value);
  };

  const [listUser, setListUser] = useState<string[]>([]);

  const customer: any = useSelector(
    (state: RootState) => state.userReducer.credentials
  );
  const handleNewUserMessage = (newMessage: any) => {
    const mess: message = {
      idconnection:selectUserOnline,
      name: customer.userName,
      text: newMessage,
    };
    sendmessage(mess);
  };

  useEffect(() => {
    const connection = new HubConnectionBuilder()
      .withUrl("https://localhost:44381/hubs/chat")
      .withAutomaticReconnect()
      .build();
    connection
      .start()
      .then((rs) => {
        console.log("Connected!");
        connection.on("GetUserOnline", (idConnection) => {
          // fotmatMess(message);
          setListUser((state) => [...state, idConnection]);
          axios.get("https://localhost:44381/api/chat")
          .then(rs=>{         
            setUserOnline([...rs.data])
          });
        });

        connection.on("GetUserDisconnect", (idConnection) => {
          setListUser(listUser.filter((item) => item !== idConnection));
        });

        connection.on("ReceiveMessage", (message) => {
          console.log(message);
          fotmatMess(message)
        });

      })     
      .catch((e) => {
        console.log(e);
      });  
  }, []);

  const fotmatMess = (user: any) => {
    addResponseMessage("[" + user.name + "] : " + user.text);
  };

  const sendmessage = async (userSignin: any) => {
    try {
      await axios
        .post("https://localhost:44381/api/chat/privateMessage", userSignin)
        .catch((e) => {
          console.log(e);
        });
    } finally {
    }
  };
  return (
    <div>
      {customer ? <Widget handleNewUserMessage={handleNewUserMessage} /> : null}

      <FormControl className={classes.formControl} >
        <InputLabel   id="demo-simple-select-label">List OnlineUser</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectUserOnline}
          onChange={handleChange}         
        >
          {userOnline.map((item) => <MenuItem value={item.idConnected}>{item.idConnected}</MenuItem>) }
        </Select>
      </FormControl>
    </div>
  );
}
