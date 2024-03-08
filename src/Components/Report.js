import { collection, getDocs, query, where } from "firebase/firestore"; // Import Firestore functions
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { firestore } from "../firebase"; // Import firebase config
import "./styles.css";

export default function Report() {
  const [totalSales, setTotalSales] = useState(0);
  const [salesData, setSalesData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    fetchInvoicesData();
  }, []);

  const fetchInvoicesData = async () => {
    try {
    
      const invoicesCollection = collection(firestore, "invoice");
      const querySnapshot = await getDocs(
        query(
          invoicesCollection,
          where("date", ">=", startDate),
          where("date", "<=", endDate)
        )
      );

      const products = [];
      let total = 0;

      querySnapshot.forEach((doc) => {
        const invoiceData = doc.data();
        total += invoiceData.total;
  
        // Add each product from the invoice to the products array
        invoiceData.products.forEach((product) => {
          products.push(product);
        });
  
        // Fetch data of each document
        console.log("Document ID:", doc.id);
        console.log("Document data:", invoiceData);
      });
  
      setSalesData(products);
      setTotalSales(total);
    } catch (error) {
      console.error("Error fetching invoices data:", error);
    }
  };


  return (
    <div className="Align">
      <Container style={{ paddingTop: "40px" }}>
        <Row>
          <Col sm={2}></Col>
          <Container>
            <Row>
              <Col sm={2}></Col>
              <Col sm={5}>
                <div className="dates">
                  <h1>Sales Report</h1>
                  <br />
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    placeholderText="Start Date"
                  />
                  <br /> <br />
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    placeholderText="End Date"
                  />
                  <br />
                </div>

                <br />
                <br />

                <Button
                  variant="primary"
                  style={{
                    background: "#371562",
                    position: "absolute",
                    color: "white",
                    transform: "translateY(-50%)",
                    width: "160px",
                    height: "50px",
                    fontSize: "15px",
                  }}
                   onClick={fetchInvoicesData}
                >
                  Submit
                </Button>
              </Col>
            </Row>
          </Container>

          <Col sm={2}></Col>
          <Col sm={10}>
            <br />
            <br />
            <br />
            <Table responsive="xl">
              <thead>
                <tr>
                  <th className="fs-5">Product Name</th>
                  <th className="fs-5">Quantity</th>
                  <th className="fs-5">Price</th>
                  <th className="fs-5">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {salesData.map((product, index) => (
                  <tr key={index}>
                    <td className="fs-5">{product.name}</td>
                    <td className="fs-5">{product.quantity}</td>
                    <td className="fs-5">Rs. {product.price}</td>
                    <td className="fs-5">Rs. {product.subtotal}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
        <div
          style={{ paddingLeft: "130px", display: "flex", fontSize: "22px",marginLeft:'830px' }}>
          <span>Total Sales(Rs): {totalSales} </span>
        </div>
      </Container>
    </div>
  );
}
