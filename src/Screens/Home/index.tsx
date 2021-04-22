import { useSelector } from "react-redux";
import ProductItem from "../../Components/ProductItem";
import { RootState } from "../../Configs/store"

const Home = () => {
    const listProduct = useSelector((state: RootState) => state.productReducer.productList);
    const renderProduct = () => listProduct.map((product: any, index: any) => (
        <ProductItem product = {product}></ProductItem>
    ))
    return (
        <div>
            <div className="ui link cards">
                {renderProduct()}
            </div>
        </div>
    )

}

export default Home



