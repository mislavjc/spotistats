import axios from "axios";

const topTracksHandler = async (req, res) => {
  if (req.method === 'POST') {
    const { token } = req.body
    const response = await axios.get("https://api.spotify.com/v1/me/top/tracks", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    const { items } = response.data
    res.send(items)
  } else {
    console.log("test")
    res.send("test")
  }
}

export default topTracksHandler;