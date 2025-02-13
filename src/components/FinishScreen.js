function FinishScreen({ points, totalQuestions, dispatch }) {
	const percentage = (points / (totalQuestions * 10)) * 100;

	let emoji;
	if (percentage === 100) emoji = '🏆';
	if (percentage >= 50 && percentage < 100) emoji = '🎉';
	if (percentage < 50) emoji = '🙃';
	if (percentage === 0) emoji = '🤦🏽‍♂️';

	return (
		<>
			<p className="result">
				<span>{emoji}</span> You scored <strong>{points}</strong> points
				out of {totalQuestions} questions ({Math.ceil(percentage)}%)
			</p>
			<button
				className="btn btn-ui"
				onClick={() => dispatch({ type: 'restart' })}
			>
				Restart Quiz?
			</button>
		</>
	);
}

export default FinishScreen;
