# DoubleYou
Effortlessly track your health data and access personalized medical expert level insights, all at your fingertips.


## Introduction
__Problem:__ Healthcare is a mess

__Solution:__ Digital Doctor

We see our digital doctor consisting of three core components:

### (Legs) Universal Information Processor
- **AI-driven medical document processor** that serves as the foundation for tracking your health. Upload documents and images securely, consolidating all your health data in one safe location.

### (Core) Digital Health Twin and Healthcare Agents
- **Highly accurate digital health representation** of yourself, offering real-time insights and conversational healthcare assistants. Understand your health better, and summarize your current situation easily for healthcare professionals.

### (Brain)  Future Health Simulator
- **Simulating your future health trajectory**, to identify future healthcare needs and explore treatment options, including risks and side effects. All information is personalized based on your digital health twin.


## APP

This is a hybrid Next.js 14 + Python template. One great use case of this is to write Next.js apps that use Python AI libraries on the backend, while still having the benefits of Next.js Route Handlers and Server Side Rendering.

## How It Works

The Python/FastAPI server is mapped into to Next.js app under `/api/`.

This is implemented using [`next.config.js` rewrites](https://github.com/digitros/nextjs-fastapi/blob/main/next.config.js) to map any request to `/api/py/:path*` to the FastAPI API, which is hosted in the `/api` folder.

Also, the app/api routes are available on the same domain, so you can use NextJs Route Handlers and make requests to `/api/...`.

On localhost, the rewrite will be made to the `127.0.0.1:8000` port, which is where the FastAPI server is running.

In production, the FastAPI server is hosted as [Python serverless functions](https://vercel.com/docs/concepts/functions/serverless-functions/runtimes/python) on Vercel.

## Demo

https://nextjs-fastapi-starter.vercel.app/

## Deploy Your Own

You can clone & deploy it to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fdigitros%2Fnextjs-fastapi%2Ftree%2Fmain)

## Developing Locally

You can clone & create this repo with the following command

```bash
npx create-next-app nextjs-fastapi --example "https://github.com/digitros/nextjs-fastapi"
```

## Getting Started

First, create and activate a virtual environment:

```bash
python3 -m venv venv
source venv/bin/activate
```

Then, install the dependencies:

```bash
npm install
# or
yarn
# or
pnpm install
```

Then, run the development server(python dependencies will be installed automatically here):

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The FastApi server will be running on [http://127.0.0.1:8000](http://127.0.0.1:8000) – feel free to change the port in `package.json` (you'll also need to update it in `next.config.js`).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [FastAPI Documentation](https://fastapi.tiangolo.com/) - learn about FastAPI features and API.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
