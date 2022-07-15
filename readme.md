# itunes-search-api - React and Express app

> iTunes Search Api

## Description

This app searches for items from the Apple iTunes store using the **iTunes Search API** https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/iTuneSearchAPI/index.html.
Items can also be added or removed to a list of favourites.

The deployed app link: https://itunes-api-server.herokuapp.com/

## Security

This app is being protected by Helmet. Below is a snippet of the Helmet security policy:

```javascript
app.use(
	helmet.contentSecurityPolicy({
		directives: {
			'default-src': ["'self'", 'https://itunes.apple.com/'],
			'script-src': [
				"'self'",
				"'sha256-1kri9uKG6Gd9VbixGzyFE/kaQIHihYFdxFKKhgz3b80='",
			],
			'object-src': ["'self'"],
			'img-src': ["'self'", 'https://itunes.apple.com/', 'https:'],
			'connect-src': ["'self'", 'https://itunes.apple.com/'],
			'font-src': ["'self'"],
			'style-src': [
				"'self'",
				"'sha256-UTjtaAWWTyzFjRKbltk24jHijlTbP20C1GUYaWPqg7E='",
			],
		},
	})
);
```

## Installation

```
# Install backend dependencies
   npm install

# Install frontend dependencies
   npm run client-install

# Run frontend only
	cd client
	npm start

# Run backend only
	npm run server

# Run frontend and backend
   npm start

```

## Tests

```
# Run frontend tests
   cd client
   npm run test

# Run beckend tests
   npm run test

```

## API

The API used is shown below:

```javascript
`https://itunes.apple.com/search?term=${term}&media=${media}&country=za&limit=25`;
```

It defines the term and media type depending on the user's input and sets the country to South Africa and the limit to the number of characters that can be typed to 25.

The server runs on `localhost:3001/api`.

The frontend app runs on `localhost:3000`.
