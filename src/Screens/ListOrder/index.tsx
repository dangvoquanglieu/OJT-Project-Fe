import React, { useEffect, useState } from "react";
import { Table, Button, Item } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import { getListOrder } from "../../Redux/Action/shoppingCartAction";
import { RootState } from "../../Configs/store";
import { confirmOrder } from "../../Redux/Action/shoppingCartAction";
import { HubConnectionBuilder } from "@microsoft/signalr";
import ReactNotification from "react-notifications-component";
import 'react-notifications-component/dist/theme.css'
import { store } from 'react-notifications-component';

export default function ListOrder() {
  const [mess, setMess] = useState<any>("");
  const dispatch = useDispatch();


  const showNotifycation = (mess:any) =>
    store.addNotification({
        title: "Notify!",
        message: mess.message,
        type: "success",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true
        }
      });
  

  useEffect(() => {
    dispatch(getListOrder());
  }, []);

  const listOrder: any = useSelector(
    (state: RootState) => state.historyReducer.order
  );

  const handleConfirm = (id: any, order: any) => {
    dispatch(confirmOrder(id, order));
  };

  useEffect(() => {
    const connection = new HubConnectionBuilder()
      .withUrl("https://localhost:44381/hubs/messages")
      .withAutomaticReconnect()
      .build();
    connection
      .start()
      .then((rs) => {
        console.log("Connected!");

        connection.on("ReceiveMessage", (message) => {   
           showNotifycation(message)        
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  if (listOrder == null) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <ReactNotification />
      <Table striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>User Name</Table.HeaderCell>
            <Table.HeaderCell>Adress</Table.HeaderCell>
            <Table.HeaderCell>Phone</Table.HeaderCell>
            <Table.HeaderCell>Total</Table.HeaderCell>
            <Table.HeaderCell>Detail</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {listOrder.map((item: any, index: any) => (
            <Table.Row key={index}>
              <Table.Cell>{item.userName}</Table.Cell>
              <Table.Cell>{item.adress}</Table.Cell>
              <Table.Cell>{item.phone}</Table.Cell>
              <Table.Cell>{item.total}</Table.Cell>
              <Table.Cell>
                {item.cart.map((it: any, k: any) => (
                  <p key={k}>
                    {it.productName}/{it.amount}/{it.price}
                  </p>
                ))}
              </Table.Cell>
              <Table.Cell>
                {item.status === "Unconfimred" ? (
                  <Button
                    onClick={() => handleConfirm(item.id, item)}
                    color="teal"
                  >
                    Confirm
                  </Button>
                ) : (
                  "Confirmed"
                )}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
