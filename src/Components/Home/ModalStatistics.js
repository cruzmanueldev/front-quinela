import { Modal, Input, Row, Col, Button } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EditDataFormQuinelaReducer, GetDataStatisticsQuinelaReducer, SendFormQuinelaReducer, ShowModalFormQuinelaReducer, ShowModalStatisticsQuinelaReducer } from '../../Redux/Actions/Home/Home'
import './../../Styles/Components/Home/ModalQuinela.css'
import { ToastContainer } from "react-toastify";

const ModalStatistics = () => {

	const {
        rex_show_modal_statistics_quinela,
		rex_data_statistics_quinela
    } = useSelector(({home}) => home)

	const dispatch = useDispatch()

	const closeModal = () => {
		dispatch(ShowModalStatisticsQuinelaReducer(false))
	}

    return (
        <Modal
			open={rex_show_modal_statistics_quinela}
			footer={null}
			onCancel={closeModal}
			className='Modal-Form-Quinela'
			closeIcon={false}
		>
			<div style={{ display:'flex', justifyContent:'center'}}>Estadisticas Quinela</div>
			{
				rex_data_statistics_quinela?.map((mat, index) => (
					// <div>data</div>
					<Row key={index} gutter={[12,12]} style={{display:'flex', margin:'10px 0'}}>
						<Col span={11} style={{display:'flex', flexDirection:'row-reverse', alignItems:'center', gap:'10px'}}>
							<div style={{width:'35px', display:'flex', justifyContent:'center'}}>{parseInt(mat.percentageHome)}%</div>
							<img 
								src={mat.parlocalsel.selimagen}
								width={30}
								height={30}
							/>
							<div style={{whiteSpace:'nowrap', textOverflow:'ellipsis', overflow:'hidden'}}>{mat.parlocalsel.selabreviacion}</div>
						</Col>
						<Col span={2} style={{display:'flex', alignItems:'center', justifyContent:'center',gap:'10px'}}>
							<div style={{minWidth:'20px', display:'flex', justifyContent:'center', alignItems:'center', fontSize:'11px', backgroundColor:'#67a3ed', padding:'5px', borderRadius:'5px', color:'white'}}>{parseInt(mat.percentageEmpty)}%</div>
						</Col>
						<Col span={11} style={{display:'flex', alignItems:'center', gap:'10px'}}>
							<div style={{width:'35px', display:'flex', justifyContent:'center'}}>{parseInt(mat.percentageAway)}%</div>
							<img 
								height={30}
								width={30}
								src={mat.parvisitasel.selimagen}
							/>
							<div style={{whiteSpace:'nowrap', textOverflow:'ellipsis', overflow:'hidden'}}>{mat.parvisitasel.selabreviacion}</div>
						</Col>
					</Row>
				))
			}
		</Modal>
    )
}

export default ModalStatistics