import * as React from 'react';
import {useState, useEffect} from 'react'
import { DataGrid } from '@material-ui/data-grid';
import {Button} from '@material-ui/core';




export default function TemplatesDataGrid({templates, handleClickAddTemplate, handleClickRemoveTemplate}) {

    const [rows, setRows] = useState([])

    const columns = [
        { field: 'quantity', 
          headerName: "Add/Remove",
          type: 'number', 
          width: 200,
          renderCell: (params) => (
              <strong>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  style={{ marginLeft: 16 }}
                  onClick={()=> handleClickAddTemplate(params.row)}
                  
                >
                  Add
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  style={{ marginLeft: 16 }}
                  onClick={()=> handleClickRemoveTemplate(params.row)}
                >
                  Remove
                </Button>
              </strong>
            ),},
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'template_name', headerName: 'Template Name', width: 250 },
        { field: 'template_amount', headerName: 'Amount', type: 'number', width: 150 },
        { field: 'template_description', headerName: 'Description', width: 360 }
      ];

    


    const templateRow = (template, idx) => {
        return {quantity: 0, 
                id: idx + 1, 
                template_name: template["template_name"], 
                template_amount: template["template_amount"], 
                template_description: template["template_description"],
                templateID: template.templateID}
    }

    useEffect(() => {
        let array = []
        Object.values(templates).map((template, idx) => {
            array.push(templateRow(template, idx))
        })

        setRows(array)


      }, [])

        



  return (
    <div style={{ height: 400, width: '50%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={5}  />
    </div>
  );
}