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
      showPokemon: false,  
      isVisible: false
    }
  }

  countDown() {
    if (this.state.showPokemon === true && this.state.secondsRemaining > 0){
      this.setState((prevState) => ({
        secondsRemaining: prevState.secondsRemaining - 1
      })) 
      console.log(this.state.secondsRemaining)
    }
  }
  
  componentDidMount () {
    console.log("component mounted")
    this.interval= setInterval(() => this.countDown(), 1000);
    console.log(this.interval)
  }

  componentDidUpdate(prevProps, prevState) {
    // if(this.state.pokeName !== prevState.pokeName) {
    //   this.timer();
    // }
    if(this.state.secondsRemaining === 0 && this.state.isVisible === false) {
      this.setState({isVisible: true})
    }
    console.log("component updated")
  }

  componentWillUnmount() {
    console.log("component unmounted!")
    clearInterval(this.interval);
  }

  // timer= () => {
  //   let newTimer= setInterval(tick, 1000)
  //   const tick = () => {

  //   }
  //   console.log('timer started')
  // }

  fetchPokemon() {
    this.setState ({
      showPokemon: false,
      isVisible: false, 
      secondsRemaining: 10
    })
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
          showPokemon: true,
          secondsRemaining: 10
        })
      })
      .catch((err) => console.log(err))
  }

  render() {
    return (
      <div className={'wrapper'}>
        <button className={'start'} onClick={() => this.fetchPokemon()}>Start!</button>
        <h1 className={'timer'} >{this.state.secondsRemaining}</h1>
        <div className={'pokeWrap'}> 
        {this.state.isVisible ? (
          <div>
          <img className={'pokeImg'} src={this.state.pokeSprite} alt="" />
          <h1 className={'pokeName'}>{this.state.pokeName}</h1>
          </div>
         ) : (<img className={'pokeImg'} src={this.state.pokeSprite} alt= "" style={{filter: "brightness(0)"}}/>
         )}
          {/* {this.state.isVisible ? <h1 className={'pokeName'}>{this.state.pokeName}</h1> */}
        </div>
      </div>
    )
  }
}

export default PokeFetch;