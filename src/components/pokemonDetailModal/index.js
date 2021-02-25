import React from 'react'
import { Button, Modal, Image } from 'semantic-ui-react'
import './_pokemonDetailModal.css'
const PokemonDetailModal = ({ pokemonDetail, setOpen, open }) => {
  return (
    <Modal
      className='pokemon-detail-modal'
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
    >
      <Modal.Header>{pokemonDetail.name.toUpperCase()}</Modal.Header>
      <Modal.Content image>
        <Image size='medium' src={pokemonDetail.sprites['front_default']} wrapped />
        <Modal.Description>
          <p><b>Name:</b> {pokemonDetail.name}</p>
          <p><b>Base exprience:</b> {pokemonDetail.base_experience}</p>
          <p><b>Weight:</b> {pokemonDetail.weight}</p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => setOpen(false)}>
          Close
        </Button>
      </Modal.Actions>
    </Modal>
  )
}
export default PokemonDetailModal