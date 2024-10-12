import { Segmented, Modal, Row, Col } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment'
require('moment/locale/es');
moment.locale('es')

const ModalNextMatchesTeam = ({ onChange, showModal, setShowModal, currentPoints,selidTeam }) => {

    const {
        rex_data_next_matches_team,
    } = useSelector(({matches}) => matches)

    const {
        rex_data_user,
    } = useSelector(({top}) => top)

    const calculatePercentage = () => {
        let percentage = (currentPoints*100)/22

        if(percentage > 100){
            percentage = 100
        }

        return percentage.toFixed(0)
    }

    return (
        <Modal
            open={showModal}
            footer={null}
            onCancel={()=> setShowModal(false)}
            className={`Modal-Matches-Calendar ${rex_data_user?.tornombre}`}
            // style={{display:'flex', flexWrap:'wrap', width:'100%'}}
            closeIcon={false}
        >
            <Row gutter={[8,8]}>
                <Col span={24}>
                    <Row 
                        gutter={8} 
                    >
                        <Col span={14}
                        >
                            <div
                                style={{
                                    textAlign:'center',
                                    backgroundColor:'#389e0d',
                                    color:'#FFFFFF',
                                    borderRadius:'5px',
                                    padding:'5px',
                                }}
                            
                            >
                                <div style={{fontWeight:'700'}}><span style={{fontSize:'22px'}}>22</span>ptos</div>
                                <div>Promedio clasificacion</div>                        

                            </div>
                        </Col>
                        <Col span={10}>
                            <div
                                style={{
                                    textAlign:'center',
                                    backgroundColor:'#389e0d',
                                    color:'#FFFFFF',
                                    borderRadius:'5px',
                                    padding:'5px'
                                }}                        
                                
                            >
                                <div style={{
                                    fontSize:'22px',
                                    fontWeight:'600'
                                }}>
                                    {calculatePercentage()}%
                                </div>
                                <div>Porcentaje actual</div>

                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col span={24}>
                    <Row gutter={8}>
                        <Col span={8}>
                            <div 
                                style={{
                                    textAlign:'center',
                                    backgroundColor:'#69b1ff',
                                    color:'#FFFFFF',
                                    borderRadius:'5px',
                                    padding:'5px',
                                }}
                            >
                                <div style={{fontWeight:'700'}}><span style={{fontSize:'22px'}}>{currentPoints}</span>ptos</div>
                                <div>Ptos actuales</div>
                            </div>
                        </Col>
                        <Col span={8}>
                            <div 
                                style={{
                                    textAlign:'center',
                                    backgroundColor:'#69b1ff',
                                    color:'#FFFFFF',
                                    borderRadius:'5px',
                                    padding:'5px',
                                }}
                            >
                                <div style={{fontWeight:'700'}}><span style={{fontSize:'22px'}}>{22 - currentPoints < 0 ? '0' : 22 - currentPoints }</span>ptos</div>
                                <div>Ptos faltantes</div>                                
                            </div>
                        </Col>
                        <Col span={8}>
                            <div
                                style={{
                                    textAlign:'center',
                                    backgroundColor:'#69b1ff',
                                    color:'#FFFFFF',
                                    borderRadius:'5px',
                                    padding:'5px',
                                }}
                            >
                                <div style={{fontWeight:'700'}}><span style={{fontSize:'22px'}}>{ rex_data_next_matches_team.length*3 }</span>ptos</div>
                                <div>Ptos por disputar</div>
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Row style={{width:'100%', textAlign:'center', fontWeight:'bold'}}>
                    <Col span={24}>
                        <div>Juegos/puntos pendientes</div>
                    </Col>
                </Row>
                <Col span={24} style={{marginBottom:'20px'}}>
                    <Row gutter={8}>
                        <Col span={12}
                        >
                            <Row
                                style={{
                                    backgroundColor:'#bae0ff',
                                    borderRadius:'5px',
                                    color:'#000000',
                                    padding:'5px',
                                    boxShadow:'0px 1px 8px -3px rgba(0,0,0,0.75)'
                                }}
                            >
                                <Col span={12}
                                    style={{ display:'flex', alignItems:'center',justifyContent:'center'}}
                                >
                                    <div
                                        style={{fontWeight:'700'}}
                                    >Local</div>
                                </Col>
                                <Col span={12}>
                                    <div style={{fontWeight:'600'}}>
                                        <div>
                                            { rex_data_next_matches_team.filter(dat => dat.parlocalsel.selid == selidTeam).length} Juegos
                                        </div>
                                        <div>
                                            {rex_data_next_matches_team.filter(dat => dat.parlocalsel.selid == selidTeam).length *3} ptos
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={12}>
                            <Row
                                style={{
                                    backgroundColor:'#949494',
                                    borderRadius:'5px',
                                    color:'#FFFFFF',
                                    padding:'5px',
                                    boxShadow:'0px 1px 8px -3px rgba(0,0,0,0.75)'
                                }}
                            >
                                <Col span={12}
                                    style={{ display:'flex', alignItems:'center',justifyContent:'center'}}
                                >
                                    <div
                                        style={{fontWeight:'700'}}
                                    >Visitante</div>
                                </Col>
                                <Col span={12}>
                                    <div style={{fontWeight:'600'}}>
                                        <div>
                                            { rex_data_next_matches_team.filter(dat => dat.parvisitasel.selid == selidTeam).length} Juegos
                                        </div>
                                        <div>
                                            {rex_data_next_matches_team.filter(dat => dat.parvisitasel.selid == selidTeam).length *3} ptos
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Col>

                    </Row>
                </Col>
            </Row>
            {
                rex_data_next_matches_team.map(dat => (
                    <Row 
                        className='ContainerMatchHistorical'
                        style={{backgroundColor: dat.parlocalsel.selid == selidTeam ? '#bae0ff': '#FFFFFF'}}
                    >
                        <Col span={6} style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                            <div style={{display:'flex', justifyContent:'center', gap:'3px'}}>
                                {dat.parfecid.fecnombre}
                            </div>
                        </Col>
                        <Col span={4}
                            style={{
                                display:'flex',
                                alignItems:'center',
                                justifyContent:'center'
                            }}
                        >
                            <div style={{display:'flex', justifyContent:'center', gap:'3px'}}>
                                <img 
                                    height='30'
                                    width='auto'
                                    src={dat.parlocalsel.selimagen}
                                />
                            </div>
                        </Col>
                        <Col span={2}
                            style={{
                                display:'flex',
                                alignItems:'center',
                                justifyContent:'center'
                            }}                        
                        >
                            <div style={{display:'flex', justifyContent:'center', gap:'3px'}}>
                                vs
                            </div>
                        </Col>
                        <Col span={4}
                            style={{
                                display:'flex',
                                alignItems:'center',
                                justifyContent:'center'
                            }}                        
                        >
                            <div style={{display:'flex', justifyContent:'center', gap:'3px'}}>
                                <img 
                                    height='30'
                                    width='auto'                                
                                    src={dat.parvisitasel.selimagen}
                                />
                            </div>
                        </Col>
                        <Col span={8} style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                            <div style={{display:'flex', justifyContent:'center', gap:'3px'}}>
                                {moment(dat.parfecid.parfecha).locale('es').format('MMMM YYYY')}
                            </div>
                        </Col>
                    </Row>
                ))
            }
        </Modal>
    )
}

export default ModalNextMatchesTeam