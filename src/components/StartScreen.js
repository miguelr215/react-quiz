function StartScreen({ totalQuestions, dispatch }) {
	return (
		<div className="start">
			<h2>Welcome to The React SPORTS Quiz!</h2>
			<h3>{totalQuestions} questions to test your sports knowledge</h3>
			<button
				className="btn btn-ui"
				onClick={() => dispatch({ type: 'start' })}
			>
				Let's start
			</button>
		</div>
	);
}

export default StartScreen;
