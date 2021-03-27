import React, { Fragment } from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    invoiceNoContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    invoiceDateContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    invoiceDate: {
            fontSize: 12,
            fontStyle: 'bold',
    },
    label: {
        width: 60
    }
    
  });


  const InvoiceNo = ({invoice}) => (
        <Fragment>
            
            <View style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'row', marginTop: '36px'}}>
                <View style={{display: 'flex'}}>
                    <Text>From:</Text>
                    <Text>{invoice.userBusinessName}</Text>
                    <Text>{invoice.userAddress}</Text>
                    <Text>{invoice.userPhone}</Text>
                    <Text>{invoice.userEmail}</Text>
                </View>
            

                <View style={{display: 'flex'}}>
                    <View style={styles.invoiceNoContainer}>
                        <Text style={styles.label}>Invoice No:</Text>
                        <Text style={styles.invoiceDate}>{invoice.invoice_no}</Text>
                    </View >
                    <View style={styles.invoiceDateContainer}>
                        <Text style={styles.label}>Date: </Text>
                        <Text >{invoice.trans_date}</Text>
                    </View >

                </View>
            </View>
            
        </Fragment>
  );
  
  export default InvoiceNo
