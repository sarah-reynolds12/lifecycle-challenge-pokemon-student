import React, { Component } from 'react'
import './PokeFetch.css';


class PokeFetch extends Component {
  constructor() {
    super()
    this.state = {
      pokeInfo: '',
      pokeSprite: '',
      pokeName: '',
      secondsRemaining: 10,
      showPokemon: false  
    }
  }

  fetchPokemon() {
    let min = Math.ceil(1);
    let max = Math.floor(152);
    let pokeNum = Math.floor(Math.random() * (max - min) + min);
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`, {
      method: 'GET'
    }).then(res => res.json())
      .then(res => {
        this.setState({
          pokeInfo: res,
          pokeSprite: res.sprites.front_default,
          pokeName: res.species.name,
          secondsRemaining: 10
        })
      })
      .catch((err) => console.log(err))
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.pokeName !== prevState.pokeName) {
      this.timer();
    }
  }
  timer= () => {
    let newTimer= setInterval(tick, 1000)
    const tick = () => {

    }
    console.log('timer started')
  }

  render() {
    return (
      <div className={'wrapper'}>
        <button className={'start'} onClick={() => this.fetchPokemon()}>Start!</button>
        <h1 className={'timer'} >Timer Display</h1>
        <div className={'pokeWrap'}>
          <img className={'pokeImg'} style={this.state.showPokemon ? {filter: "brightness(100%)"}: {filter: 'brightness(0%)'}} src={this.state.pokeSprite} />
          <h1 className={'pokeName'} style={{display:'none'}}>{this.state.pokeName}</h1>
        </div>
      </div>
    )
  }
}

export default PokeFetch;