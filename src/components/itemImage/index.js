import axios from "axios"
import React, { useEffect, useState } from "react"
import { Image } from "semantic-ui-react"
import './_itemImage.css'

const ItemImage = ({ url, onClickImage }) => {
  const [itemData, setItemData] = useState(null)
  useEffect(() => {
    axios.get(url).then(res => setItemData(res.data))
  }, [url])

  return (
    itemData && 
    <div className='item-image'>
      <Image onClick={()=>onClickImage(itemData)} src={itemData.sprites['default']} />
      <p>{itemData.name}</p>
    </div>
      
  ) 
}
export default ItemImage