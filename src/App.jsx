import Narbar from "./components/Narbar";
import Hero from "./components/Hero";
import Card from "./components/Card";
import { products } from "./constance"; // Import products here


const App = () => {
    return (
        <>
            <Narbar />
            <Hero />
            <Card products={products}/>
        </>

    )
}


export default App;
