import { Col, Row, Table, Segmented, Popover } from 'antd'
import React, { useEffect } from 'react'
import './../Styles/Routes/Positions.css'
import {
    PlusOutlined
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { GetPositionsTournamentReducer } from '../Redux/Actions/Tournaments/Tournaments';
import ImageLoading from '../Assets/images/loadingBall.gif'

const Positions = () => {

    const {
        rex_data_user,
    } = useSelector(({top}) => top)

    const {
        rex_data_positions_tournament,
    } = useSelector(({tournaments}) => tournaments)

    const dispatch = useDispatch()

    const columns = [
        {
            title: '',
            dataIndex: 'pos',
            key: 'pos',
            align: 'center',
            render : (_, record, index) => {
                return <div style={{display:'flex', justifyContent:'center'}}>
                    {
                        rex_data_user.tornombre == 'CA'
                        ? <div className={`Cell-Position ${index + 1 <= 2 ? 'Direct-Classification': ''}`}>
                            {index+1}
                        </div>
                        : <div className={`Cell-Position ${index + 1 <= 6 ? 'Direct-Classification': index + 1 == 7 ? 'Playoff-Classification' :''}`}>
                            {index+1}
                        </div>
                    }

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
            title: 'P',
            dataIndex: 'pe',
            key: 'pe',
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
            title: 'DG',
            dataIndex: 'dg',
            key: 'dg',
            align: 'center',
            width:'40px'
        },
        {
            title: 'Ptos',
            dataIndex: 'ptos',
            key: 'ptos',
            align: 'center',
            width:'40px'
        },
        // {
        //     title: 'Forma',
        //     dataIndex: 'forma',
        //     key: 'forma',
        //     align: 'center',
        //     render : (_, record, index) => {
        //         return <div className='Container-Last-Games'>
        //             {
        //                 record.nextMatch
        //                 ?   <Popover
        //                         content={
        //                             <div style={{display:'flex', gap:'10px', borderRadius:'10px'}}>
        //                                 <div style={{display:'flex', alignItems:'center', gap:'5px'}}>
        //                                     <img 
        //                                         height={15}
        //                                         width={15}
        //                                         src={record.nextMatch.parlocalsel.selimagen}
        //                                     />
        //                                     <span>{record.nextMatch.parlocalsel.selabreviacion}</span>
                                            
        //                                 </div>
        //                                 <div><span> - </span></div>
        //                                 <div style={{display:'flex', alignItems:'center', gap:'5px'}}>
        //                                     <img 
        //                                         height={15}
        //                                         width={15}
        //                                         src={record.nextMatch.parvisitasel.selimagen}
        //                                     />
        //                                     <span>{record.nextMatch.parvisitasel.selabreviacion}</span>
        //                                 </div>
        //                             </div>
        //                         }
        //                         title={null} 
        //                         placement="leftBottom"
        //                         trigger="click"
        //                         className='Icon-See-More'
        //                     >
        //                     <PlusOutlined style={{fontSize:'12px', color:'#FFFFFF'}} />
        //                 </Popover>
        //                 : null
        //             }
        //             {
        //                 record.lastMatches.map(las => {
        //                     const resultMatch = las.parganador == record.selid 
        //                     ? 'Game-Won'
        //                     : las.parganador == null
        //                         ? 'Game-Draw'
        //                         : 'Game-Lost'
        //                     return <Popover 
        //                                 content={<div style={{display:'flex', gap:'10px'}}>
        //                                     <div style={{display:'flex', alignItems:'center', gap:'5px'}}>
        //                                         <img 
        //                                             height={15}
        //                                             width={15}
        //                                             src={las.parlocalsel.selimagen}
        //                                         />
        //                                         <span>{las.parlocalsel.selabreviacion}</span>
                                                
        //                                     </div>
        //                                     <div><span>{las.pargoleslocal}</span> - <span>{las.pargolesvisita}</span></div>
        //                                     <div style={{display:'flex', alignItems:'center', gap:'5px'}}>
        //                                         <img 
        //                                             height={15}
        //                                             width={15}
        //                                             src={las.parvisitasel.selimagen}
        //                                         />
        //                                         <span>{las.parvisitasel.selabreviacion}</span>
        //                                     </div>
        //                                 </div>} 
        //                                 title={null} 
        //                                 placement="leftBottom"
        //                                 trigger="click"
        //                                 > 
        //                         <div className={`${resultMatch}`}>
        //                             {resultMatch == 'Game-Won' ? 'G' : resultMatch == 'Game-Draw' ? 'E' : 'P'}
        //                         </div>
        //                     </Popover>
        //                 })
        //             }
        //         </div>
        //     },
        //     width:'90px'
        // },
    ];

    const getPositions = () => {
        dispatch(GetPositionsTournamentReducer())
    }

    useEffect(()=> {
        getPositions()
    },[])

    return (
        <Row style={{display:'flex', alignItems:'center', justifyContent:'center', padding:'10px 10px 40px 10px'}}>
            {
                rex_data_positions_tournament.length > 0
                ? <Col span={24} md={12}>
                    {
                        rex_data_positions_tournament.map(dat => (
                            <div>
                                <div style={{display:'flex', justifyContent:'center', margin:'15px 0', fontWeight:'600'}}>{dat.grunombre}</div>
                                <Table
                                    className={`Table-Positions ${rex_data_user.tornombre == 'EM' ? 'Table-EM':''}`}
                                    columns={columns}
                                    dataSource={dat.data}
                                    pagination={{
                                        position:['none','none']
                                    }}            
                                />
                            </div>
                        ))
                    }
                    {
                        rex_data_user.tornombre == 'EM'
                        ? <div className='Container-Info-Table-EM'>
                            <div><div className='Icon-Direct-Classification'></div>Clasificado al mundial</div>
                            <div><div className='Icon-Playoff-Classification'></div>Repechaje</div>
                        </div>
                        :  null                
                    }
                </Col>
                : <div style={{display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column', height:'90vh'}}>
                    <img
                        src={ImageLoading}
                        width={200}
                    />
                    <div style={{fontSize:'20px'}}>Cargando...</div>
                </div>
            }
            
        </Row>
    )
}

export default Positions