import React from 'react';
import { getExchangeRate, swapWithInput, swapAndLiquidity, swapAndLiquidityWithInput, swapLiquidityFarmWithInput } from '../uniswap';
import { BeatLoader } from 'react-spinners';

const cardStyle = {
    flex: 1,
    height: "400px",
    width: "500px",
    backgroundImage: "linear-gradient(180deg, #1F2025, dodgerblue)",
    borderRadius: "20px",
    margin: "10px"
}

const functionBook = {
    a: swapWithInput,
    b: swapAndLiquidityWithInput,
    c: swapLiquidityFarmWithInput,
    d: swapAndLiquidity
}

class SimpleCard extends React.Component {
    state = {
        txAmt: 0,
        exchangeRate: 0,
        invertedExchageRate: 0,
        ethLiq: 0,
        uniLiq: 0,
        transacted: false,
        txHashes: null,
        isLoading: false
    }

    async componentDidMount() {
        await this.checkExchangeRate()
    }

    txAmtHandler = e => {
        this.setState({
            txAmt: e.target.value
        }, async () => await this.checkExchangeRate())
    }

    checkExchangeRate = async () => {
        let rate = await getExchangeRate();
        this.setState({
            exchangeRate: rate.ethToUni,
            invertedExchageRate: rate.uniToEth
        })
    }

    render() {
        let params = [];
        let swapAmnt;
        let ethLiq;
        let uniLiq;
        if(this.state.txAmt !== 0) {
            swapAmnt = this.state.txAmt / 2;
            ethLiq = this.state.txAmt - swapAmnt;
            uniLiq = swapAmnt * this.state.exchangeRate;
        }
        if(this.state.txAmt === 0 || this.state.txAmt === "") {
            swapAmnt = 0
            ethLiq = 0
            uniLiq = 0
        }

        if(this.props.functionLetter === "a") {
            params = [this.state.txAmt]
        } else if(this.props.functionLetter === "b") {
            params = [swapAmnt, ethLiq, uniLiq]
        } else if(this.props.functionLetter === "c") {
            params = [swapAmnt, ethLiq, uniLiq]
        } else if(this.props.functionLetter === "d") {
            params = []
        }

        
        return (
            <div style={cardStyle}>
                <p style={{color: "dodgerblue", fontSize: "20px"}}>{this.props.path}</p>
                <p style={{color: "#CACFD2", fontSize: "17px", textAlign: "left", marginLeft:"10px"}}><b>Path Description: </b>{this.props.description}</p>
                <span style={{color: "pink", fontSize: "19px"}}><b>1 ETH: {this.state.exchangeRate} UNI</b></span><br></br>
                <span style={{color: "pink", fontSize: "17px"}}>How much ETH do want to use on this pathway?</span><span><input onChange={this.txAmtHandler} value={this.state.swapAmt} style={{width:"50px", marginLeft:"10px"}} /></span><br></br>
                {
                    this.state.isLoading === false ?
                    <>
                        <button style={{backgroundColor: "#CACFD2", borderRadius: "5px", width: "20vw", height: "2vw"  }} onClick={async () => {
                            this.setState({isLoading: true});
                            let data = await functionBook[this.props.functionLetter](...params);
                            this.setState({
                                transacted: true,
                                txHashes: data,
                                isLoading: false
                            })
                        }}><b>transact path</b></button>
                        <br></br>
                    </>
                    :
                    <>
                        <BeatLoader loading={this.state.isLoading} />
                    </>
                }
                
                
                
                <section>
                    {
                        this.state.transacted === false ?
                        <>
                            {
                                this.props.provideLiquidity === true ?
                                <>
                                    <p style={{fontSize: "14px", textAlign: "left", marginLeft:"10px"}}>swap: {swapAmnt} ETH</p>
                                    <p style={{fontSize: "14px", textAlign: "left", marginLeft:"10px"}}>eth liq: {ethLiq} ETH</p>
                                    <p style={{fontSize: "14px", textAlign: "left", marginLeft:"10px"}}>uni liq: {uniLiq} UNI</p>
                                </>
                                :
                                <></>
                            }
                        </>
                        :
                        <>
                            <p>
                                {this.state.txHashes.map((hash, idx) => {
                                    let url = `https://rinkeby.etherscan.io/tx/${hash}`
                                    return (
                                        <p style={{fontSize: "14px", textAlign: "left", marginLeft:"10px"}} key={idx}>Tx {idx+1}: <a href={url}>view tx on etherscan</a></p>
                                    )
                                })}
                            </p>
                        </>
                    }
                    
                    
                </section> 
                
            </div>
        )
    }
    
}

export default SimpleCard;






                            
                        