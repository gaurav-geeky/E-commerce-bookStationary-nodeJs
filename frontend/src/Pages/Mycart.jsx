import React from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from "react-redux";

import { FaSquareMinus, FaSquarePlus } from "react-icons/fa6";

import { qntyInc, qntyDec, proRemove } from '../CartSlice';

const Mycart = () => {

    const myData = useSelector(state => state.mycart.cart);
    const dispatch = useDispatch();
    let totAmount = 0;

    const ans = myData.map((key) => {
        totAmount += key.price * key.qnty;
        return (
            <>
                <tr>
                    <td className='border'> <img style={{ width: "120px", height: "auto" }} src={key.image} alt="img" /> </td>
                    <td className='border'> {key.name} </td>
                    <td className='border'> {key.category} </td>
                    <td className='border'> {key.description} </td>
                    <td className='border'> {key.price} </td>

                    <td className='border text-[20px] font-bold flex  items-center'>
                        <FaSquareMinus onClick={() => { dispatch(qntyDec({ id: key.id })) }} />

                        {key.qnty}

                        <FaSquarePlus onClick={() => { dispatch(qntyInc({ id: key.id })) }} />
                    </td>

                    <td className='border'> {key.price * key.qnty} </td>

                    <td className='border'>
                        <Button variant="primary"
                            onClick={() => { dispatch(proRemove({ id: key.id })) }} >
                            Remove
                        </Button>
                    </td>
                </tr>
            </>
        )
    })

    return (
        <>
            <div>
                <h1>My Cart Data</h1>
                <h3> Total Amount : {totAmount} </h3>

                <div className='w-[90%] m-auto'>
                    <Table  >
                        <thead className='text-center'>
                            <tr>
                                <th> # </th>
                                <th>Product Name</th>
                                <th>Category</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total Amount</th>
                                <th> </th>
                            </tr>
                        </thead>
                        <tbody className='text-center'>
                            {ans}
                        </tbody>
                    </Table>
                </div>

            </div>
        </>
    )
}

export default Mycart; 
