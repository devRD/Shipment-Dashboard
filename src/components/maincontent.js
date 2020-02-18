import React, { Component } from 'react';
import Axios from 'axios';
import Card from './card';
import Table from './table';
import '../stylesheets/table.css';

class MainContent extends Component{

    constructor(props){
        super(props);

        this.id_token = "tTU3gFVUdP";
        this. email = "ratnabalidutta26@gmail.com";
        this.name = "ratnabali";

        this.state = {
            shipments: []
        };

    }

    componentDidMount(){
        const config = {
            headers: {
                Authorization: `Bearer ${this.id_token}`
            }
        };

        const params = {
            name: this.name,
            email: this.email,
        };

        Axios.post (
            `https://93870v1pgk.execute-api.ap-south-1.amazonaws.com/latest/shipments/${this.name}`,
             params,
             config
        ).then(res => {
            const items = res.data.data;
            this.setState({shipments: items});
            console.log(this.state.shipments);
        })
        .catch((err) => console.log(err));
    }


    render() {

        const { shipments } = this.state;

        return(
            <div className="">
            <table >
                <thead>
                   <tr>
                       <th>AWB NUMBER</th>
                       <th>TRANSPORTER</th>
                       <th>SOURCE</th>
                       <th>DESTINATION</th>
                       <th>BRAND</th>
                       <th>START DATE</th>
                       <th>ETD</th>
                       <th>STATUS</th>
                   </tr>
                </thead>
                {shipments.map(items => {
                    const { _id, awbno, carrier, pickup_date, current_status, from, to } = items;
                    const time = new Date(pickup_date);
                    const format = time.toLocaleDateString({day: 'numeric'});
                        return(
                            <React.Fragment>
                                <Table
                                    key = {_id}
                                    awb = {awbno} 
                                    transport = {carrier}
                                    src = {from} 
                                    dest = {to}
                                    brand = {carrier}
                                    start = {format}
                                    etd = {format}
                                    stat = {current_status}
                                 />
                            </React.Fragment>
                        )
                    })
                }
                </table>                
            </div>
        );
    }
}

export default MainContent;
