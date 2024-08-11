import React from 'react'
import './../../Styles/Components/Top/Navbar.css'
import { Button, Tooltip } from 'antd'
import {
    SettingOutlined,
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { ShowModalMenuReducer } from '../../Redux/Actions/Top/Top';
import ModalMenu from './ModalMenu';

const Navbar = () => {

    const dispatch = useDispatch()

    const {
        rex_data_user,
    } = useSelector(({top}) => top)

    return (
        <div className={`Container-Navbar ${rex_data_user.tornombre}`}>
            <div>La quinela de la bondad</div>
            <Tooltip 
                placement="rightBottom" 
                title='Menu'
                color={'#FFFFFF'}
                overlayInnerStyle={{
                    color : '#000000',
                    fontSize:'11px',
                    display:'flex',
                    alignItems:'center'
                }}
            >
                <Button 
                    onClick={() => dispatch(ShowModalMenuReducer(true))}
                    className='Button-Setting'
                >
                    <SettingOutlined className={`Icon-Setting ${rex_data_user.tornombre}`}/>
                </Button>
            </Tooltip>
            <ModalMenu/>
        </div>
    )
}

export default Navbar