import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import ListItem from './ListItem';

export default class Todo extends Component {
   

    state={
      list:[],
      text: '',
      filterType: 'All'
    };


    handleChange = (event) => {
        this.setState({text: event.target.value});
    };

    
    handleAdd = (e) => {
      if (e.key === 'Enter') {
        if(this.state.text!=='') {
           let obj = {
               id: Math.round(Math.random() * 100),
               name: this.state.text,
               isCompleted: false
           };
           const list =[...this.state.list,obj];
           this.setState({list:list, text:''});
        }
      }
    };

    strikedata = (id) => {
        console.log('Checked!!!', id);
        const list = this.state.list.map((ele) => {
          if (id === ele.id) {
            return {
              ...ele,
              isCompleted: !ele.isCompleted
            };
          } else {
            return ele;
          }
        });
        this.setState({ list: list });
      };
      handleDelete = (id) => {
        console.log('del', id);
        const list = this.state.list.filter((element, i) => {
          return element.id !== id;
        });
        console.log('NewList:', list);
        this.setState({ list: list });
      };
      checkimg = (id) => {
        <FontAwesomeIcon icon={faCheck} className="tick"/>   
    
        
      };
      update = (updatedListItem, id) => {
        const list = this.state.list;
        list[id] = updatedListItem;
    
        this.setState({ list });
      };
      //Tabs
      Active = (e) => {
        e.preventDefault();
        this.setState({ filterType: 'Active' });
      };
      Completed = (e) => {
        e.preventDefault();
        this.setState({ filterType: 'Completed' });
      };
      All = (e) => {
        e.preventDefault();
        this.setState({ filterType: 'All' });
      };
      Clear = (e) => {
        e.preventDefault();
        let clear = [];
    
        clear = this.state.list.filter((ele) => {
          return ele.isCompleted === false;
        });
    
        this.setState({ list: clear });
      };
    




  render() {


    let count = this.state.list.filter((e) => {
        return e.isCompleted === false;
      }).length;
  
      const { filterType } = this.state;
      let filteredlist = [];
      if (filterType === 'Active') {
        filteredlist = this.state.list.filter((e) => {
          return e.isCompleted ===false;
        });
      } else if (filterType === 'Completed') {
        filteredlist = this.state.list.filter((e) => {
          return e.isCompleted === true;
        });
      } else {
        filteredlist = this.state.list;
      }
  
    return (
        <div>
        <div className='main-content'>
          <div className='title'>
            <p>Todo List</p>
          </div>
 

          <div className="box">
            <div className="box1">
              <i>
                <input
                  type="text"
                  id="input"
                  name="caption"
                  placeholder="        What needs to be done ?"
                  autoComplete='off'
                  value={this.state.text}
                  onChange={this.handleChange}
                  onKeyDown={this.handleAdd}
                />
              </i>
            </div>

            <ul id='ul'>
            {filteredlist.map((obj, i) => {
                return (
                  <ListItem
                    key={i}
                    index={i}
                    id={obj.id}
                    obj={obj}
                    isCompleted={obj.isCompleted}
                    checkdata={this.strikedata}
                    deletedata={this.handleDelete}
                    updatedata={this.update}
                    image={this.checkimg}
                    value={obj.name}
                  />
                );
              })}

            </ul>

         </div>
        </div>

       <div> 
       <div className="tabs" id="tab">
            <div className="count">
              <p id="c">
                <strong id="counter"></strong>
               {count}Items Left
              </p>
            </div>
          </div>
          <div className="buttons">
            <button id="all" onClick={this.All}>
              <a href="/all" id="bt1">
                All
              </a>
            </button>
            <button id="active" onClick={this.Active}>
              <a href="/active" id="bt1">
                Active
              </a>
            </button>
            <button id="completed" onClick={this.Completed}>
              <a href="/completed" id="bt1">
                Completed
              </a>
            </button>
            <button id="clear" onClick={this.Clear}>
              <a href="/clear" id="bt1">
                Clear&nbsp;Completed
              </a>
            </button>
          </div>

       </div>



      </div>
      
    )
  }
}
