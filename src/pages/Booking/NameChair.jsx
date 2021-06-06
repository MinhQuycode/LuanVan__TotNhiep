import React from 'react'
export default function NameChair(props) {
  //Lọc các tên row khác nhau trong mảng
  let nameChair = props.name?.map(item=>item.row);
  let nameRow = nameChair?.filter((item,i,arr)=> arr.indexOf(item) === i);
  let renderNameRow = () =>{
    return(
      nameRow.map((item,index)=>{
        return(
          <span key={index}>
            {item}
          </span>
        )
      })
    )
  }
  return (
    <div className="name--chair">
        {renderNameRow()}
    </div>
  )
}
