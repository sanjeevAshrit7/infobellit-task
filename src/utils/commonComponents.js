import { Add, Remove } from '@mui/icons-material';
import { Box, MenuItem, Modal, Select, Typography } from '@mui/material';
import { isEmpty } from 'lodash';
import Lottie from "lottie-react";
import { useSnackbar } from 'notistack';
import { useState } from 'react';

import { useMediaQuery } from 'react-responsive';
import { setMyTicket } from '../store/loginReducer/actions';


export const images = {
    logo: require('../assets/images/logo.png'),
    loader: require('../assets/animations/trainLoader.json'),
    bg: require('../assets/images/bg.jpg'),
    empty: require('../assets/animations/empty.json')
};


const customStyles = {
    navItem1: 'inflex-flex items-center py-3 px-2 my-6 rounded hover:font-bold text-[#001C43] hover:underline text-sm hover:decoration-[#F2430A] hover:underline-offset-8 text-center',
    navItem2: 'inflex-flex items-center py-3  my-3 rounded text-[#0A142F] font-bold cursive text-center hover:underline'
};

export const navData = [
    {
        id: 1,
        name: 'Search Tickets',
        to: '/searchTickets',
        style: customStyles.navItem1
    },
    {
        id: 2,
        name: 'My Bookings',
        to: '/myBookings',
        style: customStyles.navItem1
    },
    {
        id: 3,
        name: 'About Us',
        to: '/aboutUs',
        style: customStyles.navItem1
    },
    {
        id: 4,
        name: 'Contact Us',
        to: null,
        style: customStyles.navItem1
    },
];

export const navDataMini = [
    {
        id: 1,
        name: 'Search Tickets',
        to: '/searchTickets',
        style: customStyles.navItem2
    },
    {
        id: 2,
        name: 'My Bookings',
        to: '/myBookings',
        style: customStyles.navItem2
    },
    {
        id: 3,
        name: 'About Us',
        to: '/aboutUs',
        style: customStyles.navItem2
    },
    {
        id: 4,
        name: 'Contact Us',
        to: null,
        style: customStyles.navItem2
    },
];

export const contacts = [
    {
        id: 1,
        name: 'BookMytrain@yahoo.com',
        style: 'text-white cursive text-center my-1',
        style2: '',
    },
    {
        id: 2,
        name: 'BookMytrain@co.in',
        style: 'text-white cursive text-center my-1',
        style2: '',
    },
    {
        id: 3,
        name: '8904616217',
        style: 'text-white cursive text-center my-1',
        style2: '',
    }
];

export const CustomInput = ({
    placeholder,
    onChange,
    helperText = '',
    isSmall = false
}) => {
    return (
        <div className={isSmall ? 'flex flex-col justify-center w-20' : 'flex flex-col justify-center self-center w-full'}>
            <input
                placeholder={placeholder}
                type="text"
                className="w-full p-2 border-2 border-gray-500 rounded focus:outline-none focus:border-green-800"
                onChange={onChange}
            />
            <span className='text-red-400 text-xs my-1'>
                {helperText}
            </span>
        </div>
    )
};

export const CustomDropDown = ({
    value,
    placeholder,
    onChange,
    data
}) => {
    return (
        <div className={'flex flex-col justify-center'}>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                className="w-full lg:w-80 p-2 rounded h-10"
                value={value}
                label={placeholder}
                onChange={onChange}
            >
                {data?.map((item) => {
                    return(
                        <MenuItem value={item?.value}>{item?.name}</MenuItem>       
                    )
                })}
            </Select>
        </div>
    )
};

export const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '1px solid green',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
};

export const modalStyle2 = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '3px dashed orange',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
};

export const Loader = (props) => {
    const { open } = props;
    if (open) {
        return (
            <div>
                <div className='flex flex-col items-center mt-10'>
                    <Lottie
                        animationData={images.loader}
                        loop={true}
                    />
                    <h1 className='text-3xl flex justify-center cursive'>Loading Data...</h1>
                </div>
            </div>
        )   
    } else {
        return (
            <>
            </>
        )
    }
};

