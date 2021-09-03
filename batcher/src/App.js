import logo from './logo.svg';
import './App.css';
import { pumpFarm, addLiquidity, test, swap, swapAndLiquidity, checkMetaMaskConnection, swapWithInput } from './uniswap';
import React from 'react';
import SimpleCard from './components/SimpleCard';
import FarmingStats from './components/FarmingStats';

const cardInfo = {
  swap: {
    path: "Simple Swap",
    description: "Swap Ether for UNI"
  },
  swapLiq: {
    path: "Swap | Provide Liquidity",
    description: "Swap Ether for UNI then provide liquidity to UNI/WETH liquidity pool."
  },
  swapLiqFarm: {
    path: "Swap | Provide Liquidity | Yield Farm",
    description: "Swap Ether for UNI, provide liquidity to UNI/WETH liquidity pool, then use LP Tokens to Yield Farm PumpToken  "
  }
}

class App extends React.Component{

  state = {
    amount: 0,
    swapHash: ''
  }
  componentDidMount() {
    checkMetaMaskConnection()
  }

  amountInputHandler = e => {
    this.setState({amount: e.target.value})
  }

  swap = async () => {
    let hash = await swapWithInput(this.state.amount)
    this.setState({
      amount:0,
      swapHash: hash
    })
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 style={{alignSelf:"start", marginLeft: "15px", color:"pink", fontFamily: "Brush Script MT"}} >BATCHER </h1>
          <FarmingStats />
        </header>
        <div className="content"> 
          <SimpleCard path={cardInfo.swap.path} description={cardInfo.swap.description} provideLiquidity={false} functionLetter="a" />
          <SimpleCard path={cardInfo.swapLiq.path} description={cardInfo.swapLiq.description} provideLiquidity={true} functionLetter="b" />
          <SimpleCard path={cardInfo.swapLiqFarm.path} description={cardInfo.swapLiqFarm.description} provideLiquidity={true} functionLetter="c" farming={true} />

          <br></br>
        </div>
      </div>
    );
  };
  
};

export default App;
