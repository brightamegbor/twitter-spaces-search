import React, { Fragment, useState } from 'react';
import TextField from '@mui/material/TextField';
import { Box, Button, CardMedia, Card, CardActions, CardContent, CardHeader, Typography, Avatar } from '@mui/material';
import InputUnstyled from '@mui/base/InputUnstyled';
import { styled } from '@mui/system';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import TwitterIcon from '@mui/icons-material/Twitter';
import SearchIcon from '@mui/icons-material/Search';
import CircularProgress from '@mui/material/CircularProgress';
// import configData from "/config.json";
// import needle from 'needle';

// const needle = require('needle');

function Spaces() {
    const[loading, setLoading] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [spacesList, setSpacesList] = useState([]);

    const apiUrl = process.env.NEXT_PUBLIC_SPACES_API_URL;
    const token = process.env.NEXT_PUBLIC_BEARER_TOKEN;

    const searchForSpaces = async (query) => {
        // console.log(token);
        setLoading(true);

        // return;

        // const params = {
        //     'query': query, // Replace the value with your search term
        //     'space.fields': 'title,created_at',
        //     'expansions': 'creator_id'
        // }
        var response = await fetch("/api/search_spaces", {
            "method": "POST",
            "body": query,
            headers: {
                // "User-Agent": "v2SpacesSearchJS",
                "Accept": "*/*",
                "Accept-Encoding": "gzip, deflate, br",
                "Connection": "keep-alive",
            }
        });

        var res = await response.json();

        console.log(res);
        setSpacesList(res.data !== undefined ? res.data : []);

        setLoading(false);
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
                    className="py-0.5 px-1 flex items-center"
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
            {/* <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
                            TS
                        </Avatar>
                    }
                    // action={
                    //     <IconButton aria-label="settings">
                    //         <IconButton />
                    //     </IconButton>
                    // }
                title="Shrimp and Chorizo Paella"
                subheader="September 14, 2016 12:43 PM"
            /> */}
            <CardMedia
                component="img"
                height="140"
                image="https://mui.com/static/images/cards/paella.jpg"
                alt="Paella dish"
            />

                <CardContent className="text-left">
                    <Typography gutterBottom variant="h6" component="div">
                        {props.space.title}
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary">
                        {props.space.created_at}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {props.space.creator_id}
                    </Typography>
                </CardContent>
        </React.Fragment>)
    };


    return (
        <div className="container mx-auto p-4 flex flex-col">
            {searchComponent}

            <p className="py-4"></p>

            {loading && <CircularProgress color="secondary" />}
            {/* List of spaces */}
            <div className="flex flex-row flex-wrap">
                {spacesList.map(space => 
                    <Box className="p-4" sx={{ maxWidth: 345 }} key={space.id}>
                        <Card key={space.id} variant="outlined"><CardItem space={space} /></Card>
                    </Box>
                )}
                
            </div>
            
        </div>
    );

}

export default Spaces;