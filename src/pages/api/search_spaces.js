const apiUrl = process.env.NEXT_PUBLIC_SPACES_API_URL;
const token = process.env.NEXT_PUBLIC_BEARER_TOKEN;

export default async function SearchSpaces(req, res) {
    // const query: req;

    // console.log(token);
    // return;

    var response = await fetch(apiUrl + '?query=' + req.body
        + '&space.fields=title,created_at&expansions=creator_id', {
        headers: {
            "mode": "no-cors",
            // "User-Agent": "v2SpacesSearchJS",
            "Accept": "*/*",
            // "Accept-Encoding": "gzip, deflate, br",
            "Connection": "keep-alive",
            "authorization": `Bearer ${token}`
        }
    });
    const jsonData = await response.json();

    console.log(jsonData);

    res.status(200).json(jsonData);
}