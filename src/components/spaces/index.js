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
    const [spacesList, setSpacesList] = useState({data:[], includes:{users:[]}});

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

        if(response.status === 200) {
            var res = await response.json();
            console.log(res);
            if (res.data !== undefined) {
                setSpacesList(res);
            }
        }
        console.log(res.includes);

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
                image={props.user.profile_image_url !== undefined 
                        ? props.user.profile_image_url.replace("_normal", "") : "https://mui.com/static/images/cards/paella.jpg"}
                // image="https://mui.com/static/images/cards/paella.jpg"
                alt="Paella dish"
            />

                <CardContent className="text-left">
                    <Typography gutterBottom variant="subtitle1" className="font-bold" >
                        {props.space.title}
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary">
                        {props.space.created_at}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {props.user.name} <Typography variant="caption">
                            @{props.user.username}</Typography>
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
            {/* List of spaces */}
            <div className="flex flex-row flex-wrap">
                {spacesList.data.map((space, index) => 
                    <Box className="p-4" sx={{ width: 300 }} key={space.id}>
                        <a href={"https://twitter.com/i/spaces/" + space.id} target="_blank" >
                            <Card key={space.id} variant="outlined">
                                <CardItem user={spacesList.includes.users.find(x => x.id === space.creator_id)} space={space} />
                            </Card>
                        </a>
                    </Box>
                )}
                
            </div>
            
        </div>
    );

}

export default Spaces;