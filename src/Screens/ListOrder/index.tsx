import React, { useEffect,useState } from "react";
import { Table,Button, Item } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import { getListOrder } from "../../Redux/Action/shoppingCartAction";
import { RootState } from "../../Configs/store";
import { confirmOrder } from "../../Redux/Action/shoppingCartAction";


export default function ListOrder() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getListOrder());
  },[] );

  const listOrder: any = useSelector(
    (state: RootState) => state.historyReducer.order
  );

  const handleConfirm = (id:any,order:any) =>{   
      dispatch(confirmOrder(id,order));
  }

  if(listOrder == null){
      return <div>Loading...</div>;
  }
  return (
    <div> 
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
              <Table.Cell>{item.cart.map((it:any,k:any)=><p key={k}>{it.productName}/{it.amount}/{it.price}</p>)}</Table.Cell> 
              <Table.Cell>{item.status==="Unconfimred" ? <Button onClick={()=>handleConfirm(item.id,item)} color='teal'>Confirm</Button>:"Confirmed"}</Table.Cell>            
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
