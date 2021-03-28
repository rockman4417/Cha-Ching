import React from 'react';
import PrivateRoute from "./UI/Components/PrivateRoute";
import SignIn from "./UI/Routes/SignIn";
import AddClient from "./UI/Routes/AddClient"
import ClientListWrapper from "./UI/Routes/ClientListWrapper"
import AddTemplate from "./UI/Routes/AddTemplate"
import TemplateList from "./UI/Routes/TemplateList"
import AddInvoice from "./UI/Routes/AddInvoice"
import InvoiceList from "./UI/Routes/InvoiceList"
import ClientDetails from "./UI/Routes/Details/ClientDetails"
import TemplateDetails from "./UI/Routes/Details/TemplateDetails"
import InvoiceDetails from "./UI/Routes/Details/InvoiceDetails"
import Navigation from "./UI/Components/Navigation/Navigation"
import DashboardWrapper from "./UI/Routes/DashboardWrapper"
import {Switch, Route} from "react-router-dom";
import Test from "./UI/Components/Test"
import EditClient from './UI/Routes/EditClient'
import EditTemplate from './UI/Routes/EditTemplate'
import './App.css'
import Lab from './UI/Routes/Lab'
import AddReceipt from './UI/Routes/Receipts/AddReceipt'
import ReceiptList from './UI/Routes/Receipts/ReceiptList'


function App() {



  return (
    <div style = {{
      textAlign: "center"
    }}>
      <Navigation/>
      <Switch>

        <PrivateRoute path = "/dashboard">
          <DashboardWrapper/>
        </PrivateRoute>

        <Route path='/lab' component={Lab} />

        <Route path = "/receipts" component={ReceiptList} />
        <Route path = "/addreceipt" component={AddReceipt} />

      
        <Route path='/details/client/:id' component={ClientDetails} />
        <Route path='/details/template/:id' component={TemplateDetails} />
        <Route path='/details/invoice/:id' component={InvoiceDetails} />

        <Route path = "/clients" component={ClientListWrapper} />
        <Route path = "/templates" component={TemplateList} />
        <Route path = "/invoices" component={InvoiceList} />
        <Route path = "/test" component={Test}/>

        
        <Route path = "/addclient" component={AddClient} />
        <Route path = "/addtemplate" component={AddTemplate} />
        <Route path = "/addinvoice" component={AddInvoice} />

        <Route path = "/edit/client/:id" component={EditClient} />
        <Route path = "/edit/template/:id" component={EditTemplate} />
          
        <Route path = "/" component={SignIn} />
        
      </Switch>

    </div>
  );
}
export default App;