import React, { Component } from 'react';
import Axios from 'axios';
import Card from './card';
import Timeline from './timeline';
import Table from './table';
import warehouse from '../FrontEndAssets/warehouse.svg';
import destination from '../FrontEndAssets/destination.svg';
import '../stylesheets/table.css';
import '../stylesheets/timeline.css';

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

    handleClick = params => (e) => {
        console.log(params);
        const { shipments } = this.state;
        let data = [];
        let temp = shipments.map( items => {
            const scan = items.scan;
            for(let i in scan){
                data.push(scan[i]);
            }                
        });
        console.log(typeof obj, typeof data);
    }


    render() {

        const { shipments } = this.state;
        let dataArray = [];
        let temp = shipments.map( items =>{
            const scan = items.scan;
            dataArray = scan;
        });
        let i, j, count = [];

        for(i in shipments){
            let t = shipments[i].scan;
            console.log(`${i}th`)
            for(j in t){
                const { time, location } = t[j];
                console.log("Time:", time, "Location:", location);
            }
            count.push(parseInt(j) + 1);
            console.log(count);
        }

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
            
               <Card type = "DEL" num = {counters.del} onClick={this.handleClick("DEL")}/>
               <Card type = "INT" num = {counters.intt} onClick={this.handleClick("INT")} />
               <Card type = "OOD" num = {counters.ood} onClick={this.handleClick("OOD")}/>
               <Card type = "DEX" num = {counters.dex} onClick={this.handleClick("DEX")}/>
               <Card type = "NFI" num = {counters.nfi} onClick={this.handleClick("NFI")}/>
            </div>
            <div className="row">
            <div className="col-4 timeline-view">
            
            
            <img src = {destination} height="40" width="40" alt="destination" 
                 className="timeline-icon" />

            {dataArray.slice(0, count[k] + 3).map((items, index) => {
                console.log(count[k]);
                const {time, location} = items;
                   return (
                       <React.Fragment>
                           <Timeline  
                                    key={index + 1}
                                    scanStat = {location}
                                    scanDate = {time}
                                    scanTime = {time}
                            />
                       </React.Fragment>
                     )
                })
            }

            <img src = {warehouse} height="40" width="40" alt="warehouse"
                 className="timeline-icon" />
            
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
