import React, { Fragment } from 'react'
import Button from '@mui/material/Button'
import TwitterIcon from '@mui/icons-material/Twitter'
import Stack from '@mui/material/Stack'
import { Box } from '@mui/material'
// import CircularProgress from '@mui/material/CircularProgress'
import { signIn, signOut, useSession } from 'next-auth/react'

// const authorize = (props) => {
//   return window.open(
//     'https://api.twitter.com/oauth/authorize?oauth_token=' +
//         props.oauth_token + `&oauth_token_secret=${props.oauth_token_secret}&oauth_callback_confirmed=true`
//   )
// }

function MyTweets () {
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState(false)
  const { session } = useSession()

  //   const getAuthToken = async () => {
  //     setError(false)
  //     setLoading(true)

  //     const response = await fetch('/api/auth/signin/twitter', {
  //       method: 'POST',
  //       body: {},
  //       headers: {
  //         Accept: '*/*',
  //         'Accept-Encoding': 'gzip, deflate, br',
  //         Connection: 'keep-alive'
  //       }
  //     })

  //     const data = await response.text();

  //     console.log(data);

  //     window.open(data

  //     // if (response.status === 200) {
  //     //   const res = await response.json()
  //     //   // console.log(res);
  //     //   localStorage.setItem('oauth_token', res.oauth_token)
  //     //   localStorage.setItem('oauth_token_secret', res.oauth_token_secret)

  //     //   if (res.oauth_callback_confirmed === true) {
  //     //     // eslint-disable-next-line camelcase
  //     //     const sdsd = await authorize(oauth_token = res.oauth_token, oauth_token_secret = res.oauth_token_secret)
  //     //   }
  //     // } else {
  //     //   setError(true)
  //     //   console.log(response)
  //     // }

  //     setLoading(false)
  //   }

  //   const LoadingWidget = () => {
  //     return (
  //         <Box className="p-4" className="self-center">
  //             <CircularProgress size={20} color="secondary" />
  //         </Box>
  //     )
  //   }

  return (
        <Fragment>
            {!session && <>

                <div className="container mx-auto p-4 mt-6 flex flex-col">
                    <Box
                        sx={{
                          width: 300,
                          maxWidth: '100%'
                        }}
                        className="self-center"
                    >
                        <Stack direction="column" spacing={2}>
                            <Button variant="outlined"
                            startIcon={<TwitterIcon />}
                            onClick={signIn}
                            >
                                Authenticate with Twitter
                            </Button>
                        </Stack>
                    </Box>
                    <small className="self-center">Authenticate with your twitter account to manage your tweets</small>

                </div>
            </>}
            {session && <>
            Signed in as {session.user.email} <br/>
            <button onClick={() => signOut()}>Sign out</button>
            </>}
        </Fragment>
  )
}

export default MyTweets
