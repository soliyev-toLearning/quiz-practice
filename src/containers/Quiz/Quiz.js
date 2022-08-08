import React, { Component } from 'react'
import { ActiveQuiz } from '../../components/ActiveQuiz/ActiveQuiz'
import classes from './Quiz.module.css'

export default class Quiz extends Component {
    state = {
        activeQuestion: 0,
        isFinished: false,
        answerState: null, // {[1]: 'success'; 'error'}
        quiz: [
            {
                question: 'Who was discovered Amerika?',
                id: 1,
                correctAnswerId: 1,
                answers: [
                    { text: 'Columb', id: 1 },
                    { text: 'Robinson', id: 2 },
                    { text: 'Harry Potter', id: 3 },
                    { text: 'Jo Bayden', id: 4 },
                ]
            },
            {
                question: 'When is independense day of Uzbekistan?',
                id: 2,
                correctAnswerId: 2,
                answers: [
                    { text: '1997', id: 1 },
                    { text: '1991', id: 2 },
                    { text: '1990', id: 3 },
                    { text: '1989', id: 4 },
                ]
            }
        ]
    }

    onAnswerClickHandler = (answerId) => {
        const question = this.state.quiz[this.state.activeQuestion]
        if (question.correctAnswerId === answerId) {
            this.setState({
                answerState: { [answerId]: 'success' }
            })
            const timeout = window.setTimeout(() => {
                if (this.state.activeQuestion === this.state.quiz.length - 1) {
                    this.setState({
                        isFinished: !this.state.isFinished
                    })
                } else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null
                    })
                }
                window.clearTimeout(timeout)
            }, 1000)
        } else {
            this.setState({
                answerState: { [answerId]: 'error' }
            })
        }
    }

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Quiz</h1>
                    {
                        this.state.isFinished
                            ? <h1>Finished</h1>
                            : <ActiveQuiz
                                activeQuestion={this.state.activeQuestion + 1}
                                question={this.state.quiz[this.state.activeQuestion].question}
                                answers={this.state.quiz[this.state.activeQuestion].answers}
                                onAnswerClick={this.onAnswerClickHandler}
                                quizLength={this.state.quiz.length}
                                classState={this.state.answerState}
                            />
                    }
                </div>
            </div>
        )
    }
}
