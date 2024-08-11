import React from 'react'
import { Col, Modal, Row } from 'antd'
import './../../Styles/Components/Users/ModalHistoricalQuinela.css'
import { useSelector } from 'react-redux'

const ModalHistoricalQuinela = ({
    showModalHistorical,
    setShowModalHistorial
}) => {

    const {
        rex_data_historical_quinela_users
    } = useSelector(({users}) => users)

    return (
        <Modal
            open={showModalHistorical}
            onCancel={() => { setShowModalHistorial(false)}}
            closeIcon={null}
            footer={null}
        >
            <Row>
                <Col span={8} style={{display:'flex', justifyContent:'center', fontWeight:'bold'}}><div>Partido</div></Col>
                <Col span={8} style={{display:'flex', justifyContent:'center', fontWeight:'bold'}}><div>Resultado</div></Col>
                <Col span={8} style={{display:'flex', justifyContent:'center', fontWeight:'bold'}}><div>Predicción</div></Col>
            </Row>
            {
                rex_data_historical_quinela_users.length > 0
                ? rex_data_historical_quinela_users.map(dat => (
                    <Row className='ContainerMatchHistorical'>
                        <Col span={8}>
                            <div style={{display:'flex', justifyContent:'center', gap:'3px'}}>
                                <img 
                                    height='30'
                                    width='auto'
                                    src={dat.pruparpartidos.parlocalsel.selimagen}
                                />
                                <div>vs</div>
                                <img 
                                    height='30'
                                    width='auto'                                
                                    src={dat.pruparpartidos.parvisitasel.selimagen}
                                />
                            </div>
                        </Col>
                        <Col span={8} style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                            <div style={{display:'flex', justifyContent:'center', gap:'3px', alignItems:'center', backgroundColor:'#0266E2', borderRadius:'5px', padding:'1px 4px', color:'#FFFFFF'}}>
                                <div>{dat.pruparpartidos.pargoleslocal}</div>
                                <div>{'-'}</div>
                                <div>{dat.pruparpartidos.pargolesvisita}</div>
                            </div>
                        </Col>

                        <Col span={8} style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                            <div style={{display:'flex', justifyContent:`center`, gap:`3px`, alignItems:`center`, backgroundColor:`${dat.parganador == dat.pruganador ? '#237804' : '#ff4d4f'}`, borderRadius:`5px`, padding:`1px 4px`, color:`#FFFFFF`}}>
                                <div style={{alignItems:'center', textAlign:'center'}}>{dat.prugoleslocal}</div>
                                <div>{'-'}</div>
                                <div>{dat.prugolesvisita}</div>
                            </div>
                        </Col>
                    </Row>
                ))
                : null
            }
        </Modal>
    )
}

export default ModalHistoricalQuinela