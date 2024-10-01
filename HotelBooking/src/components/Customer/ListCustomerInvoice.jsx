import React, { useRef } from "react";
import { Grid, Card, CardContent, Button } from "@mui/material";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { useReactToPrint } from "react-to-print";

function ListCustomerInvoice() {
  const invoiceRef = useRef(null); // Initialize the ref with null

  const handlePrint = ()=>{
    window.print()
  }

  const products = [
    { id: 1, name: "Product A", cost: 50, quantity: 2 },
    { id: 2, name: "Product B", cost: 30, quantity: 1 },
    { id: 3, name: "Product C", cost: 100, quantity: 3 },
  ];

  const calculateSubtotal = (cost, quantity) => cost * quantity;
  const total = products.reduce((sum, product) => sum + calculateSubtotal(product.cost, product.quantity), 0);

  return (
    <Card>
      <CardContent>
        <div ref={invoiceRef}> {/* Wrap the printable area */}
          <Grid container spacing={2}>
            <Grid item xs={4}></Grid>
            <Grid item xs={4}><h2>The Invoice Company</h2></Grid>
            <Grid item xs={4}></Grid>

            <Grid item xs={4} style={{ marginTop: "50px" }}>
              <p>From <br />
                <b>The Invoice Company</b><br />
                Best Hotel Stay <br />
                Pune<br />
                Email: info@theinvoicecompany.com</p>
            </Grid>
            <Grid item xs={4} style={{ marginTop: "50px" }}>
              <p>To <br />
                <b>abc</b><br />
                04<br />
                Maharashtra<br />
                PuneNagarNagarNagar 411047<br />
                Phone: 9874545242<br />
                Email: abc12@gmail.com</p>
            </Grid>
            <Grid item xs={4} style={{ marginTop: "50px" }}>
              <p><b>Invoice #71</b><br />
                <b>Invoice Date:</b> 30-09-2024<br />
                <b>Check-In Date:</b> 18-09-2024 4:13 pm<br />
                <b>Check-Out Date:</b> 20-09-2024 2:17 pm</p>
            </Grid>

            <Grid item xs={12}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Sr. No.</TableCell>
                      <TableCell>Product Name</TableCell>
                      <TableCell>Cost</TableCell>
                      <TableCell>Quantity</TableCell>
                      <TableCell>Subtotal</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {products.map((product, index) => (
                      <TableRow key={product.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{product.cost}</TableCell>
                        <TableCell>{product.quantity}</TableCell>
                        <TableCell>{calculateSubtotal(product.cost, product.quantity)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>

            <Grid item xs={12}>
              <h3 style={{ textAlign: "right", marginRight: "16px" }}>Total: ${total}</h3>
            </Grid>
          </Grid>
        </div>
        <Grid item xs={2}>
          <Button variant="contained" fullWidth onClick={handlePrint}>Print</Button>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default ListCustomerInvoice;