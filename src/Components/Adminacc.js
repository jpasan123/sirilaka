import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import { auth, firestore } from "../firebase";

function Adminacc() {
  const [user, setUser] = useState(null);
  const [data, setdata] = useState([]);

  const currentUser = auth.currentUser;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, [user]);

  const fetchAdminDetails = async () => {
    try {
      if (currentUser) {
        console.log('Current User UID:', currentUser.uid);

        const adminsCollection = collection(firestore, 'suppliers');
        const q = query(adminsCollection, where('email', '==', currentUser.email));
        const adminsSnapshot = await getDocs(q);

        if (!adminsSnapshot.empty) {
          const adminData = [];
          adminsSnapshot.forEach((doc) => {
            adminData.push({ id: doc.id, ...doc.data() });
          });
          setdata(adminData);
          console.log('User Name:',adminData); 

        } else {
          console.log('No admin data found for the current user.');
        }
      }
    } catch (error) {
      console.error('Error fetching admin details:', error.message);
    }
  };

  useEffect(() => {
    fetchAdminDetails();
  }, [currentUser]);

  return (
    <div className="Align">
      <Container style={{ paddingTop: '40px' }}>
        <Row>
          <Col sm={2}></Col>
          <Col sm={10}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Supplier Id</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Telephone</th>
                  <th>Account Create Date</th>
                </tr>
              </thead>
              <tbody>
                {data.map((admin) => (
                  <tr key={admin.id}>
                    <td>{admin.Supid}</td>
                    <td>{admin.username}</td>
                    <td>{admin.email}</td>
                    <td>{admin.Address}</td>
                    <td>{admin.tel}</td>
                    <td>{admin.createdAt.toDate().toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Adminacc;
