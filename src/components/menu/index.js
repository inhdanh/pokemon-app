import React, { useState, useEffect } from 'react'
import { Dropdown, Menu } from 'semantic-ui-react'
import { withRouter } from "react-router-dom";
import axios from 'axios';
const MenuBar = ({ history }) => {
  const [activeItem, setActiveItem] = useState('')
  const [gameVersions, setGameVersions] = useState([])
  const [generations, setGenerations] = useState([])
  const [locations, setLocations] = useState([])
  const [items, setItems] = useState([])
  const handleItemClick = (e, { name }) => {
    history.push(`/${name}`)
    setActiveItem(name)
  }
  useEffect(() => {
    getOption('version', setGameVersions);
    getOption('generation', setGenerations);
    getOption('location', setLocations);
    getOption('item', setItems);
  }, [])

  const getOption = (type, cb) => {
    axios.get(`https://pokeapi.co/api/v2/${type}`).then(res=>{
      const options = res.data.results.map(i=>({
        key: i.name,
        value: i.name,
        text: i.name
      }))
      cb(options)
    })
  }
  return (
    <Menu>
      <Menu.Item
        name=''
        active={activeItem === ''}
        onClick={handleItemClick}
      >
        Home
        </Menu.Item>

      <Menu.Item
        name='list'
        active={activeItem === 'list'}
        onClick={handleItemClick}
      >
        List Pokemon
      </Menu.Item>

      <Dropdown item text="Games" options={gameVersions}></Dropdown>

      <Dropdown item text="Generations" options={generations}></Dropdown>

      <Dropdown item text="Locations" options={locations}></Dropdown>

      <Dropdown item text="Items" options={items}></Dropdown>
      
    </Menu>
  )
}
export default withRouter(MenuBar)