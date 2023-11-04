
import Product from "../features/Product/Components/ProductList"
import Footer from "../features/common/Footer"
import Navbar from "../features/common/Navbar"
function Home()
{
    return(
        <>
        <Navbar>
                <Product></Product>
        </Navbar>
       <Footer></Footer>
            
        </>
    )
}

export default Home