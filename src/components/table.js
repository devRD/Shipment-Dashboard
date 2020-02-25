import React from 'react'

const Table = (props) => {
    let statclass = (props.stat === 'Delivered') ?  'text-success' 
                    : (props.stat === 'Undelivered') ? 'text-danger' 
                    : 'text-info';
    return(
     <tbody className="ml-5" onClick={props.onClick}>
         <tr className="text-center">
            <td>{props.awb}</td>
            <td>{props.transport}</td>
            <td>{props.src}</td>
            <td>{props.dest}</td>
            <td>{props.brand}</td>
            <td>{props.start}</td>
            <td>{props.etd}</td>
            <td className={statclass}>{props.stat}</td>
        </tr>
      </tbody>

    )
};

export default Table;
