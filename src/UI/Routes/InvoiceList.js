import React, { useEffect, useState } from 'react'
import {
    Container,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit';
import FloatingActionButton from '../Components/Buttons/AddButton'
import {Link} from 'react-router-dom'
import cookie from 'cookie'
import { useFirestoreConnect } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { useFirestore } from "react-redux-firebase";
import Collapse from '@material-ui/core/Collapse';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import moment from 'moment'




// const checkAuth = () => {
//     const cookies = cookie.parse(document.cookie)
//     console.log('looking up cookies')
//     return cookies["loggedIn"] ? true : false
    
// }
 
const ClientList = (props) => {
    const [open, setOpen] = React.useState(false);

    const { displayName, uid } = useSelector((state) => state.firebase.auth);
        useFirestoreConnect([{
            collection: `users/${uid}/invoices`,
            storeAs: "invoices",
        },
        {
          collection: `users`,
          doc: uid,
          storeAs: "user"
          },]);



    const invoices = useSelector((state) => state.firestore.data.invoices);
    const user = useSelector((state) => state.firestore.data.user);
     console.log('invoices', invoices);

     const firestore = useFirestore();

    const handleDelete = (invoiceID) => {
        
        firestore.collection("users").doc(uid).collection("invoices").doc(invoiceID.toString()).delete().then(() => {console.log("invoice deleted")})
        
    }

    return (
        
        <Container maxWidth="lg" className="car-container">
            
            <Link to="/addinvoice" style={{ textDecoration: 'none', color: "white"  }}><FloatingActionButton></FloatingActionButton></Link>
            
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell>Client</TableCell>
                        
                        <TableCell>Delete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {invoices && Object.values(invoices).map((invoice, idx) => (
                    invoice && 
                    <React.Fragment>
                    <TableRow key={idx}>
                        <TableCell>
                            
                            <Link to={{pathname: `/details/invoice/${invoice.invoiceID}`, state: {invoiceData: invoice, user}}} style={{ textDecoration: 'none' }}>{moment(invoice.date.seconds *1000).format("dddd, MMMM Do YYYY")}</Link>
                            
                            </TableCell>
                        <TableCell>{"$" + invoice["total"]}</TableCell>
                        <TableCell>{invoice["client"].first_name + " " + invoice["client"].last_name}</TableCell>
                        {/* <TableCell>{invoice["templates"]}</TableCell> */}
                        <TableCell>
                            <DeleteIcon
                                onClick={() => handleDelete(invoice.invoiceID)  }
                                className="icon text-red" /> 
                        </TableCell>
                    </TableRow>
                    <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                      <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                          <Typography variant="h6" gutterBottom component="div">
                            History
                          </Typography>
                          <Table size="small" aria-label="purchases">
                            <TableHead>
                              <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell>Templates</TableCell>
                                <TableCell align="right">Paid</TableCell>
                                <TableCell align="right">Total price ($)</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {invoice.templates && Object.values(invoice.templates).map((template) => (
                                 invoice  && <TableRow key={invoice.invoiceID}>
                                  <TableCell component="th" scope="row">
                                    {invoice.date}
                                  </TableCell>
                                  <TableCell>{invoice.templates.map((template) => (template.template_name))}</TableCell>
                                  <TableCell align="right">{invoice.amount}</TableCell>
                                  <TableCell align="right">
                                    {'$' + invoice.total}
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                  </React.Fragment>
                ))}
                </TableBody>
            </Table>
            
            
        </Container>
    )
}

export default ClientList



// firestore.collection("users").doc(uid).collection("clients").doc(clientID).delete(doc)