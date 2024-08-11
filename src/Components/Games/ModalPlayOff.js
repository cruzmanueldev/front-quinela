import { Button, Col, Modal, Row, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import CardMatchPlayOff from './CardMatchPlayOff'
import { useSelector } from 'react-redux'

const ModalPlayOff = ({
	openModalPlayOff, 
	setOpenModalPlayOff,
	dataSource,
	groupB,
	groupC,
	groupD
}) => {

	const {
        rex_data_predictions_matches
    } = useSelector(({matches}) => matches)

	const [ infoMatchA, setInfoMatchA ] = useState({
		teamHome: null,
		teamAway: null,
	})
	const [ infoMatchB, setInfoMatchB ] = useState({})
	const [ infoMatchC, setInfoMatchC ] = useState({})
	const [ infoMatchD, setInfoMatchD ] = useState({})

	const [ infoMatchE, setInfoMatchE ] = useState({
		prevMatchA 	: 'Ganador 1',
		prevMatchB	: 'Ganador 2',
		winMatch	: null,
	})
	const [ infoMatchF, setInfoMatchF ] = useState({
		prevMatchC	: 'Ganador 3',
		prevMatchD	: 'Ganador 4',
		winMatch	: null,
	})
	const [ infoMatchG, setInfoMatchG ] = useState({})
	const [ infoMatchH, setInfoMatchH ] = useState({})

	const { Title } = Typography

	const closeModal = () => {
		console.log("cerrado")
		setOpenModalPlayOff(false)
	}

	return (
		<Modal
			open={openModalPlayOff}
			footer={null}
			onCancel={closeModal}
			// className='Modal-Form-Quinela'
			closeIcon={false}
		>
			<Row>
				<Col span={24} style={{display:'flex', justifyContent:'center', margin:'0 0 2px 0'}}>
					<div style={{ fontSize:'14px', fontWeight:'bold'}}>Cuartos de final</div>
				</Col>
				<CardMatchPlayOff
					teamHome={dataSource[0]['name']}
					iconHome={dataSource[0]['image']}
					teamWin={rex_data_predictions_matches.nameWinA}
					teamAway={groupB[1]['name']}
					iconAway={groupB[1]['image']}
					infoMatch={infoMatchA}
					match="A"
					setInfoMatch={setInfoMatchA}
				/>

				<CardMatchPlayOff
					teamHome={groupB[0]['name']}
					iconHome={groupB[0]['image']}
					teamWin={rex_data_predictions_matches.nameWinB}
					teamAway={dataSource[1]['name']}
					iconAway={dataSource[1]['image']}
					setInfo={setInfoMatchB}
					match="B"
				/>

				<CardMatchPlayOff
					teamHome={groupC[0]['name']}
					iconHome={groupC[0]['image']}
					teamWin={rex_data_predictions_matches.nameWinC}
					teamAway={groupD[1]['name']}
					iconAway={groupD[1]['image']}
					setInfo={setInfoMatchC}
					match="C"
				/>

				<CardMatchPlayOff
					teamHome={groupD[0]['name']}
					iconHome={groupD[0]['image']}
					teamWin={rex_data_predictions_matches.nameWinD}
					teamAway={groupC[1]['name']}
					iconAway={groupC[1]['image']}
					setInfo={setInfoMatchD}
					match="D"
				/>

				<Col span={24} style={{display:'flex', justifyContent:'center', margin:'5px 0 2px 0'}}>
					<div style={{ fontSize:'14px', fontWeight:'bold'}}>Semifinales</div>
				</Col>
				<CardMatchPlayOff
					teamHome={rex_data_predictions_matches.nameWinA}
					iconHome={rex_data_predictions_matches.imageWinA}
					teamAway={rex_data_predictions_matches.nameWinB}
					iconAway={rex_data_predictions_matches.imageWinB}
					teamWin={rex_data_predictions_matches.nameWinE}
					infoMatchLocal={infoMatchA}
					setInfoMatchA={setInfoMatchA}
					infoMatchAway={infoMatchB}
					match="E"
				/>
				<CardMatchPlayOff
					teamHome={rex_data_predictions_matches.nameWinC}
					iconHome={rex_data_predictions_matches.imageWinC}
					teamAway={rex_data_predictions_matches.nameWinD}
					iconAway={rex_data_predictions_matches.imageWinD}
					teamWin={rex_data_predictions_matches.nameWinF}
					match="F"
				/>
				<Col span={24} style={{display:'flex', justifyContent:'center', margin:'5px 0 2px 0'}}>
					<div style={{ fontSize:'14px', fontWeight:'bold'}}>3er Puesto</div>
				</Col>
				<CardMatchPlayOff
					teamHome={rex_data_predictions_matches.nameLoserE}
					iconHome={rex_data_predictions_matches.imageLoserE}
					teamAway={rex_data_predictions_matches.nameLoserF}
					iconAway={rex_data_predictions_matches.imageLoserF}
				/>
				<Col span={24} style={{display:'flex', justifyContent:'center', margin:'5px 0 2px 0'}}>
					<div style={{ fontSize:'14px', fontWeight:'bold'}}>Final</div>
				</Col>
				<CardMatchPlayOff
					teamHome={rex_data_predictions_matches.nameWinE}
					iconHome={rex_data_predictions_matches.imageWinE}
					teamAway={rex_data_predictions_matches.nameWinF}
					iconAway={rex_data_predictions_matches.imageWinF}
				/>
			</Row>
		</Modal>
	)
}

export default ModalPlayOff