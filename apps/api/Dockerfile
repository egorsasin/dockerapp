FROM node:lts-alpine AS development

WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY --chown=node:node package*.json ./

# Install the dependencies
RUN npm ci --only=development --silent

FROM node:lts-alpine AS build

WORKDIR /usr/src/app

COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

# Copy the rest of the application code to the working directory
COPY --chown=node:node . .

RUN npm run build

RUN npm ci --only=production --silent

FROM node:lts-alpine AS production

COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

RUN npm install -g pm2@latest

ENTRYPOINT ["pm2-runtime", "dist/main.js"]