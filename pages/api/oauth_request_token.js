// const apiUrl = process.env.NEXT_PUBLIC_SPACES_API_URL;
// const token = process.env.NEXT_PUBLIC_BEARER_TOKEN;
const apiKey = process.env.TWITTER_CONSUMER_KEY
const apiSecret = process.env.TWITTER_CONSUMER_SECRET

// "oauth_consumer_key": apiKey

export default async function OauthRequestToken (req, res) {
  // const apiUrl = 'https://api.twitter.com/oauth/request_token?oauth_callback=http%3A%2F%2Fwww.localhost%3A3000%2Fapi%2Foauth_callback'
  const apiUrl = '/api/auth/signin/twitter'

  // const { v4: uuidv4 } = require('uuid')
  // const base64 = require('base-64')

  // const oauthNonce = base64.encode((uuidv4().hex))
  //   const oauthSignature = base64.encode((uuidv4().hex))

  // const timestamp = Math.floor(Date.now() / 1000)

  const response = await fetch(apiUrl, {
    method: 'POST',
    body: {},
    headers: {
      // "User-Agent": "v2SpacesSearchJS",
      Accept: '*/*',
      // "Accept-Encoding": "gzip, deflate, br",
      // "contentType": "application/json",
      Connection: 'keep-alive',
      // "Authorization": `OAuth oauth_consumer_key="${apiKey}"`
      Authorization: `OAuth oauth_consumer_key="${apiKey}", oauth_consumer_secret="${apiKey}"oauth_consumer_key="${apiSecret}"`
    }
  })

  console.log(response)

  if (response.status === 200) {
    const jsonData = await response.json()

    // console.log(jsonData);

    res.status(200).json(jsonData)
  } else {
    res.status(response.status).json(response)
  }
}
