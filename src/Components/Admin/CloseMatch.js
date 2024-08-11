import { Button, Col, Input, Row, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetDataNextMatchesReducer } from "../../Redux/Actions/Home/Home";
import moment from "moment";
import {
    LoadingOutlined,
	CheckOutlined
} from '@ant-design/icons';
import { CloseMatchReducer, DisableMatchReducer, EditCloseMatchReducer } from "../../Redux/Actions/Matches/Matches";

const CloseMatch = () => {

	const { Title } = Typography
	const dispatch = useDispatch()

	const [ loadingData, setLoadingData ] = useState(false)
	const [ matchClose, setMatchClose ] = useState({
		partid : null,
		selhome : null,
		selaway : null
	})

	const {
        rex_data_next_matches,
    } = useSelector(({home}) => home)

	const getNextMatches = async () => {
        setLoadingData(true)
        const response = await dispatch(GetDataNextMatchesReducer())
        setLoadingData(false)
    }

    useEffect(() => {
        getNextMatches()
    },[])

	return (
		<Row style={{display:'flex', justifyContent:'center', padding:'5px'}}>
			<Col span={24} style={{display:'flex', justifyContent:'center', flexDirection:'column'}}>
				<Row>
					<Col span={24} style={{display:'flex', justifyContent:'center'}}>
						<Title level={4}>Jornada Actual</Title>
					</Col>
				</Row>
				<div style={{display:'flex', flexDirection:'column', justifyContent:'center', width:'100%'}}>
				{
					rex_data_next_matches.map(par => (
						<Row>
							<Col xs={6} sm={6} md={4} style={{display:'flex', alignItems:'center', justifyContent:'center', textAlign:'center', borderRight:'1px solid #ececec'}}>
								<div>
									{moment(par.parfecha).format('DD/MM/YY')}
								</div>
							</Col>
							<Col xs={18} sm={18} md={20}>
								<Row>
									<Col xs={16} sm={16} md={16}>
										<div style={{width:'100%', padding:'0 20px'}}>
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
									<Col xs={6} sm={6} md={6} style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
										<div style={{display:'flex', gap:'5px', flexDirection:'column', justifyContent:"center"}}>
											{
												par.parfinalizado
												? <div>
													<div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
													{par.pargoleslocal}
													</div>
													<div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
														{par.pargolesvisita}
													</div>
												  </div>
												: par.parbloqueado
													? <div style={{display:'flex', flexDirection:'row', alignItems:'center', gap:'10px'}}>
														<div style={{display:'flex',flexDirection:'column', gap:'5px'}}>
															<Input 
																onChange={(e) => {
																	dispatch(EditCloseMatchReducer('req_pargoalhome', par, e.target.value))
																}}
																size="small" style={{width:'40px'}}
															/>
															<Input 
																onChange={(e) => {
																	dispatch(EditCloseMatchReducer('req_pargoalaway', par, e.target.value))
																}}															
																size="small" style={{width:'40px'}}
															/>
														</div>
														<div>
															<Button 
																onClick={() => dispatch(CloseMatchReducer(par.partid))}
																style={{backgroundColor:'#0266E2', color:'#FFFFFF'}} size="small"
															><CheckOutlined /></Button>
														</div>

													</div>
													:	<Button
															onClick={() => dispatch(DisableMatchReducer(par.partid))}
															size="small" style={{backgroundColor:'#0266E2', color:'#FFFFFF'}}
														>Bloquear</Button>
											}
											
										</div>
									</Col>
								</Row>
							</Col>
						</Row>
					))
				}
				</div>
			</Col>
		</Row>
	);
};

export default CloseMatch;
