import { useSelector } from "react-redux";
import { Card, Grid, Header, Icon, Image } from "semantic-ui-react";
import ProductItem from "../../Components/ProductItem";
import { RootState } from "../../Configs/store"

const Home = () => {
    const listProduct = useSelector((state: RootState) => state.productReducer.productList);
    const renderProduct = () => listProduct.map((product: any, index: any) => (
        <ProductItem product={product}></ProductItem>
    ))
    return (
        // <div>
        //     <div className="ui link cards">
        //         {renderProduct()}
        //     </div>
        // </div>
        // <Card.Group>
        //     {renderProduct()}
        // </Card.Group>

        <Grid doubling columns={5}>
            {renderProduct()}
        </Grid>


    )

}

export default Home



