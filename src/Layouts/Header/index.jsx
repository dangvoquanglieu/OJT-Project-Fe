import React, { useState } from 'react';
import { Button, Menu, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import {useDispatch} from "react-redux";
import {logoutUser} from "../../Redux/Action/userAction"

const HeaderLayout = () => {
    //lấy đối tượng người dùng đăng nhập từ store
    const customer = useSelector((state => state.userReducer.credentials));

    const dispatch = useDispatch();

    //Hàm logout
    const logout = () => {
        console.log(customer);
        dispatch(logoutUser())
    }
    return (
        //nếu customer = null (người dùng chưa signin) thì hiển thị hai button signin, signup trên header
        //nếu customer != null (người dùng đã signin) thì hiển thị firstName (dropdown có chức năng logout)
        <Menu size='massive'>
            {customer === null ?
                <Menu.Menu position='right'>
                    <Menu.Item>
                        <Link to={{ pathname: "/signin" }}>
                            <Button>Sign In</Button>
                        </Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link to={{ pathname: "/signup" }}>
                            <Button>Sign Up</Button>
                        </Link>
                    </Menu.Item>
                </Menu.Menu> :
                <Menu.Menu position='right'> <Menu.Item>
                        <Dropdown text={customer.firstName}>
                            <Dropdown.Menu>
                                <Dropdown.Item text='Logout' onClick={logout}/>
                            </Dropdown.Menu>
                        </Dropdown>
                </Menu.Item></Menu.Menu>
            }
        </Menu>  
    )
}
export default HeaderLayout
