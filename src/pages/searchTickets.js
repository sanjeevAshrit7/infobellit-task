import { makeStyles } from '@material-ui/core';
import { ArrowForward } from '@mui/icons-material';
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Paper,
    Typography
} from '@mui/material';
import { isEmpty } from 'lodash';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';

import {
    BookNow,
    CustomDropDown,
    images,
    Loader,
    modalStyle,
    NoData
} from '../utils/commonComponents';
import { ticketData } from '../utils/data';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});

const cities = [
    {
        id: 1,
        name: 'Bangalore',
        value: 'Bangalore'
    },
    {
        id: 2,
        name: 'Chennai',
        value: 'Chennai'
    },
    {
        id: 3,
        name: 'Mumbai',
        value: 'Mumbai'
    },
    {
        id: 4,
        name: 'Pune',
        value: 'Pune'
    },
]

function SearchTickets() {

    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState([]);
    const [source, setSource] = useState('');
    const [destination, setDestination] = useState('');
    const [noItemsFound, setNoItemsFound] = useState(false)
    const [showSearchBox, setShowSearchBox] = useState(true);
    const [booking, setBooking] = useState(false);
    const [selectedItem, setSelectedItem] = useState([]);

    const classes = useStyles();
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
    const userState = useSelector((state) => state.loginUser);
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();

    const resetAll = () => {
        setLoading(false);
        setResults([]);
        setSource('');
        setDestination('');
        setNoItemsFound(false)
        setShowSearchBox(true)
    }

    const searchFilter = (source, destination) => {
        let newData = []
        newData = ticketData?.filter((item) => item.source.toLowerCase().includes(source.toLowerCase()) && item.destination.toLowerCase().includes(destination?.toLowerCase()))
        setTimeout(() => {
            setResults(newData)
            isEmpty(newData) ? setNoItemsFound(true) : setNoItemsFound(false)
            setLoading(false)
        }, 2000)
    }

    const loadTickets = (showAll) => {
        setTimeout(() => {
            setLoading(false)
            showAll ?
                setResults(ticketData) :
                setResults([])
        }, 2000)
    };

    return (
        <main
            className={`flex justify-center flex-${isTabletOrMobile ? 'col' : 'row'}`}
        >
            <NoData open={noItemsFound} />
            {
                !showSearchBox && !loading && isEmpty(results) &&
                <button
                    className={`rounded w-full lg:w-auto px-6 py-3 text-white hover:bg-red-600 bg-red-500 self-end my-${isTabletOrMobile ? 4 : 0}`}
                    onClick={() => {
                        resetAll();
                    }}
                >
                    Search again
                </button>
            }
            {showSearchBox &&
                <Paper elevation={2} className={isTabletOrMobile ? 'mx-6 my-20' : ''}>
                    <Box
                        sx={!isTabletOrMobile ? modalStyle : {}}
                        className={`self-center py-${isTabletOrMobile ? '6' : '2'} px-2 flex flex-col my-6`}
                    >
                        <span
                            className={'text-2xl font-bold self-center text-center'}
                        >
                            Check tickets availability for upcoming journey
                        </span>
                        <div
                            className={isTabletOrMobile ?
                                'flex flex-col items-stretch mx-2 my-6 justify-center' :
                                'flex flex-row items-center mx-2 my-6'
                            }
                        >
                            <Typography>
                                <span className='text-red-400 mx-2'>*</span>
                                From&nbsp;&nbsp;
                            </Typography>
                            <CustomDropDown
                                value={source}
                                placeholder={'Enter departure pplace'}
                                onChange={(e) => {
                                    setSource(e.target.value)
                                }}
                                data={cities}
                            />
                            <Typography>
                                <span className='text-red-400 mx-2'>*</span>
                                To&nbsp;&nbsp;
                            </Typography>
                            <CustomDropDown
                                value={destination}
                                placeholder={'Enter the destination'}
                                onChange={(e) => {
                                    setDestination(e.target.value)
                                }}
                                data={cities}
                            />
                        </div>
                        <div className={isTabletOrMobile ? 'flex flex-col' : 'flex flex-row justify-around w-1/2 self-center'}>
                            <button
                                className={`rounded w-full lg:w-auto px-6 py-3 text-white hover:bg-red-600 bg-red-500 self-center my-${isTabletOrMobile ? 4 : 0}`}
                                onClick={() => {
                                    if (source === destination) {
                                        enqueueSnackbar('Source and Destination cannot be same or empty', {variant: 'warning'})   
                                    } else {
                                        setLoading(true)
                                        setShowSearchBox(false)
                                        searchFilter(source, destination)
                                    }
                                }}
                            >
                                Search
                            </button>
                            <button
                                className="rounded w-full lg:w-auto px-6 py-3 text-white hover:bg-red-600 bg-red-500 self-center"
                                onClick={() => {
                                    setLoading(true)
                                    loadTickets(true);
                                    setShowSearchBox(false)
                                }}
                            >
                                Show All
                            </button>
                        </div>
                    </Box>
                </Paper>
            }
            <Loader open={loading} />
            {
                !isEmpty(results) &&
                <div className='flex flex-col'>
                    <button
                        className={`rounded w-full lg:w-auto px-6 py-3 text-white hover:bg-red-600 bg-red-500 self-center my-${isTabletOrMobile ? 4 : 4}`}
                        onClick={() => {
                            resetAll();
                        }}
                    >
                        Search again
                    </button>
                    <div
                        className={!isTabletOrMobile ?
                            'grid grid-cols-4 gap-10 mx-20 my-10' :
                            'grid grid-cols-1 gap-4 mx-10 my-10'
                        }
                    >
                        {results.map((item) => {
                            return (
                                <Card
                                    className={
                                        isTabletOrMobile ?
                                            'border-l-8 border-blue-900 hover:drop-shadow-2xl hover:border-red-800 my-4 w-full' :
                                            'container mx-auto bg-red-700 border-l-8 border-blue-900 hover:drop-shadow-2xl hover:border-red-800 my-4'
                                    }
                                    key={item?.id}
                                >
                                    <CardMedia
                                        className={classes.media}
                                        image={images.bg}
                                        title={item?.trainName}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h6" component="div" color={'orange'} fontWeight={'bold'}>
                                            {item?.trainName}
                                        </Typography>
                                        <Typography gutterBottom variant="h6" component="div" color={'orange'} fontWeight={'bold'}>
                                            {item?.source}
                                            <ArrowForward htmlColor='' />
                                            {item?.destination}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            <strong>Availability</strong>:&nbsp;{item?.availability}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            <strong>Date</strong>:&nbsp;{'11/12/2023'}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button
                                            size="small"
                                            onClick={() => {
                                                setBooking(true)
                                                setSelectedItem(item)
                                            }}
                                        >Book Now</Button>
                                    </CardActions>
                                </Card>
                            )})
                        }
                    </div>
                </div>
            }
            <BookNow
                open={booking}
                item={selectedItem}
                userState={userState}
                setOpen={setBooking}
                dispatch={dispatch}
            />
        </main>
    )
}

export default SearchTickets