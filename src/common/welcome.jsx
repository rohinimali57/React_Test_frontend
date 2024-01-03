import React, { Component } from 'react'
import Dashboard from '../images/dashboard.svg'
//import Bell from '../images/bell.svg'
export class welcome extends Component {
  constructor(props) {
    super(props)
    var today = new Date(),
    date = today.getFullYear() + '-'+(today.getMonth() < 10 ? "0" : "") + (today.getMonth() + 1) + '-'+(today.getDate() < 10 ? "0" : "") + today.getDate()+today.getHours()+':'+ today.getMinutes()+':'+ today.getSeconds();

    this.state = {
      date: date,            
      loginData: (JSON.parse(localStorage.getItem('LoginData'))).user, 
    }
}
    render() {
        return (
            <div>
              <div className="container-fluid">
                {/* <div className="row has-shadow" style={{borderRadius: '1rem', backgroundColor: 'white'}}> */}
                  <div className="col-12">
                    <div className="d-flex mt-3">
                      <p style={{fontSize: '16px',fontWeight:"bolder",marginLeft:"5px"}} className="paddingRight">{this.state.date}</p>
                      {/* <img src={Bell} alt="logo" className="img-fluid d-flex mx-auto pl-5" /> */}
                    </div>
                    <img src={Dashboard} alt="pi" className="img-fluid d-flex mx-auto mt-3" style={{width: '15%'}} />
                    <h4 className="text-center mt-3" style={{fontFamily: 'LATO-BOLD', color: '#303974'}}>Welcome</h4>
                    <h4 className="text-center mt-3" style={{fontFamily: 'LATO-BOLD', color: '#303974'}}>
                    {this.state.loginData.firstName}{this.state.loginData.lastName} </h4>
                    <p className="text-center pb-3" style={{fontSize: '12px'}}>{this.state.loginData.division}</p>
                  </div>
                {/* </div> */}
              </div>   
            </div>
        )
    }
}

export default welcome
