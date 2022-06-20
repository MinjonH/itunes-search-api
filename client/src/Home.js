import React from 'react';
import axios from 'axios';
import './styles/App.css';

//Bootstrap Styling
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container'

//Components
import SignUp from './components/SignUp.js'

export default class App extends React.Component {

  //Contruncted starting state:
  state = {
    media: [],
    error: "Error - Please try again",
    showModal: false,
    signUp: null
  };

  //test comment
    
  //ON LOAD
 componentWillMount = () => {
      axios.get('/')
      .then(
        (res) => {
          this.setState({
              projects: res.data
          });
        },
        (error) => {
          console.log(error);
          this.setState({
              error
          });
        }
      )
  }

  //POST
  addMedia = (e) => {  
    e.preventDefault(); 
    const id = e.target.id.value; 
    const title = e.target.title.value; 
    axios.post("/user", {
        id: id,
        title: title
        })
        .then( res => {
          const newProjects = [...this.state.projects];
          newProjects.push(res.data);
          this.setState({projects: newProjects});
        })
        .catch(error => console.log(`${error}`));
  }
 
  //PUT
  signUp = (e) => {
    e.preventDefault(); 
    const id = this.state.signUp.id; 
    const title = e.target.title.value;
    axios.put("/", {
      id: id,
      title: title
      })
      .then( res => {
        const newProjects = [...this.state.projects];
        const targetItem = newProjects.find(item => item.id === res.data.id);
        targetItem.title = res.data.title;
        this.setState({projects: newProjects});
        this.hideModal();
      })
      .catch(error => console.log(`Error: ${error}`));
  }

  //DELETE
  deleteMedia = (id) => {
    axios.delete("/user", {params: {id: id}})
    .then(res => {
      const filteredProjects = this.state.projects.filter(item =>item.id !== id);
      this.setState({projects: filteredProjects});
    })
    .catch(error => console.log(`Error message: ${error}`));
  }
  
  //SIGN UP MODAL HANDLING
  showModal = (project) => {
    this.setState({showModal: true, signUp: project});
  } 

  hideModal = () => {
    this.setState({showModal: false,  signUp: null});
  } 


  render() {
    return (
      <div>
          <div className="main">
              <Container className="container">
                  <Row className="row">
                      <Col className="title-container">
                        <h1 className="title">Web Projects</h1>
                      </Col>
                  </Row>
                  <Row className="row">
                      <Col className="forms-container">
                          <Forms onSubmit={this.addMedia} />
                      </Col>
                  </Row>
                  <Row className="row">
                      <Col className="projects-container">
                          <Projects projects={this.state.projects} deleteMedia={this.deleteMedia} signUp={this.showModal} />
                      </Col>
                  </Row>
                  <SignUp show={this.state.showModal} onHide={this.hideModal} submitEdit={this.signUp}/>
              </Container>
          </div>
      </div>
    );
  }
}

