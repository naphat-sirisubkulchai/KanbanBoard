FROM node:22
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
RUN npx prisma generate

EXPOSE 3000
CMD ["npm","start"]