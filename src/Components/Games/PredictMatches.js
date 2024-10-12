import React, { useEffect, useState } from "react";

import { DndContext, KeyboardSensor, PointerSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Table, Row, Col, FloatButton, Button, Input, Pagination  } from 'antd';
import {
	PartitionOutlined
} from '@ant-design/icons';
import ModalPlayOff from "./ModalPlayOff";
import './../../Styles/Components/Games/PredictMatches.css'
import { useDispatch, useSelector } from "react-redux";
import { GetDataAllMatchesReducer, GetPositionsTournamentReducer } from "../../Redux/Actions/Tournaments/Tournaments";
import { CalculateDataPredictionReducer, CleanDataJourneyPredictionReducer, GetDataNextMatchesTeamReducer, GetDataPredictionReducer, UpdateDataPredictionReducer } from "../../Redux/Actions/Matches/Matches";
import { CURRENT_DATE_MATCH } from "../../Constants/Matches/Matches";
import ModalNextMatchesTeam from "../Matches/ModalNextMatchesTeam";

const columns = [
	{
		title: 'Grupo A',
		dataIndex: 'name',
		align: 'center',
		render : (_, record, index) => {
			return <div style={{display:'flex', alignItems:'center', gap:'5px', touchAction:'none'}}>
				<img
					width={25}
					height={25}
					src={record.image}
				/>
				<div style={{whiteSpace:'nowrap', textOverflow:'ellipsis', overflow:'hidden'}}>{record.name}</div>
			</div>
		},
	},
];

const columnsB = [
	{
		title: 'Grupo B',
		dataIndex: 'name',
		align: 'center',
		render : (_, record, index) => {
			return <div style={{display:'flex', alignItems:'center', gap:'5px', touchAction:'none'}}>
				<img
					width={25}
					height={25}
					src={record.image}
				/>
				<div style={{whiteSpace:'nowrap', textOverflow:'ellipsis', overflow:'hidden'}}>{record.name}</div>
			</div>
		},
	},
];

const columnsC = [
	{
		title: 'Grupo C',
		dataIndex: 'name',
		align: 'center',
		render : (_, record, index) => {
			return <div style={{display:'flex', alignItems:'center', gap:'5px', touchAction:'none'}}>
				<img
					width={25}
					height={25}
					src={record.image}
				/>
				<div style={{whiteSpace:'nowrap', textOverflow:'ellipsis', overflow:'hidden'}}>{record.name}</div>
			</div>
		},
	},
];

const columnsD = [
	{
		title: 'Grupo D',
		dataIndex: 'name',
		align: 'center',
		render : (_, record, index) => {
			return <div style={{display:'flex', alignItems:'center', gap:'5px', touchAction:'none'}}>
				<img
					width={25}
					height={25}
					src={record.image}
				/>
				<div style={{whiteSpace:'nowrap', textOverflow:'ellipsis', overflow:'hidden'}}>{record.name}</div>
			</div>
		},
	},
];

const RowSort = (props) => {
	const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
	  id: props['data-row-key'],
	});
	const style = {
	  ...props.style,
	  transform: CSS.Translate.toString(transform),
	  transition,
	  cursor: 'move',
	  ...(isDragging
		? {
			position: 'relative',
			zIndex: 9999,
		  }
		: {}),
	};
	return <tr {...props} ref={setNodeRef} style={style} {...attributes} {...listeners} />;
};

