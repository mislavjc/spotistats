
# Spotistats

Next.js application using Spotify API for user listening habbits and statistics.


## Demo

https://spotistats.vercel.app/

  
## Features

- Playlist creation
- Time frame selection

  
## API Reference

#### Get most listened tracks based on a time range

```http
  POST /api/time-range-tracks
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `range`      | `string` | **Required**. Specified time range for tracks fetching |
| `token`      | `string` | **Required**. Users Spotify access token |

#### Get dominant color

```http
  POST /api/color
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `array of songs` | `array` | **Required**. Array of songs Spotify API returns |

#### Create a playlist of most listened songs

```http
  POST /api/create-playlist
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. Spotify user id |
| `token` | `string` | **Required**. Users Spotify access token |
| `array of songs` | `array` | **Required**. Array of songs Spotify API returns |
| `name` | `string` | **Required**. Playlist name |
| `Description` | `string` | Playlist description |




#### getSpotifyData(url, token)

Takes Spotify API endpoint and access token and returns the fetched data.

#### postSpotifyData(url, token, data)

Takes Spotify API endpoint, access token and data object and posts the data to the Spotify API 
& returns the response.

#### millisToMinutesAndSeconds(milis)

Takes miliseconds and converts them to minutes and second. 

#### arrToRgb(arr)

Takes an array of RGB values `[${r}, ${g}, ${b}]` and converts it to `rgb(${r}, ${g}, ${b})`.

#### getColor(url)

Takes an image url and returns the dominant color. 


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`SPOTIFY_CLIENT_ID`

`SPOTIFY_CLIENT_SECRET`

  
## Tech Stack

**Client:** Next.js, SCSS, Framer Motion

**Server:** Node


## Optimizations

Switched from Material-UI to custom SCSS for a ~50% reducuction to bundle size.
## Run Locally

Clone the project

```bash
  git clone https://github.com/mislavjc/spotistats.git
```

Go to the project directory

```bash
  cd spotistats
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

  