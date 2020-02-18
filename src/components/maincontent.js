import React, { Component } from 'react';
import Axios from 'axios';
import Card from './card';
import Timeline from './timeline';
import Table from './table';
import warehouse from '../FrontEndAssets/warehouse.svg';
import destination from '../FrontEndAssets/destination.svg';
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
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e){
        alert("Click!");
        console.log("hello");
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
        })
        .catch((err) => console.log(err));
    }


    render() {

        const { shipments } = this.state;
        let dataArray = [];
        let temp = shipments.map( items =>{
            const scan = items.scan;
            for(let i in scan){
                dataArray.push(scan[i]);
            }                
        });
        let k = 0;
        const filters= ["OOD", "INT", "DEL", "DEX", "NFI"];
        let counters = {
            ood: 0,
            intt: 0,
            del: 0,
            dex: 0,
            nfi: 0,
        };

        const code = shipments.map( items => {
            switch(items.current_status_code){
                case "DEL" : counters.del++;
                break;
                case "INT" : counters.intt++;
                break;
                case "DEX" : counters.dex++;
                break;
                case "OOD" : counters.ood++;
                break;
                case "NFI" : counters.nfi++;
                break;
            }
        });

        return(
            <div className="container-fluid">
            <div className = "d-flex justify-content-center">
            
               <Card type = "DEL" num = {counters.del} onClick={this.handleClick}/>
               <Card type = "INT" num = {counters.intt} onClick={this.handleClick}/>
               <Card type = "OOD" num = {counters.ood} onClick={this.handleClick}/>
               <Card type = "DEX" num = {counters.dex} onClick={this.handleClick}/>
               <Card type = "NFI" num = {counters.nfi} onClick={this.handleClick}/>
            </div>
            <div className="row">
            <div className="col-4">
            HELLO
            {/*
            <img src = {destination} height="40" width="40" alt="destination" 
                 style={{"backgroundColor": "lightblue", "padding": "5px", "borderRadius": "50%"}} />

            {dataArray.map((items, index) => {
                const {time, location} = items;
                console.log(index + 1);
                   return (
                       <React.Fragment>
                           <Timeline key={index + 1} scanStat = {location} scanDate = {time} scanTime = {time} />
                       </React.Fragment>
                     )
                })
            }

            <img src = {warehouse} height="40" width="40" alt="warehouse"
                 style={{"backgroundColor": "lightblue", "padding": "10px", "borderRadius" : "50%"}} />*/}
            </div>
            <div className="col-8">
            <table className="table-responsive">
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
                                    awb = {`#${awbno}`} 
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
                </div> 
            </div>
        );
    }
}

export default MainContent;
