import { useEffect, useReducer } from 'react';
import Header from './Header';
import Main from './Main';
import Loader from './Loader';
import Error from './Error';
import StartScreen from './StartScreen';
import Question from './Question';
import ProgressBar from './ProgressBar';
import FinishScreen from './FinishScreen';

const initialState = {
	questions: [],

	// loading, error, ready, active, finished
	status: 'loading',
	index: 0,
	options: [],
	correctAnswerIndex: null,
	answer: null,
	points: 0,
};

function reducer(state, action) {
	switch (action.type) {
		case 'dataReceived':
			return { ...state, questions: action.payload, status: 'ready' };
		case 'dataFailed':
			return { ...state, status: 'error' };
		case 'start':
			return { ...state, status: 'active' };
		case 'setOptions':
			return { ...state, options: action.payload };
		case 'setCorrectAnswerIndex':
			return { ...state, correctAnswerIndex: action.payload };
		case 'newAnswer':
			return {
				...state,
				answer: action.payload,
				points:
					state.correctAnswerIndex === action.payload
						? state.points + 10
						: state.points,
			};
		case 'nextQuestion':
			return {
				...state,
				index: action.payload,
				answer: null,
				correctAnswerIndex: null,
				options: [],
			};
		case 'finish':
			return { ...state, status: 'finish' };
		case 'restart':
			return {
				...initialState,
				questions: state.questions,
				status: 'ready',
			};
		default:
			throw new Error('Action unknown');
	}
}

export default function App() {
	const [
		{
			questions,
			status,
			index,
			options,
			answer,
			correctAnswerIndex,
			points,
		},
		dispatch,
	] = useReducer(reducer, initialState);

	const totalQuestions = questions?.length;

	useEffect(function () {
		async function getQuestions() {
			try {
				const response = await fetch(
					'https://opentdb.com/api.php?amount=15&category=21&type=multiple'
				);
				const data = await response.json();
				console.log(data);
				if (data.response_code === 0) {
					dispatch({ type: 'dataReceived', payload: data.results });
				}
			} catch (error) {
				dispatch({ type: 'dataFailed' });
			}
		}

		getQuestions();
	}, []);

	return (
		<div className="app">
			<Header />
			<Main>
				{status === 'loading' && <Loader />}
				{status === 'error' && <Error />}
				{status === 'ready' && (
					<StartScreen
						totalQuestions={totalQuestions}
						dispatch={dispatch}
					/>
				)}
				{status === 'active' && (
					<>
						<ProgressBar
							index={index}
							totalQuestions={totalQuestions}
							points={points}
						/>
						<Question
							question={questions[index]}
							dispatch={dispatch}
							options={options}
							answer={answer}
							correctAnswerIndex={correctAnswerIndex}
							index={index}
							totalQuestions={totalQuestions}
						/>
					</>
				)}
				{status === 'finish' && (
					<FinishScreen
						points={points}
						totalQuestions={totalQuestions}
						dispatch={dispatch}
					/>
				)}
			</Main>
		</div>
	);
}
