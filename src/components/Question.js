import { useEffect, useState } from 'react';
import Options from './Options';

function Question({ question, answer, correctAnswerIndex, dispatch }) {
	const [options, setOptions] = useState([]);

	useEffect(function () {
		function insertAnswer() {
			const optionsCopy = [...question.incorrect_answers];
			const randomNumber = Math.floor(Math.random() * optionsCopy.length);

			optionsCopy.splice(randomNumber, 0, question.correct_answer);
			setOptions(optionsCopy);
			dispatch({ type: 'setCorrectAnswerIndex', payload: randomNumber });
		}

		insertAnswer();
	}, []);

	return (
		<div>
			<h4>{question.question}</h4>
			<Options
				options={options}
				dispatch={dispatch}
				answer={answer}
				correctAnswerIndex={correctAnswerIndex}
			/>
		</div>
	);
}

export default Question;
