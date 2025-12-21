

pnpm run dev

pnpm i

FormData has automatic   enc type . 
const formData = new FormData(); // is it func of js not in camel case it is obj type which carry binary data enc type 

# in cloudinary  name, key , api etc should be in small letter not capital. 












import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
const TopNavbar = () => {
    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="#home">OnlineClothes</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="home">Home</Nav.Link>
                        <Nav.Link as={Link} to="menswear">Mens Wear</Nav.Link>
                        <Nav.Link as={Link} to="womenswear">Womens Wear</Nav.Link>
                        <Nav.Link as={Link} to="kidswear">Kids Wear</Nav.Link>
                        <Nav.Link as={Link} to="mycart">My Cart</Nav.Link>
                        <Nav.Link as={Link} to="search">Search</Nav.Link>
                         <Nav.Link as={Link} to="registration">Registration</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}
export default TopNavbar;