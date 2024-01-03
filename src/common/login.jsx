import React, {  } from 'react'
import Nell from '../images/nell-logo.svg'
import { connect } from 'react-redux'
import { sha256 } from 'js-sha256';
import Swal from 'sweetalert2'
import { handleLogin} from '../actions/Login';
 class login extends React.Component {
    constructor() {
        super()
    //   this.myFunction=this.myFunction.bind(this);
        this.state = {
          userName:"",
          userPassword:"",	
          LoginStore:{
            "bankCode":"",
            "userId":"",
            "pwd":""
          },
        }
      }
      handleChange= (e)=> {  
        var LoginStore1 = this.state.LoginStore
        LoginStore1[e.target.id] = e.target.value
        this.setState({LoginStore:LoginStore1});  
        }
        async login (){
            debugger
           var data = this.state.LoginStore;
           if(this.state.LoginStore.bankCode===null||this.state.LoginStore.bankCode===""||this.state.LoginStore.bankCode===undefined){
                Swal.fire("Please enter bankcode");
              return
             }
             
             if(this.state.LoginStore.userId===null||this.state.LoginStore.userId===""||this.state.LoginStore.userId===undefined)
             {
                Swal.fire("Please enter user id");
              return
             }

             if(this.state.LoginStore.pwd===null||this.state.LoginStore.pwd===""||this.state.LoginStore.pwd===undefined)
             {
                Swal.fire("Please enter password");
              return
             }
           data.pwd= sha256(data.pwd)
          const res =  await this.props.dispatch(handleLogin(data))
          console.log('res',res)
         console.log("Login1",res.data)
          if(res.data===undefined){
            Swal.fire("Invalid credentials");
          }else if(res.data===""){
            Swal.fire("Invalid credentials");
          }
          else if(res.data.message.summary==="user is locked contact to Admin"){
            Swal.fire("User is locked");
          }
          else{
           this.props.history.push('/Dashboard');
          }
          
        }

        myFunction=(e)=>{
          if(e.key === 'Enter'){
              this.login();
          }
      }
      
    render() {
        console.log("login",this.state.LoginStore)
        return (
            <React.Fragment>
                <div className>
        <div className="loginForm shadow-lg p-3" style={{marginTop: '4rem'}}>
          <img src={Nell} alt="logo nell" className="img-fluid d-block mx-auto my-4" style={{width: '30%'}} />
          <div className="form-group" style={{padding: '15px'}}>
              <label htmlFor="bankCode">Bank Code</label>
              <input type="text" className="form-control inputField glowing-border" id="bankCode"
                onChange={this.handleChange} placeholder="Enter the Bank Code " value={this.state.LoginStore.bankCode!==""?this.state.LoginStore.bankCode:""} />
            </div>
            <div className="form-group" style={{padding: '15px'}}>
              <label htmlFor="userId">User-ID</label>
              <input type="text" className="form-control inputField glowing-border" id="userId" placeholder="Enter the UserID "
                onChange={this.handleChange} value={this.state.LoginStore.userId!==""?this.state.LoginStore.userId:""} />
            </div>
            <div className="form-group mb-3" style={{padding: '15px'}}>
              <label htmlFor="pwd">Password</label> 
              <input type="password" className="form-control inputField glowing-border" id="pwd"  placeholder="Enter the Password " onKeyPress={this.myFunction}
                onChange={this.handleChange} value={this.state.LoginStore.pwd!==""?this.state.LoginStore.pwd:""} />
            </div>                                                    
            <button name="submit" className="LoginButton py-2 btn-block mt-4 mb-3" type="submit" style={{width: '88%', marginLeft: '1rem'}}
            onClick={() => this.login()}>Login</button>
         
        </div>
      </div>
            </React.Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return { 
    }
  }
export default connect(mapStateToProps) (login)
