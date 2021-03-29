import React from 'react'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


export default function Feedback() {
    

   
    return (
        <>
            <div>
                <h1>Feedback</h1>
            </div>
            
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: '500px'}}>
                <Card style={{width: '350px', height: '200px'}}>
                    <CardContent>
                        <Typography variant='h5' component="h3">
                            Under Construction
                        </Typography>
                    </CardContent>

                    <CardActions style={{display: 'flex', justifyContent: 'center'}}>
                        <Link to="/dashboard" style={{ textDecoration: 'none', color: "white"  }}>
                            <Button variant="contained"
                                color="primary"
                                style={{width: '250px'}}>
                                Return to Dashboard
                            </Button>
                        </Link>
                    </CardActions>
                </Card>
            </div>
        </>
    )
}