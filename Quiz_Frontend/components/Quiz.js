import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const Quiz = () => {
    const [questions, setQuestions] = useState([]);
    const [submissions, setSubmissions] = useState([]);
    const [results, setResults] = useState([]);
    const [isSubmitted, setIsSubmitted] = useState(false);
    

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get('http://localhost:8080/quiz/questions');
                setQuestions(response.data);
            } catch (error) {
                console.error('Error fetching questions', error);
            }
        };
        fetchQuestions();
    }, []);

    const handleSubmit = async () => {
        try {
            console.log('Submitting data:', submissions); // Add this line
            const response = await axios.post('http://localhost:8080/quiz/submit', submissions);
            console.log('Server response:', response.data); // Add this line
            setResults(response.data);
            setIsSubmitted(true); //successful submission
        } catch (error) {
            console.error('Error submitting quiz', error);
        }
    };
    
    const convertToAnswer = (option) => {
        switch (option) {
            case 'optionA':
                return 'a';
            case 'optionB':
                return 'b';
            case 'optionC':
                return 'c';
            case 'optionD':
                return 'd';
            default:
                return '';
        }
    };

    const handleAnswerSelect = (questionId, answer) => {
        if(isSubmitted){
            return;
        }
        console.log('Option selected:', questionId, answer); // Add this line
        const answervalue=convertToAnswer(answer)
        const submission = { id: questionId, answer:answervalue };
        setSubmissions([...submissions, submission]);
    
        
    };

    return (
        <div className='quiz-container'>
            <h1>Quiz</h1>
            {questions.length > 0 ? (
                questions.map((question) => (
                    <div key={question.id}>
                        <h3>{question.question}</h3>
                        <ol>
                            <li>
                                <button className='button' onClick={() => handleAnswerSelect(question.id, 'optionA')}
                            disabled={isSubmitted}>
                                    {question.optionA}
                                </button>
                            </li>
                            <li>
                                <button className='button' onClick={() => handleAnswerSelect(question.id, 'optionB')}disabled={isSubmitted}>
                                    {question.optionB}
                                </button>
                            </li>
                            <li>
                                <button className='button' onClick={() => handleAnswerSelect(question.id, 'optionC')}disabled={isSubmitted}>
                                    {question.optionC}
                                </button>
                            </li>
                            <li>
                                <button className='button' onClick={() => handleAnswerSelect(question.id, 'optionD')}disabled={isSubmitted}>
                                    {question.optionD}
                                </button>
                            </li>
                        </ol>
                    </div>
                ))
            ) : (
                <p>Loading...</p>
            )}
            {!isSubmitted &&(
            <button onClick={handleSubmit}>Submit</button>
            )}
            
            {/* Displaying results */}
            {results.length > 0 && (
                <div>
                    <h2>Results</h2>
                    <ol>
                        {results.map((result, index) => (
                            <li key={index}>{result}</li>
                        ))}
                    </ol>
                </div>
            )}
        </div>
    );
};

export default Quiz;
