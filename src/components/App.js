import { useEffect, useReducer } from 'react';
import Header from './Header';
import Main from './Main';
import Loader from './Loader';
import Error from './Error';
import StartScreen from './StartScreen';
import Question from './Question';

const initialState = {
	questions: [],

	// loading, error, ready, active, finished
	status: 'loading',
	index: 0,
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
		default:
			throw new Error('Action unknown');
	}
}

export default function App() {
	const [{ questions, status, index, answer, correctAnswerIndex }, dispatch] =
		useReducer(reducer, initialState);

	const totalQuestions = questions.length;

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
					<Question
						question={questions[index]}
						dispatch={dispatch}
						answer={answer}
						correctAnswerIndex={correctAnswerIndex}
					/>
				)}
			</Main>
		</div>
	);
}
