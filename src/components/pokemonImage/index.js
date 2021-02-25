import axios from "axios"
import React, { useEffect, useState } from "react"
import { Image } from "semantic-ui-react"
import './_pokemonImage.css'

const PokemonImage = ({ url, onClickImage }) => {
  const [pokemonData, setPokemonData] = useState(null)
  useEffect(() => {
    axios.get(url).then(res => setPokemonData(res.data))
  }, [url])

  return (
    pokemonData && 
    <div className='pokemon-image'>
      <Image onClick={()=>onClickImage(pokemonData)} src={pokemonData.sprites['front_default']} />
      <p>{pokemonData.name}</p>
    </div>
      
  ) 
}
export default PokemonImage