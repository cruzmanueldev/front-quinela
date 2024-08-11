import React, { useEffect } from 'react'
import { Col, Row } from 'antd'
import './../../Styles/Components/Games/CardMatchPlayOff.css'
import { EditWinMatchPredictionReducer } from '../../Redux/Actions/Matches/Matches'
import { useDispatch } from 'react-redux'

const CardMatchPlayOff = ({
	teamHome, 
	iconHome, 
	teamAway, 
	iconAway, 
	infoMatch,
	infoMatchLocal,
	setInfoMatch,
	teamWin,
	infoMatchAway,
	match
}) => {

	const dispatch = useDispatch()

	const changeWin = (team, icon, teamLoser, iconLoser) => {
		dispatch(EditWinMatchPredictionReducer(team,icon, match, teamLoser, iconLoser))
	}


	return (
		<Col span={24} style={{display:'flex', justifyContent:'center', alignItems:'center', gap:'10px', marginTop:'10px'}}>
			<Row style={{width:'100%'}}>
				<Col span={10}>
					<div 
						className={`ContainerTeamMatchPlayOff ${(teamHome == teamWin && teamWin != null) && (['A','B','C','D','E','F'].includes(match) == true) ?'TeamWinSelected':''}`}
						onClick={()=> changeWin(teamHome, iconHome, teamAway, iconAway)}
					>
						{
							teamHome
							? <>
								<div style={{whiteSpace:'nowrap', textOverflow:'ellipsis', overflow:'hidden'}}>{teamHome}</div>
									<img
										width={30}
										height={30}
										src={iconHome}
									/>
								</>
							: <div style={{height:'30px', display:'flex',alignItems:'center', marginRight:'5px'}}>Seleccionar</div>
						}
					</div>
				</Col>
				<Col span={4} style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
					<div> vs </div>
				</Col>
				<Col span={10}>
					<div 
						className={`ContainerTeamMatchPlayOffRight ${(teamAway == teamWin && teamWin != null) && (['A','B','C','D','E','F'].includes(match)== true) ?'TeamWinSelected':''}`}
						onClick={()=> changeWin(teamAway, iconAway, teamHome, iconHome)}
					>
						{
							teamAway
							? <>
								<img
									width={30}
									height={30}
									src={iconAway}
								/>
								<div style={{whiteSpace:'nowrap', textOverflow:'ellipsis', overflow:'hidden'}}>{teamAway}</div>
							</>
							: <div style={{height:'30px', display:'flex',alignItems:'center', marginLeft:'5px'}}>Seleccionar</div>

						}
						
					</div>
				</Col>

			</Row>
		</Col>
	)
}

export default CardMatchPlayOff