import React from 'react'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import { useDispatch, useSelector } from "react-redux"
import { FaSquareMinus, FaSquarePlus } from "react-icons/fa6"
import { qntyInc, qntyDec, proRemove } from '../CartSlice'

const Mycart = () => {
  const myData = useSelector(state => state.mycart.cart)
  const dispatch = useDispatch()

  // ✅ total calculated ONCE
  const totAmount = myData.reduce(
    (sum, item) => sum + item.price * item.qnty,
    0
  )

  // ✅ single map
  const ans = myData.map((key) => (
    <tr
      key={key.id}
      className="
        block lg:table-row
        border rounded-lg lg:rounded-none
        mb-4 lg:mb-0
        bg-white lg:bg-transparent
        shadow lg:shadow-none
      "
    >
      {/* IMAGE */}
      <td className="block lg:table-cell p-4 border">
        <img
          src={key.image}
          alt="img"
          className="w-[120px] mx-auto"
        />
      </td>

      {/* INFO (name, category, description) */}
      <td className="block lg:table-cell p-4 border">
        <div className="flex flex-col gap-1">
          <span className="font-bold text-lg">{key.name}</span>
          <span className="text-sm text-gray-500">
            Category: {key.category}
          </span>
          <p className="text-sm">{key.description}</p>
        </div>
      </td>

      {/* PRICE + QTY (tablet stacks, desktop inline) */}
      <td className="block lg:table-cell p-4 border">
        <div className="flex flex-col sm:flex-col lg:flex-row lg:items-center gap-3">
          <span className="font-semibold text-green-600 text-lg">
            ₹{key.price}
          </span>

          <div className="flex items-center gap-3 text-lg font-bold">
            <FaSquareMinus
              className="cursor-pointer"
              onClick={() => dispatch(qntyDec({ id: key.id }))}
            />
            {key.qnty}
            <FaSquarePlus
              className="cursor-pointer"
              onClick={() => dispatch(qntyInc({ id: key.id }))}
            />
          </div>
        </div>
      </td>

      {/* ITEM TOTAL */}
      <td className="block lg:table-cell p-4 border font-bold text-green-700">
        Total: ₹{key.price * key.qnty}
      </td>

      {/* ACTION */}
      <td className="block lg:table-cell p-4 border">
        <Button
          size="sm"
          variant="danger"
          onClick={() => dispatch(proRemove({ id: key.id }))}
        >
          Remove
        </Button>
      </td>
    </tr>
  ))

  return (
    <div className="px-4 py-6">
      <h1 className="text-2xl font-bold mb-2">My Cart</h1>

      <h3 className="text-lg font-semibold mb-4">
        Total Amount :
        <span className="text-green-600 ml-2">₹{totAmount}</span>
      </h3>

      <div className="overflow-x-auto">
        <Table className="w-full">
          {/* Desktop header only */}
          <thead className="hidden lg:table-header-group bg-gray-100">
            <tr className="text-center">
              <th>Image</th>
              <th>Product</th>
              <th>Price & Qty</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>{ans}</tbody>
        </Table>
      </div>
    </div>
  )
}

export default Mycart;  


// now my cart looks like this and on incrase price it increase but due to incase of digit like 999, 2000, 43000--2 digit, 4 digit the cell got change and it affect screen 


