import React from 'react';
import { answerObject } from '../App'
type Props = {
    question: string;
    answer: string[];
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer: answerObject | undefined;
    questionNr: number;
    totalQuestions: number;

}

const QuestionCard: React.FC<Props> = ({ question, answer, callback, userAnswer, questionNr, totalQuestions }) =>
    (

        <div>
            <p className='number'>
                Question:{questionNr} / {totalQuestions}
            </p>
            <p dangerouslySetInnerHTML={{ __html: question }} />


            <div>{answer.map((answer, index) => (
                <div key={index}>
                    <button value={answer} disabled={!!userAnswer} onClick={callback}>
                        <span dangerouslySetInnerHTML={{ __html: answer }} />
                    </button>
                </div>
            ))}</div>
        </div>


    );


export default QuestionCard;