export const NoData = (props) => {
    const { open } = props;
    if (open) {
        return (
            <div className=''>
                <div className='flex flex-col items-center my-4 h-40 w-60'>
                    <Lottie
                        animationData={images.empty}
                        loop={true}
                    />
                </div>
                <h1 className='text-3xl flex justify-center cursive mt-10'>No Data found...&nbsp;&nbsp;</h1>
            </div>
        )
    } else {
        return <></>
    }
}


export const BookNow = ({
    open,
    item,
    userState,
    setOpen,
    dispatch
}) => {
    const [count, setCount] = useState(1);
    const [age, setAge] = useState('');
    const [ageError, setAgeError] = useState('');

    const isNum = /^[0-9]+$/
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
    const { enqueueSnackbar } = useSnackbar();

    return (
        <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={modalStyle2} className={isTabletOrMobile ? 'w-full self-center' : 'w-2/5 self-center'}>
                <div className='flex flex-col'>
                    <span className='text-2xl font-bold text-orange-400 underline decoration-dotted decoration-orange-400 my-2 self-center'>
                        Booking details
                    </span>
                    <Typography className='mt-4' variant='h5'>
                        {item?.trainName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <strong>Class</strong>:&nbsp;{'SL'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <strong>Date</strong>:&nbsp;{'22/12/2023'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <strong>Passenger name</strong>:&nbsp;{userState?.userName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <div className='flex flex-row items-center'>
                            <strong>number of seats</strong>:&nbsp;
                            <div
                                onClick={() => {setCount(count > 1 ? count-1 : 0)}}
                            >
                                <Remove className='h-2' />
                            </div>
                            {count}
                            <div
                                onClick={() => { setCount(count + 1) }}
                            >
                                <Add className='h-2' />
                            </div>
                        </div>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <strong>From</strong>:&nbsp;{item?.source}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <strong>To</strong>:&nbsp;{item?.destination}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <div
                            className={isTabletOrMobile ?
                                'flex flex-row items-center' :
                                'flex flex-row items-center'
                            }>
                            <strong className={isTabletOrMobile ? 'mb-2' : 'mb-2'}>passenger age:</strong>&nbsp;
                            <CustomInput
                                onChange={(e) => {
                                    if (e.target.value.match(isNum) === null) {
                                        setAgeError("Not a number")
                                    } else {
                                        setAge(e.target.value);
                                        setAgeError('')
                                    }
                                }}
                                helperText={ageError}
                                isSmall={true}
                            />
                        </div>
                    </Typography>
                </div>
                <div
                    className={isTabletOrMobile ?
                        'flex flex-col items-center' : 
                        'flex flex-row items-center justify-around'
                }>
                    <button
                        className={`rounded w-full lg:w-auto px-6 py-3 text-white hover:bg-red-600 bg-red-500 self-center my-4 `}
                        onClick={() => {
                            if (age === '' || !isEmpty(ageError)) {
                                enqueueSnackbar('Please enter passenger age', { variant: 'error' })
                            } else {
                                setOpen(!open)
                                setAge('');
                                setAgeError('')
                                enqueueSnackbar('Booking Successfull', { variant: 'success' })
                                dispatch(setMyTicket({
                                    item: {
                                        passengerName: userState?.userName,
                                        DOJ: '22/12/2023',
                                        trainName: item?.trainName,
                                        seats: count,
                                        from: item?.source,
                                        to: item?.destination,
                                        age: age,
                                        time: item?.id % 2 === 0 ? '23:10' : '12:24',
                                        coach: item?.id % 2 === 0 ? 'S1': 'S3'
                                    }
                                }))
                            }
                        }}
                    >
                        Confirm Booking
                    </button>
                    <button
                        className={`rounded w-full lg:w-auto px-6 py-3 text-black self-center my-4 border-2 border-black`}
                        onClick={() => {
                            setOpen(!open)
                            setAge('');
                            setAgeError('')
                            enqueueSnackbar('Booking cancelled', { variant: 'info' })
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </Box>
        </Modal>
    )
}