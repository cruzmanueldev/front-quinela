import { Modal, Button } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import '././../../Styles/Components/Top/ModalMenu.css'
import {
	UserOutlined,
    LogoutOutlined,
    SwapOutlined,
    CalendarOutlined,
    HeartOutlined,
    PlayCircleOutlined,
    OrderedListOutlined,
    TeamOutlined,
    SettingOutlined,
    HomeOutlined
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { AuthLogoutReducer, ShowModalMenuReducer, ValidateUserReducer } from '../../Redux/Actions/Top/Top';

const ModalMenu = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {
        rex_show_modal_menu,
        rex_data_user
    } = useSelector(({top}) => top)

    const closeModal = () => {
        dispatch(ShowModalMenuReducer(false))
    }

    return (
            <Modal
                open={rex_show_modal_menu}
                onOk={()=> {}} 
                onCancel={closeModal}
                className='Modal-Menu'
                closeIcon={false}
                footer={null}
                maskClosable={true}
                centered={true}
            >
                <div style={{display:'flex', gap:'20px', flexWrap:'wrap', justifyContent:'center'}}>
                    <Button type='link' onClick={()=> {
                        navigate('/')
                        closeModal()
                    }} className={`Button-Icon-Menu ${rex_data_user.tornombre}`}>
                            <HomeOutlined className={`Icon-Menu ${rex_data_user.tornombre}`}/>
                    </Button>
                    <Button onClick={()=> {
                        navigate('/positions')
                        closeModal()
                    }} className={`Button-Icon-Menu ${rex_data_user.tornombre}`}>
                            <OrderedListOutlined className={`Icon-Menu ${rex_data_user.tornombre}`}/>
                    </Button>
                    <Button onClick={()=> {
                        navigate('/users')
                        closeModal()
                    }} className={`Button-Icon-Menu ${rex_data_user.tornombre}`}>
                            <TeamOutlined className={`Icon-Menu ${rex_data_user.tornombre}`}/>
                    </Button>
                    <Button onClick={()=> {
                        navigate('/game-prediction')
                            closeModal()
                        }} className={`Button-Icon-Menu ${rex_data_user.tornombre}`}>
                        <PlayCircleOutlined className={`Icon-Menu ${rex_data_user.tornombre}`}/>
                    </Button>
                    {
                        localStorage.getItem('usuusuario') == 'Manuel C.'
                        ? <Button onClick={()=> {
                            navigate('/close-match')
                            closeModal()
                        }} className={`Button-Icon-Menu ${rex_data_user.tornombre}`}>
                                <SettingOutlined className={`Icon-Menu ${rex_data_user.tornombre}`}/>
                        </Button>
                        : null
                    }
                    
                    <Button onClick={()=> {
                        navigate('/matches')
                        closeModal()
                    }} className={`Button-Icon-Menu ${rex_data_user.tornombre}`}>
                            <CalendarOutlined className={`Icon-Menu ${rex_data_user.tornombre}`}/>
                    </Button>
                    {/* <Button onClick={()=> {
                           navigate('/statistics')
                           closeModal()
                        }} 
                        className={`Button-Icon-Menu ${rex_data_user.tornombre}`}
                    >
                            <BarChartOutlined className={`Icon-Menu ${rex_data_user.tornombre}`}/>
                    </Button> */}
                    {/* <a href='https://ko-fi.com/codigopython' target='_blank'>
                    <Button 
                        className={`Button-Icon-Menu ${rex_data_user.tornombre}`}
                    >
                            
                                <HeartOutlined className={`Icon-Menu ${rex_data_user.tornombre}`}/>
                            
                    </Button>
                    </a> */}
                    {/* <Button onClick={()=> {
                        let tornid = rex_data_user.tornid == 2 ? 1 : 2
                        closeModal()
                        dispatch(ValidateUserReducer(tornid))
                        dispatch(GetDataNextMatchesReducer(true))
                    }} className={`Button-Icon-Menu ${rex_data_user.tornombre}`}>                        
                        <img 
                            height={50} 
                            width={50} 
                            src={rex_data_user.tornid == 1 
                                ? 'https://res.cloudinary.com/josecruz9/image/upload/v1712456180/2026_FIFA_World_Cup_29_nngpit.png'
                                :'https://res.cloudinary.com/josecruz9/image/upload/v1712373465/zrkbejv5skotj8ciafpo.png'}/>
                    </Button> */}
                    <Button onClick={()=> {
                        navigate('/login')
                        dispatch(AuthLogoutReducer())
                    }} 
                    className={`Button-Icon-Menu ${rex_data_user.tornombre}`}>
                            <LogoutOutlined className={`Icon-Menu ${rex_data_user.tornombre}`}/>
                    </Button>
                </div>
            </Modal>
    )
}

export default ModalMenu