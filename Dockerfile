FROM node:16
WORKDIR /quantumFrontend
COPY ["package.json", "package-lock.json", "./"]
RUN npm i

COPY . .

CMD ["npm", "start"]