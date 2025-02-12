function ProgressBar({ index, totalQuestions, points }) {
	return (
		<header className="progress">
			<progress max={totalQuestions} value={index} />
			<p>
				Question: {index + 1}/{totalQuestions}
			</p>

			<p>
				{points}/{totalQuestions * 10} points
			</p>
		</header>
	);
}

export default ProgressBar;
