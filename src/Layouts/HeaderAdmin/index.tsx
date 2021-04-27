import { Menu, Dropdown, Input} from 'semantic-ui-react';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../Redux/Action/userAction";
import { RootState } from "../../Configs/store";
import { Link } from 'react-router-dom';

const HeaderLayout = () => {
    //lấy đối tượng người dùng đăng nhập từ store;
    const customer = useSelector((state: RootState) => state.userReducer.credentials);
    let name = {
        firstName: ""
    };
    if (customer != null) {
        name = customer;
    }
    const dispatch = useDispatch();
    //Hàm logout
    const logout = () => {
        dispatch(logoutUser())
    }
    return (
        <Menu color="teal" inverted>
            <Menu.Item>
                <img src='https://react.semantic-ui.com/logo.png' />
            </Menu.Item>

            <Menu.Item>
                <Link to="/">
                    <span>Home</span>
                </Link>
            </Menu.Item>
            <Menu.Item>
                <Link to="/manageProduct">
                    <span>Manage Product</span>
                </Link>
            </Menu.Item>
            <Menu.Item>
                <Link to="/createProduct">
                    <span>Create Product</span>
                </Link>
            </Menu.Item>
            <Menu.Item>
                <Link to="/adminOrder">
                    <span>List order</span>
                </Link>
            </Menu.Item>
            {customer === null ?
                <Menu.Menu position='right'>

                    <Menu.Item>
                        <Link to="/signin">
                            <span>Signin</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link to="/signup">
                            <span>SignUp</span>
                        </Link>
                    </Menu.Item>
                </Menu.Menu> :
                <Menu.Menu position='right'>
                    <Menu.Item>
                        <Input icon='search' placeholder='Search...' />
                    </Menu.Item>
                    <Menu.Item>
                        <Dropdown text={name.firstName}>
                            <Dropdown.Menu>
                                <Dropdown.Item text='Notification' />
                                <Dropdown.Item text='Logout' onClick={logout} />
                            </Dropdown.Menu>
                        </Dropdown>
                    </Menu.Item>
                </Menu.Menu>
            }
        </Menu>
    )
}
export default HeaderLayout
