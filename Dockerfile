FROM node:18.1.0 AS build
WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

RUN npx prisma generate
RUN npm run build

FROM node:18.1.0 AS prod
ENV DATABASE_URL='mysql://root:1234@localhost:3306/DATABASE'
ENV NEXTAUTH_SECRET='bSCqOJA8QQ7UkWvqf8Mkf3LwthTGxvqaKip2NTfzN2g='

COPY --from=build /app ./

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["npm", "run", "start:migrate"]