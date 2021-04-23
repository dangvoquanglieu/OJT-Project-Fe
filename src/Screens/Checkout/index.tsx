import { useSelector } from "react-redux";
import { Redirect } from "react-router";
import { Button } from "semantic-ui-react";
import { RootState } from "../../Configs/store";



const Checkout = () => {
    const customer = useSelector((state: RootState) => state.userReducer.credentials);
    const rows = useSelector((state: RootState) => state.shoppingCartReducer.cart);
    const total = useSelector((state: RootState) => state.shoppingCartReducer.totalAmount);
    let userLogin = {
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        phoneNumber: "",
    };
    if (customer != null) {
        userLogin = customer;
    }

    const renderItem = () => rows.map((row: any) => (
        <tr>
            <td data-label="Name">{row.productCart.name}</td>
            <td data-label="Age">{row.productCart.catelogy}</td>
            <td data-label="Job">{row.productCart.price}</td>
            <td data-label="Job">
                <img width="80px" src={row.productCart.img}></img>
            </td>
            <td data-label="Job">{row.quantity}</td>
        </tr>
    ))
    return (
        <div>
            {customer === null ? <Redirect to="/signin"></Redirect> :
                <div>
                    <h1>{userLogin.firstName + " "}{userLogin.lastName + " (+84)"} {userLogin.phoneNumber + " "} {userLogin.address} </h1>
                    <table className="ui celled table">
                        <thead>
                            <tr><th>Name</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Img</th>
                                <th>Quantity</th>

                            </tr></thead>
                        <tbody>
                            {renderItem()}
                        </tbody>
                        <div>Total mount: {total}</div>
                    </table>
                    <div>
                        <Button>Pay</Button>
                    </div>
                </div>
            }

        </div>
    )
}

export default Checkout