const PredictMatches = () => {

	const {
        rex_data_user
    } = useSelector(({top}) => top)

	const {
        rex_data_positions_prediction_tournament,
    } = useSelector(({tournaments}) => tournaments)

	const {
        rex_data_all_predictions_matches,
		rex_current_date_match,
		rex_data_selections_matches
    } = useSelector(({matches}) => matches)

	const dispatch = useDispatch()

	const [ openModalPlayOff, setOpenModalPlayOff ] = useState(false)
	const [ showModalNextMacthes, setShowModalNextMatches ] = useState(false)
	const [ pointsTeamSelected, setPointsTeamSelected ] = useState(null)
	const [ selidTeamSelected, setSelidTeamSelected ] = useState(null)

	const [dataSource, setDataSource] = useState([
		{
			key: '1',
			name: 'Argentina',
			image : 'https://res.cloudinary.com/josecruz9/image/upload/v1712374858/qsaornariwc7xab8qqxx.png'
		},
		{
			key: '2',
			name: 'Chile',
			image : 'https://res.cloudinary.com/josecruz9/image/upload/v1712374869/eykmrl70wfz0s6f0nlx9.png'
		},
		{
			key: '3',
			name: 'Canada',
			image : 'https://res.cloudinary.com/josecruz9/image/upload/v1712374839/ryocf37skylam3j4g2lm.png'
		},
		{
			key: '4',
			name: 'Peru',
			image : 'https://res.cloudinary.com/josecruz9/image/upload/v1712374889/ldx8c6la3qrp4kxhzwu5.png'
		},
	]);

	const [groupB, setGroupB] = useState([
		{
			key: '5',
			name: 'Ecuador',
			image : 'https://res.cloudinary.com/josecruz9/image/upload/v1712374876/i6aw6c8x87byajfrpxfj.png'
		},
		{
			key: '6',
			name: 'Venezuela',
			image : 'https://res.cloudinary.com/josecruz9/image/upload/v1712374907/tm3gidyzcpx3k2zlskev.png'
		},
		{
			key: '7',
			name: 'Mexico',
			image : 'https://res.cloudinary.com/josecruz9/image/upload/v1712374811/vzwnphcvjtqcj7rqyihg.png'
		},
		{
			key: '8',
			name: 'Jamaica',
			image : 'https://res.cloudinary.com/josecruz9/image/upload/v1712374808/pejgfdfvca9w9wibahbw.png'
		},
	]);

	const [groupC, setGroupC] = useState([
		{
			key: '9',
			name: 'Uruguay',
			image : 'https://res.cloudinary.com/josecruz9/image/upload/v1712374900/funwenwrcbvb5h0u6gsa.png'
		},
		{
			key: '10',
			name: 'Estados Unidos',
			image : 'https://res.cloudinary.com/josecruz9/image/upload/v1712374818/owxsvjwgp2cq3ydkmcax.png'
		},
		{
			key: '11',
			name: 'Panama',
			image : 'https://res.cloudinary.com/josecruz9/image/upload/v1712374803/bbdo92furlcxoybytrip.png'
		},
		{
			key: '12',
			name: 'Bolivia',
			image : 'https://res.cloudinary.com/josecruz9/image/upload/v1712374850/p4opvoqvkt95n2yajate.png'
		},
	]);

	const [groupD, setGroupD] = useState([
		{
			key: '13',
			name: 'Colombia',
			image : 'https://res.cloudinary.com/josecruz9/image/upload/v1712374864/cdogxisc653mtr2mlsdm.png'
		},
		{
			key: '14',
			name: 'Paraguay',
			image : 'https://res.cloudinary.com/josecruz9/image/upload/v1712374892/i8ss6hplsmbu24siofam.png'
		},
		{
			key: '15',
			name: 'Brasil',
			image : 'https://res.cloudinary.com/josecruz9/image/upload/v1712374844/t4f1qiivjra2w7p2edcy.png'
		},
		{
			key: '16',
			name: 'Costa Rica',
			image : 'https://res.cloudinary.com/josecruz9/image/upload/v1712374827/syji93bolfvpctmo25zv.png'
		},
	]);

	const sensors = useSensors(
		useSensor(PointerSensor, {
		  	activationConstraint: {
				distance: 1,
			},
		}),
		useSensor(TouchSensor, {
			activationConstraint: {
			  delay: 300,
			  tolerance: 8,
			},
		}),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		}),
	);
	const onDragEnd = ({ active, over }) => {
		if (active.id !== over?.id) {
		  setDataSource((prev) => {
			const activeIndex = prev.findIndex((i) => i.key === active.id);
			const overIndex = prev.findIndex((i) => i.key === over?.id);
			return arrayMove(prev, activeIndex, overIndex);
		  });
		}
	};

	const onDragEndB = ({ active, over }) => {
		if (active.id !== over?.id) {
			setGroupB((prev) => {
			const activeIndex = prev.findIndex((i) => i.key === active.id);
			const overIndex = prev.findIndex((i) => i.key === over?.id);
			return arrayMove(prev, activeIndex, overIndex);
		  });
		}
	};

	const onDragEndC = ({ active, over }) => {
		if (active.id !== over?.id) {
			setGroupC((prev) => {
			const activeIndex = prev.findIndex((i) => i.key === active.id);
			const overIndex = prev.findIndex((i) => i.key === over?.id);
			return arrayMove(prev, activeIndex, overIndex);
		  });
		}
	};

	const onDragEndD = ({ active, over }) => {
		if (active.id !== over?.id) {
			setGroupD((prev) => {
			const activeIndex = prev.findIndex((i) => i.key === active.id);
			const overIndex = prev.findIndex((i) => i.key === over?.id);
			return arrayMove(prev, activeIndex, overIndex);
		  });
		}
	};

	const columnsTable = [
        {
            title: '',
            dataIndex: 'pos',
            key: 'pos',
            align: 'center',
            render : (_, record, index) => {
                return <div style={{display:'flex', justifyContent:'center'}}>
					<div className={`Cell-Position ${index + 1 <= 6 ? 'Direct-Classification': index + 1 == 7 ? 'Playoff-Classification' :''}`}>
						{index+1}
					</div>
                </div>
            },
            fixed : 'left',
            width:'30px'
        },
        {
            title: '',
            dataIndex: 'selnombre',
            key: 'selnombre',
            align: 'center',
            render : (_, record, index) => {
                return <div style={{display:'flex', alignItems:'center', gap:'5px'}}>
                    <img
                        width={25}
                        height={25}
                        src={record.selimagen}
                    />
                    <div>{record.selabreviacion}</div>
                </div>
            },
            fixed : 'left',
            width:'70px'
        },
        {
            title: 'PJ',
            dataIndex: 'pj',
            key: 'pj',
            align: 'center',
            width:'40px'
        },
        {
            title: 'G',
            dataIndex: 'pg',
            key: 'pg',
            align: 'center',
            width:'40px'
        },
        {
            title: 'E',
            dataIndex: 'pe',
            key: 'pe',
            align: 'center',
            width:'40px'
        },
        {
            title: 'P',
            dataIndex: 'pp',
            key: 'pp',
            align: 'center',
            width:'40px'
        },
        {
            title: 'DG',
            dataIndex: 'dg',
            key: 'dg',
            align: 'center',
            width:'40px',
			render : (_, record, index) => {

				let dg = record.gf - record.gc

                return <div style={{display:'flex', alignItems:'center', justifyContent:'center', gap:'5px'}}>
                    <div style={{textAlign:'center'}}>{dg}</div>
                </div>
            },
        },
        {
            title: 'Ptos',
            dataIndex: 'ptos',
            key: 'ptos',
            align: 'center',
            width:'40px'
        },
    ]


	const getDataTable = () => {
		if(rex_data_user.tornombre == 'EM'){
			dispatch(GetDataAllMatchesReducer())
			dispatch(GetDataPredictionReducer())
		}
		dispatch(GetPositionsTournamentReducer(true))
	}

	useEffect(()=> {
		getDataTable()
	},[rex_data_user])

	return (
			rex_data_user.tornombre == "EM"
			?	<Row
					style={{
						display:'flex',
						justifyContent:'center',
						padding: '30px 0'
					}}
				>
					<Col style={{margin:'0 30px'}}>
						<Pagination 
							pageSize={5}
							align="center" 
							current={rex_current_date_match}
							onChange={(page, pageSize) => {
								dispatch({
									type : CURRENT_DATE_MATCH,
									payload : page
								})
							}}
							showSizeChanger={false}
							total={rex_data_all_predictions_matches.length}
						/>
						<div style={{
							margin:'10px 0'
						}}>
							{
								rex_data_all_predictions_matches.filter(all => all.fecid === rex_current_date_match).map((mat, index) => (
									<Row 
										key={index}
										gutter={12}
										style={{
											margin:'5px 0'
										}}
									>
										<Col span={12}>
											<Row>
												<Col span={18}
													style={{
														display:'flex',
														alignItems:'center',
														justifyContent:'end',
													}}
												>
													<div style={{display:'flex', justifyContent:'end', gap:'5px', alignItems:'center'}}>
														<div>{mat.parlocalsel.selnombre}</div>
														<div
															style={{
																display:'flex',
																alignItems:'center'
															}}
														>
															<img 
																src={mat.parlocalsel.selimagen}
																style={{
																	height:'25px',
																	width:'auto'
																}}
															/>
														</div>
													</div>
												</Col>
												<Col span={6}>
													<div>
														<Input 
															onChange={(value) => {
																dispatch(UpdateDataPredictionReducer(
																	mat.partid, 
																	value.target.value,
																	mat.pargolesvisita
																))
															}}
															disabled={!mat.paractivo}
															value={mat.pargoleslocal}
															style={{
																textAlign:'center',
																color:'#000000'
															}}
														/>
													</div>
												</Col>
											</Row>
										</Col>
										<Col span={12}>
											<Row>
												<Col span={6}>
													<div>
														<Input
															style={{
																textAlign:'center',
																color:'#000000'
															}}
															onChange={(value) => {
																dispatch(UpdateDataPredictionReducer(
																	mat.partid, 
																	mat.pargoleslocal,
																	value.target.value,
																))
															}}
															disabled={!mat.paractivo}
															value={mat.pargolesvisita}
														/>
													</div>
												</Col>
												<Col span={18}
													style={{
														display:'flex',
														alignItems:'center',
														justifyContent:'initial',
													}}
												>
													<div style={{display:'flex', justifyContent:'end', gap:'5px', alignItems:'center'}}>
														<div
															style={{
																display:'flex',
																alignItems:'center'
															}}
														>
															<img 
																src={mat.parvisitasel.selimagen}
																style={{
																	height:'25px',
																	width:'auto'
																}}
															/>
														</div>
														<div>{mat.parvisitasel.selnombre}</div>
													</div>
												</Col>
											</Row>
										</Col>
									</Row>
								))
							}

						</div>
						<Col
							style={{
								display:'flex',
								justifyContent:'center',
								gap:'10px',
								marginBottom:'10px'
							}}
						>
							<Button 
								onClick={()=> {
									dispatch(CleanDataJourneyPredictionReducer(rex_current_date_match))
								}}
								size="small" 
								type="primary" 
								danger
							>Limpiar</Button>
							<Button 
								size="small" 
								type="primary"
								onClick={() => {
									dispatch(CalculateDataPredictionReducer())
								}}
							>Calcular</Button>
						</Col>
					</Col>
					<Col>
						<Table
							className={`Table-Positions Table-EM`}
							columns={columnsTable}
							onRow={(record, rowIndex) => {
								return {
									onClick: () => {
										setShowModalNextMatches(true)
										setPointsTeamSelected(record.ptos)
										dispatch(GetDataNextMatchesTeamReducer(record.selid))
										setSelidTeamSelected(record.selid)
									},
								};
							}}
							dataSource={rex_data_selections_matches}
							pagination={{
								position:['none','none']
							}}            
						/>
					</Col>
					<ModalNextMatchesTeam
						currentPoints={pointsTeamSelected}
						showModal={showModalNextMacthes}
						selidTeam={selidTeamSelected}
						setShowModal={setShowModalNextMatches}
					/>
				</Row>
			:	<Row style={{display:'flex', justifyContent:'center', padding:'5px', alignItems:'center'}}>
					<Col span={24} style={{margin:'10px 0', padding:'0 15px'}}>
						<div><PartitionOutlined /> Cambia la posicion de los equipos para generar los cruces de 4tos de final</div>
					</Col>
					<Col span={12} style={{padding:'5px'}}>
						<DndContext sensors={sensors} modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
						<SortableContext
							// rowKey array
							items={dataSource.map((i) => i.key)}
							strategy={verticalListSortingStrategy}
						>
							<Table
								className="Table-Prediction-Matches"
								components={{
									body: {
									row: RowSort,
									},
								}}
								rowKey="key"
								columns={columns}
								dataSource={dataSource}
								pagination={{
									position:['none','none']
								}}
							/>
						</SortableContext>
						</DndContext>
					</Col>
					<Col span={12} style={{padding:'5px'}}>
						<DndContext sensors={sensors} modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEndB}>
						<SortableContext
							// rowKey array
							items={groupB.map((i) => i.key)}
							strategy={verticalListSortingStrategy}
						>
							<Table
								className="Table-Prediction-Matches"
								components={{
									body: {
									row: RowSort,
									},
								}}
								rowKey="key"
								columns={columnsB}
								dataSource={groupB}
								pagination={{
									position:['none','none']
								}}
							/>
						</SortableContext>
						</DndContext>
					</Col>

					<Col span={12} style={{padding:'5px'}}>
						<DndContext sensors={sensors} modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEndC}>
						<SortableContext
							// rowKey array
							items={groupC.map((i) => i.key)}
							strategy={verticalListSortingStrategy}
						>
							<Table
								className="Table-Prediction-Matches"
								components={{
									body: {
									row: RowSort,
									},
								}}
								rowKey="key"
								columns={columnsC}
								dataSource={groupC}
								pagination={{
									position:['none','none']
								}}
							/>
						</SortableContext>
						</DndContext>
					</Col>

					<Col span={12} style={{padding:'5px'}}>
						<DndContext sensors={sensors} modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEndD}>
						<SortableContext
							// rowKey array
							items={groupD.map((i) => i.key)}
							strategy={verticalListSortingStrategy}
						>
							<Table
								className="Table-Prediction-Matches"
								components={{
									body: {
									row: RowSort,
									},
								}}
								rowKey="key"
								columns={columnsD}
								dataSource={groupD}
								pagination={{
									position:['none','none']
								}}
							/>
						</SortableContext>
						</DndContext>
					</Col>
					<FloatButton
						onClick={() => setOpenModalPlayOff(true)}
						tooltip={<div>Ver cruces</div>} 
						type="primary"
						icon={<PartitionOutlined />}
					/>
					<ModalPlayOff
						openModalPlayOff={openModalPlayOff}
						setOpenModalPlayOff={setOpenModalPlayOff}
						dataSource={dataSource}
						groupB={groupB}
						groupC={groupC}
						groupD={groupD}
					/>
				</Row>		
	);
};

export default PredictMatches;
