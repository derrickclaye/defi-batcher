import React from 'react';
import { checkFarmingStats } from '../uniswap';

class FarmingStats extends React.Component{

    state = {
        stakingBalance: 0,
        isStaking: false,
        startTime: null,
        pumpBalance: 0
    }
    

    getFarmStats = async () => {
        let stats = await checkFarmingStats()
        this.setState({
            stakingBalance: String(stats.stakingBalance),
            isStaking: stats.isStaking,
            startTime: String(stats.startTime),
            pumpBalance: String(stats.pumpBalance)
        })
    }
    render() {
        return (
            <div style={{
                
                alignSelf:"start",
                marginLeft: "10px",
                backgroundImage: "linear-gradient(180deg, #1F2025, pink)",
                borderRadius: "20px",
                }}>
                {
                    this.state.isStaking === true ?
                    <>
                        <p style={{fontSize: "14px", paddingRight:"10px", paddingLeft:"10px"}}><b>You are currently staking</b></p>
                    </>
                    :
                    <>
                        <p style={{fontSize: "14px", paddingRight:"10px", paddingLeft:"10px"}}><b>You are not currently staking</b></p>
                    </>
                }
                
                
                <p style={{fontSize: "14px", paddingRight:"10px", paddingLeft:"10px"}}><b>Staking Balance:</b> {this.state.stakingBalance}</p>
                <p style={{fontSize: "14px", paddingRight:"10px", paddingLeft:"10px"}}><b>Pump Balance:</b>    {this.state.pumpBalance}</p>
                <p style={{fontSize: "14px", paddingRight:"10px", paddingLeft:"10px"}}><b>Start Time:</b>      {this.state.startTime}</p>
                <button style={{margin:"5px"}} onClick={this.getFarmStats}>refresh</button>
            </div>
        )
    }
}

export default FarmingStats;