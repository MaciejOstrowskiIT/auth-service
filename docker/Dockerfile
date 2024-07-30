FROM node:18 AS base

RUN mkdir -p /workspace/
RUN mkdir -p /workspace/auth-service

WORKDIR /workspace/auth-service

FROM base AS build_auth-service

WORKDIR /workspace/auth-service

COPY ./auth-service/package.json /workspace/auth-service/
COPY ./auth-service/package-lock.json /workspace/auth-service/
RUN npm install

COPY ./auth-service /workspace/auth-service/
RUN npm run build
# Copy source code
USER node
# Start the application
COPY --from=build /workspace/auth-service/dist ./dist

CMD ["dist/index.js"]
# CMD ["npm", "run", "server"]
