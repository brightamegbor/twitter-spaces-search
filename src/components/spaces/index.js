import React, { Fragment, useState } from 'react';
import { Box, CardMedia, Card, CardContent, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import TwitterIcon from '@mui/icons-material/Twitter';
import SearchIcon from '@mui/icons-material/Search';
import CircularProgress from '@mui/material/CircularProgress';
import Moment from 'react-moment';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import PropTypes from 'prop-types';
// import TabPanel from '@mui/material/TabPanel';
// import configData from "/config.json";
// import needle from 'needle';

// const needle = require('needle');

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box>
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function Spaces() {
    const[loading, setLoading] = useState(false);
    const [noneFound, setNoneFound] = useState(false);
    const [error, setError] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [spacesList, setSpacesList] = useState({data:[], includes:{users:[]}});

    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const apiUrl = process.env.NEXT_PUBLIC_SPACES_API_URL;
    const token = process.env.NEXT_PUBLIC_BEARER_TOKEN;

    const searchForSpaces = async (query) => {

        setError(false);
        setNoneFound(false);
        setLoading(true);
        var response = await fetch("/api/search_spaces", {
            "method": "POST",
            "body": query,
            headers: {
                "Accept": "*/*",
                "Accept-Encoding": "gzip, deflate, br",
                "Connection": "keep-alive",
            }
        });

        if(response.status === 200) {
            var res = await response.json();
            // console.log(res);
            if (res.data !== undefined) {
                setSpacesList(res);
            } else {
                setNoneFound(true);
            }
        } else {
            setError(true);
        }
        // console.log(res.includes);

        setLoading(false);
    };

    const onSubmit = e => {
        e.preventDefault();
        searchForSpaces(searchValue);
    };

    const searchComponent = (
        <Fragment>
            <Box
                sx={{
                    width: 600,
                    maxWidth: '100%',
                }}
                className="self-center"
            >
                <Paper
                    // fullWidth
                    component="form"
                    onSubmit={onSubmit}
                    className="py-0.5 px-1 flex items-center rounded-full"
                    elevation={4}
                // sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', }}
                >
                    <IconButton sx={{ p: '10px' }} aria-label="menu">
                        <TwitterIcon />
                    </IconButton>
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Search for spaces.."
                        inputProps={{ 'aria-label': 'search for spaces..' }}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={() => searchForSpaces(searchValue)}>
                        <SearchIcon />
                    </IconButton>
                    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                    <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
                        <MenuIcon />
                    </IconButton>
                </Paper>
            </Box>
        </Fragment>
    );

    const CardItem = (props) => {

        return (
        <React.Fragment>
            <CardMedia
                component="img"
                    image={props.user !== undefined && props.user.profile_image_url !== undefined 
                        ? props.user.profile_image_url.replace("_normal", "") : "https://mui.com/static/images/cards/paella.jpg"}
                // image="https://mui.com/static/images/cards/paella.jpg"
                alt="Paella dish"
            />

                <CardContent className="text-left">
                    <Typography gutterBottom variant="subtitle1" className="font-bold" >
                        {props.space.title}
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary">
                        <Moment fromNow={true}>{props.space.created_at}</Moment>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        by {props.user !== undefined && props.user.name} <Typography variant="caption">
                            {props.user !== undefined ? "@" + props.user.username : "(Authorization required to view this user details)"}</Typography>
                    </Typography>
                </CardContent>
        </React.Fragment>)
    };


    return (
        <div className="container mx-auto p-4 flex flex-col">
            {searchComponent}

            <p className="py-4"></p>

            {loading && 
                <Box className="p-4" className="self-center">
                    <CircularProgress size={30} color="secondary" />
                </Box>
            }

            {error && <Typography variant="caption" color="text.warning" className=''>Error loading spaces, try again!</Typography>}

            {noneFound && <Typography variant="h5" color="text.primary" className=''>No Twitter Spaces found for the searched keyword</Typography>}
            {/* List of spaces */}
            {spacesList.data.length !== 0 && (
                <>
                    <Tabs onChange={handleChange} value={value} centered>
                        <Tab className="capitalize" label="Live" {...a11yProps(0)} />
                        <Tab className="capitalize" label="Scheduled" {...a11yProps(1)} />
                    </Tabs>

                    <TabPanel value={value} index={0}>
                        <div className="flex flex-row flex-wrap justify-center md:justify-start">
                            {spacesList.data.map((space, index) =>
                                <Fragment key={space.id}> 
                                    {space.state === 'live' &&
                                        <Box className="p-4" sx={{ width: 300 }} key={space.id}>
                                            <a href={"https://twitter.com/i/spaces/" + space.id} target="_blank" >
                                                <Card key={space.id} variant="outlined">
                                                    <CardItem user={spacesList.includes.users.find(x => x.id === space.creator_id)} space={space} />
                                                </Card>
                                            </a>
                                        </Box>
                                    }
                                
                                </Fragment>
                            )}

                        </div>
                    </TabPanel>

                    <TabPanel value={value} index={1}>
                        <div className="flex flex-row flex-wrap justify-center">
                            {spacesList.data.map((space, index) =>
                                <Fragment key={space.id}>
                                    {space.state !== 'live' &&
                                        <Box className="p-4" sx={{ width: 300 }} key={space.id}>
                                            <a href={"https://twitter.com/i/spaces/" + space.id} target="_blank" >
                                                <Card key={space.id} variant="outlined">
                                                    <CardItem user={spacesList.includes.users.find(x => x.id === space.creator_id)} space={space} />
                                                </Card>
                                            </a>
                                        </Box>
                                    }

                                </Fragment>
                            )}

                        </div>
                    </TabPanel>
                </>
            
            )}            
        </div>
    );

}

export default Spaces;