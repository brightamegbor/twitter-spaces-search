// const apiUrl = process.env.NEXT_PUBLIC_SPACES_API_URL
const token = process.env.NEXT_PUBLIC_BEARER_TOKEN
const apiKey = process.env.NEXT_PUBLIC_API_KEY

export default async function SearchSpaces (req, res) {
  const savedOauth = localStorage.getItem('oauth_token')

  if (savedOauth === req.oauth_token) {
    localStorage.setItem('oauth_verifier', req.oauth_verifier)

    const response = await fetch('https://api.twitter.com/oauth/access_token', {
      method: 'POST',
      body: JSON.stringify({
        oauth_consumer_key: apiKey,
        oauth_token: savedOauth,
        oauth_verifier: req.oauth_token
      }),
      headers: {
        // "User-Agent": "v2SpacesSearchJS",
        Accept: '*/*',
        // "Accept-Encoding": "gzip, deflate, br",
        Connection: 'keep-alive',
        authorization: `Bearer ${token}`
      }
    })

    if (response.status === 200) {
      const jsonData = await response.json()

      // console.log(jsonData);
      localStorage.setItem('user_oauth_token', jsonData.oauth_token)
      localStorage.setItem('user_oauth_token_secret', jsonData.oauth_token_secret)
      res.status(200).json('Success')
    }
  }
}
