import { Col, Pagination, Row, Skeleton, Segmented, FloatButton, Divider } from 'antd'
import React, { useEffect, useState } from 'react'
import './../Styles/Routes/Matches.css'
import { useDispatch, useSelector } from 'react-redux';
import { GetDataMatchesReducer, ShowDateMatchReducer } from '../Redux/Actions/Matches/Matches';
import moment from 'moment';
import { 
	CalendarOutlined,
	CloseOutlined,
	LeftOutlined,
	RightOutlined
} from '@ant-design/icons';
import ModalMatches from '../Components/Matches/ModalMatches';


const Matches = () => {

	const {
        rex_data_matches,
		rex_date_matches_em
    } = useSelector(({matches}) => matches)

	const [ showModal, setShowModal] = useState(false)
	const [ showGroup, setShowGroup ] = useState("Grupo A")

    const {
        rex_data_user,
    } = useSelector(({top}) => top)

	const dispatch = useDispatch()
	const onChange = (value) => {
		dispatch(ShowDateMatchReducer(value))
		setShowModal(false)
	};

	const getMatches = async () => {
		dispatch(ShowDateMatchReducer('Jornada 1'))
		await dispatch(GetDataMatchesReducer())
	}

	useEffect(() => {
		setShowGroup("Grupo A")
		getMatches()
	}, [])

	return (
		<div className='Matches-Container'>
			{
				rex_data_user.tornombre == 'CA'
				? 	<Row style={{display:'flex', alignItems:'center', justifyContent:'center', margin:'5px 0'}}>
						<Col>
							<Segmented
								options={['Grupo A', 'Grupo B', 'Grupo C', 'Grupo D']}
								onChange={(value)=>{setShowGroup(value)}}
							/>
						</Col>
					</Row>
				: null
			}
			

			<Row style={{display:'flex', justifyContent:'center', padding:'0 10px'}}>
				<Col span={24}>
						<div className={`Title-Fixture Fixture-${rex_data_user.tornombre}`}>
							{/* <LeftOutlined /> */}
							<span>{rex_date_matches_em}</span>
							{/* <RightOutlined /> */}
						</div>
						{
							rex_data_matches.length > 0
							? rex_data_matches.filter(mfe => 
									mfe.fecnombre == rex_date_matches_em
								).map((mat) => {
								return (
									<div>
										{mat.data
											.filter(dam => rex_data_user.tornombre == "CA" ? dam.pargrupos?.grunombre == showGroup : true )
											.map((par, index) => {
											return (
												<>
													<Row style={{marginTop: index == 0 ? '20px': ''}}>
														<Col xs={6} sm={6} md={4} style={{display:'flex', alignItems:'center', justifyContent:'center', textAlign:'center', borderRight:'1px solid #ececec'}}>
															<div>
																{moment(par.parfecha).format('DD/MM/YY')}
															</div>
														</Col>
														<Col xs={18} sm={18} md={20}>
															<Row>
																<Col xs={20} sm={20} md={20}>
																	<div style={{width:'100%', padding:'0 20px', display:'flex',flexDirection:'column',gap:'5px'}}>
																		<div style={{display:'flex', alignItems:'center'}}>
																			<img
																				width={30}
																				height={30}
																				src={par.parlocalsel.selimagen}
																			/>
																			<div>{par.parlocalsel.selnombre}</div>
																		</div>
																		<div style={{display:'flex', alignItems:'center'}}>
																			<img
																				width={30}
																				height={30}
																				src={par.parvisitasel.selimagen}
																			/>
																			<div>{par.parvisitasel.selnombre}</div>
																		</div>
																	</div>
																</Col>
																<Col xs={4} sm={4} md={4} style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
																	<div>
																		<div>{par.pargoleslocal != null ? par.pargoleslocal : '-'}</div>
																		<div>{par.pargolesvisita != null ? par.pargolesvisita : '-'}</div>
																	</div>
																</Col>
															</Row>
														</Col>
													</Row>
													<Divider style={{margin:'15px 0'}}/>
												</>
												
											)
										})}
									</div>
								)
							})
							: <Row style={{display:'flex', alignItems:'center', margin:'10px 0', justifyContent:'center'}}>
								<Col span={4}>
									<Skeleton />
									<Skeleton />
								</Col>
							</Row>
						}
				</Col>
			</Row>
			<FloatButton.Group
				trigger="click"
				className={`Button-Match Button-${rex_data_user.tornombre}`}
				shape="square"
				style={{
					right: 24,
				}}
				icon={<CalendarOutlined style={{color : '#FFFFFF'}}/>}
				onClick={()=> setShowModal(true)}
				closeIcon={ <CloseOutlined style={{color : '#FFFFFF'}}/>}
				>
			</FloatButton.Group>
			<ModalMatches
				onChange={onChange}
				showModal={showModal}
				setShowModal={setShowModal}
			/>
		</div>
	)
}

export default Matches