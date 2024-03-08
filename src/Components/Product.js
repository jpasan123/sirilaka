import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Link } from "react-router-dom";
import ProductService from '../Services/product_service';

function Product() {
  const [products, setProducts] = useState([]);

 

  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = await ProductService.getAllProducts();
      setProducts(fetchedProducts);
    };
    fetchProducts();

  }, []);

  const addToCart = (productId) => {
    // Here you can implement your logic to add the product to the cart
    // For now, you can just log the productId to the console
    console.log(`Product added to cart: ${productId}`);
  };

  

  return (
    <div className="h-100 gradient-custom" ><br></br>
      <Container>
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://i.ibb.co/5FQRMwS/photo-1.png"
              style={{ maxHeight: "500px", objectFit: "cover" }} // adjust styles as needed
            />
            <Carousel.Caption>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://i.ibb.co/KbRk3mt/Photo-2.png"
              alt="Second slide"
              style={{ maxHeight: "500px", objectFit: "cover" }} // adjust styles as needed
            />
            <Carousel.Caption>
              
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://i.ibb.co/VMjrDPz/Neutral-Brown-White-Minimal-Aesthetic-Furniture-Online-Promotion-Facebook-Cover.png" 
              alt="Third slide"
              style={{ maxHeight: "500px", objectFit: "cover" }} // adjust styles as needed
            />
            <Carousel.Caption>
              <h3 style={{ fontWeight: "5px" }}></h3>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://i.ibb.co/Hg87k8R/Janidu-02.jpg"
              alt="Second slide"
              style={{ maxHeight: "600px", objectFit: "cover" }} // adjust styles as needed
            />
            <Carousel.Caption>
              
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://i.ibb.co/cbqKSj0/JANIDU.jpg"
              alt="Second slide"
              style={{ maxHeight: "600px", objectFit: "cover" }} // adjust styles as needed
            />
            <Carousel.Caption>
              
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://i.ibb.co/3ksfdTR/Green-Aesthetic-Fashion-Store-Photo-Collage-Facebook-Cover-2.jpg"
              alt="Second slide"
              style={{ maxHeight: "500px", objectFit: "cover" }} // adjust styles as needed
            />
            <Carousel.Caption>
              
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://i.ibb.co/d0BsKPy/Beige-Brown-Aesthetic-Minimalist-Digital-Product-Facebook-Cover-1.jpg"
              alt="Second slide"
              style={{ maxHeight: "500px", objectFit: "cover" }} // adjust styles as needed
            />
            <Carousel.Caption>
              
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://i.ibb.co/CvKS4qY/Gray-Minimalist-Aesthetic-Fashion-Facebook-Cover.jpg"
              alt="Second slide"
              style={{ maxHeight: "600px", objectFit: "cover" }} // adjust styles as needed
            />
            <Carousel.Caption>
              
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel></Container><br></br><br></br>

      <Container>
        <h1 style={{ color: 'white' }}>Rare Type ​Products</h1>
        <br></br><br></br>
        <Row>
          <Col sm={8} style={{ color: 'white', fontSize: '22px', paddingTop: '50px' }}>Life time warranty

            Island Wide Delivery

            High Quality Branded items

            Made in Sri Lanka Oval Vector Stamp
            Products From Middle Of the ​country<br></br><br></br>
            <img src="https://i.ibb.co/RTYByVb/exfx6eiy.png"
              width={'300px'}></img></Col>

          <Col><img src="https://i.ibb.co/CbCVsgB/xg4dfyia.png"
            width={'300px'}></img></Col>
        </Row>

      </Container>
      <br></br><br></br>
      <Container>
        <Row>
          {products.map(product => (
            <Col>   <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src={product.image}/>
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>
                 Rs.{product.price}
                </Card.Text>
                <Link to={{
                  pathname:"/productdetails",
                  search:`?productId=${product.id}`
                }}>
                  <Button style={{ backgroundColor: '#371562' }} >Buy</Button></Link>
                  {/* Call addToCart function with productId when button is clicked */}
                  <Button
                    style={{ marginLeft: '30px', backgroundColor: '#371562' }}
                    onClick={() => addToCart(product.id)} // Pass productId to addToCart function
                  >
                    Add to cart
                  </Button>
              </Card.Body>
            </Card></Col>
          ))}
        </Row>
      </Container><br></br><br></br><br></br>

    </div>
  );
}


export default Product;