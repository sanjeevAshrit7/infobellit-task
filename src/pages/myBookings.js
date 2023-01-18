import { Box, Paper, Typography } from '@mui/material';
import { isEmpty } from 'lodash';
import React from 'react';
import { useSelector } from 'react-redux'
import { useMediaQuery } from 'react-responsive';

import { images, NoData } from '../utils/commonComponents';

function MyBookings() {

    const userState = useSelector((state) => state.loginUser);
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });

    return (
        <div>
            <div
                className='flex flex-row w-full justify-center text-2xl mt-6 font-bold cursive'
            >
                My Bookings
            </div>
            <main
                className={`flex justify-center flex-${isTabletOrMobile ? 'col' : 'row'}`}
            >
                <div className={isTabletOrMobile ? '' : 'ml-60'}>
                    <NoData open={isEmpty(userState?.myTickets)} />
                </div>
                <div
                    className={!isTabletOrMobile ?
                        'grid grid-cols-3 gap-10 mx-20 my-10' :
                        'grid grid-cols-1 gap-4 mx-10 my-10'
                    }
                >
                {
                    userState?.myTickets?.map((item) => {
                        return (
                            <Box
                                className={'flex flex-col items-center px-4 py-2 bg-yellow-100 border-dashed border-orange-200 border-2 rounded-xl w-full drop-shadow-md'}
                            >
                                <img
                                    src={images.logo}
                                    className={'h-20 w-20'}
                                    alt={'NA'}
                                />
                                <span className='text-2xl font-bold'>{item?.trainName}</span>
                                <div
                                    className={'flex flex-col w-full my-4'}
                                >
                                    <Typography variant="body2" color="text.secondary" >
                                        <strong>From:</strong>&nbsp;{item?.from}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" >
                                        <strong>To:</strong>&nbsp;{item?.to}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        <strong>Passenger name:</strong>&nbsp;{item?.passengerName}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        <strong>Age:</strong>&nbsp;{item?.age}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" >
                                        <strong>DOJ:</strong>&nbsp;{item?.DOJ}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" >
                                        <strong>Seats:</strong>&nbsp;{item?.seats}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" >
                                        <strong>Coach:</strong>&nbsp;{item?.coach}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        <strong>Departure Time:</strong>&nbsp;{item?.time}
                                    </Typography>
                                </div>
                                <Typography variant="body2" color="text.secondary">
                                    <strong>----Happy journey----</strong>
                                </Typography>
                            </Box>
                        )
                    })
                }
                </div>
            </main>
        </div>
    )
}

export default MyBookings