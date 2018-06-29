import React from 'react';
import './App.css';
import axios from 'axios';
import Avatar from './newsroom.jpg';
import PaginationButton from './PaginationButton'

function Person({info}){
  return(
    <div className="pond">  
    <div className="card">
      <h1 className="h1">
      <span className="text">
{info.name.indexOf(' ')>=0 ? <span className="text3">{info.name.substring(0,1)}{info.name.split(' ').slice(-1).join(' ').substring(0,1)}</span>:<span className="text2">{info.name.substring(0,1)}</span>} 
      </span><span class="circle"/>
    <span className="j">{info.name}</span> </h1> 
     
             <p id="c"><b>Recognition:  </b></p><p id="b">{info.recognition}</p>        
      </div>
      </div>
  );    
}

export default class PersonList extends React.Component  {
constructor()
{
  super();
   this.state = {
      persons:[],
      currentPage:0,
    }
  this.updatePage=this.updatePage.bind(this);
  }
  
  componentDidMount(){
    axios.get(`https://xi-apps.in/app/api/recognitions?token=tFcEtB5kxsN1gaS207MOHKs5`)
    .then(res => {
      const persons = res.data;
      this.setState({ persons });
    })
 }

updatePage(e)
{
  let startRecord = (parseInt(e.target.innerText)-1)*9;
  console.log(startRecord);
  this.setState({
    currentPage:startRecord
  });
}

  getPaginationButtons(numberOfPages) {
    debugger;
    let buttons = [];
    for(let i=1;i<=Math.ceil(numberOfPages);i++){
      buttons.push(<PaginationButton pageNumber={i} updatePage={this.updatePage}/> )
    };
    return buttons;
  }
  render() {  
    let buttons = [];
    if(this.state.persons && this.state.persons.length){
      buttons = this.getPaginationButtons(this.state.persons.length/9);
    }
    var currentPage=parseInt(this.state.currentPage);
    
    return(
      
        <div className="container">
        <img src={Avatar} class="img" width="1300" height="140"/>
          {this.state.persons.slice(currentPage,currentPage+9).map(item => {
            var o={
                name: item.recognizerName,
                recognition: item.recognitionMessage
            };
            return <Person info={o}/>  
        })}
       
        <div class="pagination">
  <a href="#">&laquo;</a>
    {buttons}
  <a href="#">&raquo;</a>
</div>
</div>  
      );
  }
  
}

