import React, {Component} from 'react';
import './App.scss';

const newQuiz = [{
  name: "Food Quiz",
  author: "Eric Frosty",
  questions: [
    {
      questionName: "Whats the best",
      answers: [
        {
          text: "Fish Tacos"
        },
        {
          text: "Spagetti"
        },
        {
          text: "Lutefisk"
        }
      ]
    },
    {
      questionName: "Whats the worst",
      answers: [
        {
          text: "Kale"
        },
        {
          text: "Tomatoes"
        },
        {
          text: "Lutefisk"
        }
      ]
    },
    {
      questionName: "Whats the best team in the midlands",
      answers: [
        {
          text: "Wolverhampton Wanderers"
        },
        {
          text: "West Scum"
        },
        {
          text: "Trashton Villa"
        }
      ]
    }
  ]
}]

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      quizzes: newQuiz
    }
  }

  // componentDidMount(){
  //   fetch('http://localhost:8080/get-all-quizzes')
  // .then(response => {
  //   return response.json();
  // })
  // .then(myJson => {
  //   this.setState({
  //     quizzes: myJson
  //   }, () => {
  //     console.log(this.state.quizzes);
  //   })
  // });
  // }

  handleAddQuiz = (e) => {
    e.preventDefault();
    console.log(e);
    fetch('http://localhost:8080/add-quiz', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(newQuiz),
    })
    .then(res => {
      if(res.status ===200){
        console.log("quiz added")
      }else {
        console.log("something else")
      }
    })
    .catch(err => {
      console.log(err);
    });
  }

  render(){
    return (
      <div className="App container">
      <nav className="navbar navbar-light bg-light">
  <span className="navbar-brand mb-0 h1">OpenQuiz</span>
        <i className="far fa-plus-square" onClick={e => this.handleAddQuiz(e)}></i>
      </nav>
      <div className="container">
        {this.state.quizzes.map((quiz, index) => {
          return(
            <div className="card">
            <div className="card-body">
            <div key={index}>
              <p>Quiz Name:{quiz.name}</p>
              <p>Author Name:{quiz.author}</p>
              {quiz.questions.map((question, index) => {
                return(
                  <div>
                    <p>Question {index + 1}: {question.questionName}</p>
                    {question.answers.map((answer, index) => {
                      return (
                        <p key={index}>{answer.text} </p>
                      )
                    })}
                  </div>
                )
              })}
            </div>
            </div>
        </div>
          )
        })}
      </div>

      </div>
    );
  }

}

export default App;
