import React from 'react'


const TableRow = ({Data,setDataToEdit,deleteData}) => {
  let {firstName,lastName,age, street, number, city,state,zipCode, email} = Data
  return (
    <div>
      <tr>
        <td>{firstName}</td>

      </tr>
    </div>
  )
}

export default TableRow
