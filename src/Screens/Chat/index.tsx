import React, { useState ,useRef, useEffect } from 'react';
import "react-chat-widget/lib/styles.css";
import axios from "axios";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { Widget, addResponseMessage } from "react-chat-widget";
import { useSelector } from "react-redux";
import { RootState } from '../../Configs/store';

export default function Chat() {
    interface message {
        name: string|null;
        text: string;
      }
    
      console.log("is Render");
    
    
      const customer:any = useSelector((state:RootState) => state.userReducer.credentials);
      console.log(customer);
      const handleNewUserMessage = (newMessage: any) => {
         
        const mess:message={
            name:customer.userName,
            text:newMessage     
      }
        sendmessage(mess);
        console.log("is request")      ;
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

           

            connection.on("ReceiveMessage", (message) => {
              fotmatMess(message);               
            });
          })
          .catch((e) => {
            console.log(e);
          });

        var listID:any = axios.get("https://localhost:44381/api/chat").then(rs=>{listID=rs.data;console.log(rs.data)}).catch(err=>console.log(err));
        
      }, []);
    
      const fotmatMess=(user:any)=>{
        addResponseMessage("["+user.name+"] : "+user.text);
      }

      const sendmessage = async (userSignin: any) => {
        try {
          await axios
            .post("https://localhost:44381/api/chat/messages", userSignin)
            .catch((e) => {
              console.log(e);
            });
        } finally {
        }
      };
    return (
        <div>
             {customer?<Widget handleNewUserMessage={handleNewUserMessage}/>:null}
            
        </div>
    )
}
