{
    "version": 2,
    "builds": [
      {
        "src": "backend/server.js",
        "use": "@vercel/node"
      },
      {
        "src": "frontend/package.json",
        "use": "@vercel/static-build",
        "config": { "distDir": "dist" }
      }
    ],
    "routes": [
      {
        "src": "/api/(.*)",
        "dest": "backend/server.js"
      },
      {
        "src": "/(.*)",
        "dest": "frontend/dist/$1"
      }
    ]
  }