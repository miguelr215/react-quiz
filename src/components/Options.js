function Options({ options, answer, correctAnswerIndex, dispatch }) {
	const hasAnswered = answer !== null;

	return (
		<div className="options">
			{options.map((option, index) => (
				<button
					className={`btn btn-option ${
						index === answer ? 'answer' : ''
					} ${
						hasAnswered
							? index === correctAnswerIndex
								? 'correct'
								: 'wrong'
							: ''
					}`}
					key={option}
					disabled={hasAnswered}
					onClick={() =>
						dispatch({ type: 'newAnswer', payload: index })
					}
				>
					{option}
				</button>
			))}
		</div>
	);
}

export default Options;
