import axios from 'axios'
import React, { useState, useEffect } from 'react'
import ReactPlayer from 'react-player'
import { Button } from 'semantic-ui-react'
import PokemonDetailModal from '../pokemonDetailModal'
import PokemonImage from '../pokemonImage'
import ItemImage from '../itemImage'
import './_home.css'

const Home = () => {
  const trailerIds = ['D0zYJ1RQ-fs', '1roy4o4tqQM', 'bILE5BEyhdo', 'uBYORdr_TY8']
  const [pokemons, setPokemons] = useState([])
  const [items, setItems] = useState([])
  const [pokemonDetail, setPokemonDetail] = useState(null)
  const [nextUrl, setNextUrl] = useState('')
  const [open, setOpen] = useState(false)
  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=10').then(res => {
      setPokemons(res.data.results)
      setNextUrl(res.data.next)
    })
    axios.get('https://pokeapi.co/api/v2/item/?offset=0&limit=10').then(res => {
      setItems(res.data.results)
    })
  }, [])
  const renderTrailers = id => {
    return <ReactPlayer key={id} url={`https://youtu.be/${id}`} />
  }
  const handleLoadMorePokemon = () => {
    axios.get(nextUrl).then(res => {
      setPokemons(pokemons => pokemons.concat(res.data.results))
      setNextUrl(res.data.next)
    })
  }
  const handleClickImage = (data) => {
    setPokemonDetail(data)
    setOpen(true)
  }
  return (
    <>
      <div className='trailer-section'>
        <h3>TRAILERS</h3>
        <div>
          {
            trailerIds.map(id => renderTrailers(id))
          }
        </div>
      </div>
      <div className="pokemon-section-container">
        <div className="pokemon-header-group">
          <h3>POKEMONS</h3>
          <Button onClick={handleLoadMorePokemon}>See more</Button>
        </div>
        <div className='pokemon-section'>
          {
            pokemons.map(p => <PokemonImage key={`key_${p.name}`} url={p.url} onClickImage={handleClickImage} />)
          }
        </div>
        <div className="items-section-container">
          <h3>ITEMS</h3>
          <div className='items-section'>
            {
              items.map(i => <ItemImage key={`key_${i.name}`} url={i.url} onClickImage={handleClickImage} />)
            }
          </div>
        </div>
      </div>
      {pokemonDetail && <PokemonDetailModal open={open} setOpen={setOpen} pokemonDetail={pokemonDetail} />
      }
    </>
  )
}
export default Home