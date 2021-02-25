import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios'
import PokemonDetailModal from '../../components/pokemonDetailModal'
import PokemonImage from '../../components/pokemonImage'
import { Button, Input, Dropdown } from 'semantic-ui-react';
import './_listPokemon.css'

const options = [
  {key: 10, text: '10', value: 10},
  {key: 20, text: '20', value: 20},
  {key: 50, text: '50', value: 50},
  {key: 100, text: '100', value: 100}
]

function ListPokemon() {
  const [pokemons, setPokemons] = useState([])
  const [pokemonDetail, setPokemonDetail] = useState(null)
  const [prev, setPrev] = useState('')
  const [next, setNext] = useState('')
  const [open, setOpen] = useState(false)
  const typingTimeoutRef = useRef(null)
  const pokemonNumber = useRef(20)
  const initData = () => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=${pokemonNumber.current}`).then(res => {
      setPokemons(res.data.results)
      setPrev(res.data.previous)
      setNext(res.data.next)
    })
  }
  useEffect(() => {
    initData()
  }, [])
  const handleClickImage = data => {
    setPokemonDetail(data)
    setOpen(true)
  }
  const handlePrevPage = () => {
    axios.get(prev).then(res => {
      setPokemons(res.data.results)
      setPrev(res.data.previous)
      setNext(res.data.next)
    })
  }
  const handleNextPage = () => {
    axios.get(next).then(res => {
      setPokemons(res.data.results)
      setPrev(res.data.previous)
      setNext(res.data.next)
    })
  }
  const handleSearch = value => {
    if (value) {
      const pokemon = {
        name: value,
        url: `https://pokeapi.co/api/v2/pokemon/${value}`
      }
      setPokemons([pokemon]);
    }
    else {
      initData()
    }
  }
  const handleChange = (e) => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }
    typingTimeoutRef.current = setTimeout(() => {
      handleSearch(e.target.value)
    }, 500)
  }
  const handleChangeNumber = (e, data) => {
    pokemonNumber.current = data.value
    initData()
  }
  return (
    <div>
      <div className="input-group">
        <Input placeholder='Search...' onChange={handleChange} type='text' />
        <Dropdown text='Page size' options={options} onChange={handleChangeNumber}/>
      </div>
      <div className="pokemon-list">
        {
          pokemons.map(p => <PokemonImage key={`key_${p.name}`} url={p.url} onClickImage={handleClickImage} />)
        }
      </div>
      <div className="input-group">
        <Button disabled={!prev} onClick={handlePrevPage}>Prev</Button>
        <Button onClick={handleNextPage}>Next</Button>
      </div>
      {pokemonDetail && <PokemonDetailModal open={open} setOpen={setOpen} pokemonDetail={pokemonDetail} />}
    </div>
  );
}

export default ListPokemon;