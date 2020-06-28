import React from 'react';
import io from 'socket.io-client';

class App extends React.Component {

  state = {
    tasks: ['dog','cat','fish'],
    taskName: '',
  }

  componentDidMount(){
    this.socket = io('http://localhost:8000');
  }

  removeTask(index) {
    console.log(index)
    const array = this.state.tasks;
    array.splice(index, 1);
    console.log(array);
    this.setState({
      tasks: array
    })
    this.socket.emit('removeTask', { index: index });
  }

  submitForm(event) {
    event.preventDefault();
    this.addTask();
  }

  addTask(task) {

  }




  

  render() {
    return (
      <div className="App">
    
        <header>
          <h1>ToDoList.app</h1>
        </header>
    
        <section className="tasks-section" id="tasks-section">
          <h2>Tasks</h2>
    
          <ul className="tasks-section__list" id="tasks-list">
            {this.state.tasks.map(task => (
              <li key={task} className="task">{task}<button className="btn btn--red" onClick={() => this.removeTask(this.state.tasks.indexOf(task))}>Remove</button></li>
            ))}
          </ul>
    
          <form id="add-task-form" onSubmit={this.submitForm}>
            <input className="text-input" autoComplete="off" type="text" placeholder="Type your description" id="task-name" value={this.state.taskName} onChange={event => this.setState({taskName: event.target.value})}  />
            <button className="btn" type="submit">Add</button>
          </form>
    
        </section>
      </div>
    );
  };

};

export default App;