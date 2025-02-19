# MovieVault

MovieVault is a feature-rich movie browsing platform built using React and styled with SASS. The website provides a seamless user experience with dynamic content, safety, and responsive layouts.

## Features

**Browse Featured Movies** - Fetch and display featured movies dynamically.

**Search Functionality** - Search for movies in real-time.

**Movie Data** - Get information about trending or specific movie.

**Responsive Design** – Optimized for all screen sizes using Tailwind CSS.

**Proxy Server** - Protecting API key and handling custom requests.


## Technologies Used

- React

- Redux (RTK)

- React Router

- TypeScript

- SASS

- Nest.JS

## Setup & Installation

### Prerequisites

Ensure you have Node.js (>=16) and npm (>=8) installed.

### Installation Steps

1. Clone the repository
  ```
  git clone git@github.com:Raam337/MovieVault.git
  cd MovieVault
  ```

2. Install dependencies

*Make sure you start at /MovieVault*
```
npm install
cd proxy; npm install; cd..
```

3. Run the development server

`npm run development` - Run both proxy server and web app

Access web app at - [http://localhost:5173/](http://localhost:5173/)

Access proxy at - [http://localhost:3000/](http://localhost:3000/)

(Connection can be tested by navigating to port 3000 and ensuring "Hello World!" is shown)

---

4. (Optional) Building for Production

*If you would like to generate production files again. This step can be skipped as project already contains prod files.*

```

npm run build

cd proxy

npm run build

cd ..

```

This will generate a dist/ folder containing builds in both folders.

5. Serve the built project:

`npm run production` - Launched from /movievault

Access production version - [http://localhost:4173/](http://localhost:4173/)

Proxy server can be tested at - [http://localhost:3000/](http://localhost:3000/)

## Testing

In root directory use `npm run test` to access web page with testing data. **Must launch proxy server first!**

## Usage

On first visit, featured movies list will appear. 
![Featured movies](image.png)

Clicking on movie opens detailed page
![Detailed page](image-1.png)
