import React, { Fragment } from 'react';
import Button from '@mui/material/Button';
import TwitterIcon from '@mui/icons-material/Twitter';
import Stack from '@mui/material/Stack';
import { Box } from '@mui/material';

function Followers() {
    return (
        <Fragment>
            <div className="container mx-auto p-4 mt-6 flex flex-col">
                <Box
                    sx={{
                        width: 300,
                        maxWidth: '100%',
                    }}
                    className="self-center"
                >
                    <Stack direction="column" spacing={2}>
                        <Button variant="outlined" startIcon={<TwitterIcon />}>
                            Authenticate with Twitter
                        </Button>
                    </Stack>
                </Box>
                <small className="self-center">Authenticate with your twitter account to manage your followers</small>

            </div>
        </Fragment>
    )
}

export default Followers