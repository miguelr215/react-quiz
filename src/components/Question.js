import { useEffect } from 'react';
import Options from './Options';

function Question({
	question,
	options,
	answer,
	correctAnswerIndex,
	index,
	dispatch,
	totalQuestions,
}) {
	const hasAnswered = answer !== null;

	useEffect(
		function () {
			function insertAnswer() {
				const optionsCopy = [...question.incorrect_answers];
				const randomNumber = Math.floor(
					Math.random() * optionsCopy.length
				);

				optionsCopy.splice(randomNumber, 0, question.correct_answer);
				dispatch({
					type: 'setCorrectAnswerIndex',
					payload: randomNumber,
				});
				dispatch({ type: 'setOptions', payload: optionsCopy });
			}

			insertAnswer();
		},
		[question.incorrect_answers, question.correct_answer, dispatch]
	);

	return (
		<div>
			<h4>{question.question}</h4>
			<Options
				options={options}
				dispatch={dispatch}
				answer={answer}
				correctAnswerIndex={correctAnswerIndex}
			/>
			{hasAnswered && index < totalQuestions - 1 && (
				<button
					className="btn btn-ui"
					onClick={() =>
						dispatch({ type: 'nextQuestion', payload: index + 1 })
					}
				>
					Next
				</button>
			)}
			{hasAnswered && index === totalQuestions - 1 && (
				<button
					className="btn btn-ui"
					onClick={() => dispatch({ type: 'finish' })}
				>
					Finish
				</button>
			)}
		</div>
	);
}

export default Question;
