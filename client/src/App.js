import React from 'react';
import io from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';

class App extends React.Component {

  state = {
    tasks: [],
    taskName: '',
  }

  componentDidMount(){
    this.socket = io('http://localhost:8000');
    this.socket.on('addTask', (task) => this.addTask(task));
    this.socket.on('removeTask', (id) => this.removeTask(id));
    this.socket.on('updateData', (tasks) => this.updateTask(tasks));
  }

  removeTask(id, execute) {
    //console.log('id is: ',id)
    const ind = this.state.tasks.findIndex(item => item.id === id)
    //console.log('ind is: ',ind)
    console.log(this.state.tasks)
    const allTasks = this.state.tasks
    allTasks.splice(ind, 1)
    this.setState({
      tasks: allTasks
    })
    if (execute === true) {
      this.socket.emit('removeTask', (id));
    }
  }

  submitForm = event =>{
    event.preventDefault();
    const randomId =uuidv4();
    this.addTask({id: randomId, name:this.state.taskName});
    this.socket.emit('addTask',{id:randomId, name:this.state.taskName});
  }

  addTask(task) {
    this.setState({
      tasks: [...this.state.tasks, task],
    })
  }

  updateTask(tasks) {
    this.setState({
      tasks:  [ ...tasks],
    });
  }


  render() {

    const taskList = this.state.tasks.map((task, index) =>(
      <li key={index} className="task"><sup className="super">{task.id}</sup>{task.name}<button className="btn btn--red" onClick={() => this.removeTask(task.id, true)}>Remove</button></li>
    ));

    return (
      <div className="App">
    
        <header>
          <h1>ToDoList.app</h1>
        </header>
    
        <section className="tasks-section" id="tasks-section">
          <h2>Tasks</h2>
    
          <ul className="tasks-section__list" id="tasks-list">
            {taskList}
          </ul>
    
          <form id="add-task-form" onSubmit={this.submitForm}>
            <input className="text-input" autoComplete="off" type="text" required placeholder="Type your description" id="task-name" value={this.state.taskName} onChange={event => this.setState({taskName: event.target.value})}  />
            <button className="btn" type="submit">Add</button>
          </form>
    
        </section>
      </div>
    );
  };

};

export default App;