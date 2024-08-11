import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import Home from './Routes/Home';
import Navbar from './Components/Top/Navbar';
import Statistics from './Routes/Statistics';
import Matches from './Routes/Matches';
import Login from './Routes/Login';
import CloseMatch from './Components/Admin/CloseMatch';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from "react-toastify";
import { GetDataTournamentsReducer } from './Redux/Actions/Tournaments/Tournaments';
import { ValidateUserReducer } from './Redux/Actions/Top/Top';
import Positions from './Routes/Positions';
import PositionsUsers from './Routes/PositionsUsers';
import PredictMatches from './Components/Games/PredictMatches';

function App() {

	const dispatch = useDispatch()
	const navigate = useNavigate()

	const [ isAuth, setIsAuth ] = useState(false)
	const location = useLocation();

	const {
        rex_data_user
    } = useSelector(({top}) => top)

	const getTournaments = async () => {
		if (location.pathname !== '/login') {

			const response = await dispatch(ValidateUserReducer())
			setIsAuth(response)
			if(!response){
				navigate('/login')
			}
		}else{
			await dispatch(GetDataTournamentsReducer())
		}
	}

	useEffect(()=>{
		getTournaments()
	},[])

	return (
		<>
			{
				!rex_data_user.usutoken
				? <Routes>
					<Route path="/login" element={<Login />} />
				</Routes>
				:	<>
						<Navbar/>
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/positions" element={<Positions />} />
							<Route path="/statistics" element={<Statistics />} />
							<Route path="/matches" element={<Matches />} />
							<Route path="/users" element={<PositionsUsers />} />
							<Route path="/game-prediction" element={<PredictMatches />} />
							<Route path="/close-match" element={<CloseMatch />} />
						</Routes>
					</>

			}
			{/* <Navbar/> */}
			{/* <Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/home" element={<Home />} />
				<Route path="/statistics" element={<Statistics />} />
				<Route path="/matches" element={<Matches />} />
			</Routes> */}
			<ToastContainer />
		</>
	);
}

export default App;
