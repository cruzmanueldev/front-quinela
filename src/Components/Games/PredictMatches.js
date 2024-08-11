import React, { useState } from "react";

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
import { Table, Row, Col, FloatButton, Button } from 'antd';
import {
	PartitionOutlined
} from '@ant-design/icons';
import ModalPlayOff from "./ModalPlayOff";
import './../../Styles/Components/Games/PredictMatches.css'

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

	const [ openModalPlayOff, setOpenModalPlayOff ] = useState(false)

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
		console.log(over)
	};

	const onDragEndB = ({ active, over }) => {
		if (active.id !== over?.id) {
			setGroupB((prev) => {
			const activeIndex = prev.findIndex((i) => i.key === active.id);
			const overIndex = prev.findIndex((i) => i.key === over?.id);
			return arrayMove(prev, activeIndex, overIndex);
		  });
		}
		console.log(over)
	};

	const onDragEndC = ({ active, over }) => {
		if (active.id !== over?.id) {
			setGroupC((prev) => {
			const activeIndex = prev.findIndex((i) => i.key === active.id);
			const overIndex = prev.findIndex((i) => i.key === over?.id);
			return arrayMove(prev, activeIndex, overIndex);
		  });
		}
		console.log(over)
	};

	const onDragEndD = ({ active, over }) => {
		if (active.id !== over?.id) {
			setGroupD((prev) => {
			const activeIndex = prev.findIndex((i) => i.key === active.id);
			const overIndex = prev.findIndex((i) => i.key === over?.id);
			return arrayMove(prev, activeIndex, overIndex);
		  });
		}
		console.log(over)
		console.log(active)
	};

	return (
		<Row style={{display:'flex', justifyContent:'center', padding:'5px', alignItems:'center'}}>
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
