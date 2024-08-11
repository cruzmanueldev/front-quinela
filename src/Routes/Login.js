import { Button, Col, Input, Row, Select, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { GetDataTournamentsReducer } from '../Redux/Actions/Tournaments/Tournaments';
import './../Styles/Routes/Login.css'
import { useNavigate } from 'react-router-dom';
import { validateLogin } from '../Functions/helpers/validateLogin';
import { notifyAlert } from '../Functions/notifications';
import { AuthLoginReducer } from '../Redux/Actions/Top/Top';
import {
    LoadingOutlined
} from '@ant-design/icons';

const Login = () => {

    const { Title } = Typography;

	const {
		rex_data_tournaments
    } = useSelector(({tournaments}) => tournaments)

    const navigate = useNavigate()

	const dispatch = useDispatch()

	const getTournaments = async () => {
		await dispatch(GetDataTournamentsReducer())
	}
    const [ tournament, setTournament] = useState(null)
    const [ user, setUser ] = useState(null)
    const [ loadingLogin, setLoadingLogin] = useState(false)
    const [ formLogin, setFormLogin] = useState({
        tornid : 1,
        usuusuario : null,
        usucontrasena : null
    })

    const sendLogin = async () => {
        setLoadingLogin(true)
        const { response, message } = validateLogin(formLogin)
        if(!response){
            notifyAlert(message)
        }else{
            const response = await dispatch(AuthLoginReducer(formLogin))
            if(response){                
                navigate('/')
            }
        }
        setLoadingLogin(false)
    }

    const onChangeInput = (e) => {
        setFormLogin({
            ...formLogin, [e.target.name] : e.target.value
        })
    }

    const onChangeSelect = ({tornid, torimagen}) => {
        setTournament(torimagen)
        localStorage.setItem('tornid', tornid)
        setFormLogin({
            ...formLogin, tornid: tornid
        })
    };

    
	useEffect(()=>{
		getTournaments()
	},[])

    return (
        <Row className='Container-Login'>
            <Col className='Card-Login'>
                <Title level={3} className='Text-Main'>La quinela de la bondad</Title>
                <div style={{display:'flex',justifyContent:'center', paddingBottom:'10px'}}>
                    <img
                        width={230}
                        height={240}
                        // src={tournament ? tournament : 'https://res.cloudinary.com/josecruz9/image/upload/v1712374907/tm3gidyzcpx3k2zlskev.png'}
                        src='https://res.cloudinary.com/josecruz9/image/upload/v1712373465/zrkbejv5skotj8ciafpo.png'
                        alt='Icono torneo'
                    />
                </div>
                <div>
                <Select
                    value={'Copa America 2024'}
                    placeholder='Seleccionar torneo'
                    options={rex_data_tournaments}
                    onChange={(text, index)=> onChangeSelect(index)}
                />
                </div>

                <div className='Container-Input'>
                    <Select
                        placeholder='Seleccionar usuario'
                        options={[
                            {
                                value:'Argenis',
                                label :'Argenis'
                            },
                            {
                                value:'Joaquin',
                                label :'Joaquin'
                            },
                            {
                                value:'Gerardo G.',
                                label :'Gerardo G.'
                            },
                            {
                                value:'David C.',
                                label :'David C.'
                            },
                            {
                                value:'Merlyn',
                                label :'Merlyn'
                            },
                            {
                                value:'Douglas',
                                label :'Douglas'
                            },





                            {
                                value:'Gabriel P.',
                                label :'Gabriel P.'
                            },
                            {
                                value:'Jose L.',
                                label :'Jose L.'
                            },
                            {
                                value:'Edwin S.',
                                label :'Edwin S.'
                            },
                            {
                                value:'Jorge G.',
                                label :'Jorge G.'
                            },
                            {
                                value:'Manuel C.',
                                label :'Manuel C.'
                            },
                            {
                                value:'Victor',
                                label :'Victor'
                            },
                            {
                                value:'Marcelo',
                                label :'Marcelo'
                            },





                            {
                                value:'Ralph',
                                label :'Ralph'
                            },
                            {
                                value:'Martin',
                                label :'Martin'
                            },
                            {
                                value:'Abel R.',
                                label :'Abel R.'
                            },
                            {
                                value:'Luis',
                                label :'Luis'
                            },
                            {
                                value:'Omar C.',
                                label :'Omar C.'
                            },
                        ]}
                        onChange={(value, index)=> setFormLogin({
                            ...formLogin, usuusuario: value
                        })}
                    />
                    <Input.Password name='usucontrasena' onChange={onChangeInput} placeholder="Contrasena" />

                    <Button onClick={sendLogin} type="primary" htmlType="submit" block>
                        {loadingLogin ? <LoadingOutlined /> : 'Ingresar'}
                    </Button>
                </div>
            </Col>
        </Row>
    )
}

export default Login