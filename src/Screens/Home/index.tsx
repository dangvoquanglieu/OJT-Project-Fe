import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Grid, Header, Icon, Image, Menu, Segment, Sidebar } from "semantic-ui-react";
import ProductItem from "../../Components/ProductItem";
import { RootState } from "../../Configs/store";
import { getOrder } from "../../Redux/Action/shoppingCartAction";

const Home = () => {
    const dispatch = useDispatch();
    const listProduct = useSelector((state: RootState) => state.productReducer.productList);
    const customer:any = useSelector((state: RootState) => state.userReducer.credentials);
    const renderProduct = () => listProduct.map((product: any, index: any) => (
        <ProductItem product={product}></ProductItem>
    ))
    let authen = {
        role: "",
        userName: "",
    }
    if (customer !== null) {
        authen = customer;
    }
    useEffect(() => {
        if (authen.role === "Customer") {
            dispatch(getOrder(authen.userName));
        }
    }, []);
    return (

        <Sidebar.Pushable as={Segment}>
            <Sidebar
                as={Menu}
                animation='overlay'
                icon='labeled'
                inverted
                vertical
                visible
                width='thin'
            >
                <Menu.Item as='a'>
                    <Icon name='sync alternate' />
                    ALL
                </Menu.Item>
                <Menu.Item as='a'>
                    <Icon name='arrow down' />
                    BOTTOMS
                </Menu.Item>
                <Menu.Item as='a'>
                    <Icon name='arrows alternate vertical' />
                    OUTERWEAR
                </Menu.Item>
                <Menu.Item as='a'>
                    <Icon name='arrow up' />
                    TOPS
                </Menu.Item>
                <Menu.Item as='a'>
                    <Link  to="/history" >
                        <Icon name='history' />
                    HISTORY
                    </Link>
                </Menu.Item>
            </Sidebar>

            {/* <Sidebar.Pusher> */}
            <Grid doubling columns={5} style={{ marginLeft: 140 }}>
                {renderProduct()}
            </Grid>
            {/* </Sidebar.Pusher> */}

        </Sidebar.Pushable>

    )

}

export default Home