import React from 'react'
export default function NameChair(props) {
  // console.log(props.name);
  //Lọc các tên row khác nhau trong mảng
  let nameChair = props.name?.map(item=>item.row);
  // console.log(nameChair);
  let nameRow = nameChair?.filter((item,i,arr)=> arr.indexOf(item) === i);
  // console.log(nameRow)/
  let renderNameRow = () =>{
    return(
      nameRow.map((item,index)=>{
        // console.log(item)
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
