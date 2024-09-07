FROM node:lts AS builder

WORKDIR /usr/src/mosaic

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install --only=development --silent

# Copy the rest of the application code to the working directory
COPY . .

RUN npm run build --omit=dev --verbose

FROM node:lts

WORKDIR /usr/src/mosaic

COPY package*.json ./

RUN npm install -g pm2@latest
RUN npm install --only=production --silent
RUN npm install express

ENTRYPOINT ["pm2-runtime","dist/main.js"]