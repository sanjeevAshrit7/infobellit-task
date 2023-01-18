import { Box, Modal } from '@mui/material';
import { isEmpty } from 'lodash';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';

import { setUserDetails } from '../store/loginReducer/actions';
import { CustomInput, images, modalStyle } from '../utils/commonComponents'

function Home() {

    const [userName, setUserName] = useState('');
    const [mobile, setMobile] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });

    const handleSubmit = () => {
        if (isEmpty(userName) || isEmpty(mobile)) {
            enqueueSnackbar('Please enter both enries to proceed', {variant: 'info'})
        } else {
            dispatch(setUserDetails({ userName: userName, mobile: mobile }))
            navigate('/searchTickets')
            enqueueSnackbar(`Logged in successfully as ${userName}`, { variant: 'success' })
        }
    }

    return (
        <main>
            <img src={images.bg} alt={"Home NA"} className={"absolute object-cover w-full h-full"} />
            <Modal
                open={true}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className='mx-4 self-center'
            >
                <Box sx={modalStyle} className={isTabletOrMobile ? 'w-full self-center' : 'w-2/5 self-center'}>
                    <div className={'flex items-center flex-col'}>
                        <span
                            className={'text-3xl font-bold'}
                        >
                            Enter your details to continue
                        </span>
                        <div className="flex items-center mt-2 gap-3 flex-col  py-4 w-full">
                            <CustomInput
                                onChange={(e) => {
                                    setUserName(e.target.value)
                                }}
                                placeholder={'Enter your name'}
                                
                            />
                            <CustomInput
                                onChange={(e) => {
                                    setMobile(e.target.value)
                                }}
                                placeholder={'Enter your Mobile number'}
                            />
                        </div>
                        <button
                            className="rounded w-full lg:w-auto px-10 py-3 text-white hover:bg-green-600 bg-green-500"
                            onClick={handleSubmit}
                        >
                            Search
                        </button>
                    </div>
                </Box>
            </Modal>
        </main>
    )
}

export default Home