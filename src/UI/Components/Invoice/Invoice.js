import React, {useState} from 'react';
import { Page, Document, Image, StyleSheet } from '@react-pdf/renderer';
import InvoiceTitle from './InvoiceTitle'
import BillTo from './InvoiceClient'
import InvoiceNo from './InvoiceNo'
import InvoiceItemsTable from './InvoiceItems'
import InvoiceThankYouMsg from './InvoiceThankYouMsg'
import { useFirestore } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import moment from 'moment'
import UserInfo from './UserInfo'
// import logo from '../../../src/logo.png'


const styles = StyleSheet.create({
    page: {
        fontFamily: 'Helvetica',
        fontSize: 11,
        paddingTop: 30,
        paddingLeft:60,
        paddingRight:60,
        lineHeight: 1.5,
        flexDirection: 'column',
    }, 
    logo: {
        width: 74,
        height: 66,
        marginLeft: 'auto',
        marginRight: 'auto'
    }
  });
  
  export default function Invoice({ invoiceTemplates, invoiceClient, totalAmount, user, invoiceData}) {
    // const { uid } = useSelector((state) => state.firebase.auth);
    
    // useFirestoreConnect(
    //     {
    //     collection: `users/${uid}/invoices`,
    //     storeAs: "invoices"
    //     }
    // )
      
    // const firestore = useFirestore();
    // const invoices = useSelector((state) => state.firestore.data.invoices)

    console.log('user inside of invoice', user)

    const invoice = {
        userAddress: user ? user.user_info.address : null,
        userBusinessName: user ? user.user_info.business: null,
        userPhone: user ? user.user_info.phone : null,
        userEmail: user ? user.user_info.email: null,
        id: "5df3180a09ea16dc4b95f910",
        invoice_no: "201906-28",
        balance: invoiceData ? `$ ${invoiceData.total}` : "$" + totalAmount,
        company: invoiceData ? invoiceData.client.business_name : invoiceClient.business_name,
        name: invoiceData ? invoiceData.client.first_name + " " + invoiceData.client.last_name  : invoiceClient.first_name + " " + invoiceClient.last_name,
        email: invoiceData ? invoiceData.client.email : invoiceClient.email,
        phone: invoiceData ? invoiceData.client.cell : invoiceClient.cell,
        address: invoiceData ? invoiceData.client.address + "," + invoiceData.client.city + "," + invoiceData.client.state : invoiceClient.address + "," + invoiceClient.city + "," + invoiceClient.state,
        trans_date: invoiceData ? moment(invoiceData.date).format('MM/DD/YY') : moment().format('MM/DD/YY'),
        items: invoiceData ? Object.values(invoiceData.templates).map((template, idx) => {
            return {
                      sno: template.id,
                      desc: template.template_name,
                      qty: template.quantity,
                      rate: template.template_amount,
                    }
        }) 
        : Object.values(invoiceTemplates).map((template, idx) => {
            return {
                      sno: template.id,
                      desc: template.template_name,
                      qty: template.quantity,
                      rate: template.template_amount,
                    }
        }) 
      };


        return (
            <Document>
                {console.log('invoiceTemplates', invoiceTemplates, 'invoiceClient', invoiceClient)}
                
                <Page size="A4" style={styles.page}>
                    {/* <Image style={styles.logo} src={logo} /> */}
                
                    <InvoiceTitle title='Invoice'/>
                    <InvoiceNo invoice={invoice}/>
                    <BillTo invoice={invoice}/>
                    <InvoiceItemsTable invoice={invoice} />
                    <InvoiceThankYouMsg />
                </Page>
            </Document>
            )
            
  }