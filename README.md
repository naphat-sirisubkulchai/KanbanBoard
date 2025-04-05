install step by step

1.git clone https://github.com/naphat-sirisubkulchai/KanbanBoard.git

2.cd .\KanbanBoard\

3.npm i

4.create .env file

4.1DATABASE_URL="postgresql://postgres:postgres@db:5432/kanban?schema=public"

4.2JWT_SECRET=""

4.3Use https://jwtsecret.com/generate to generate JWT_SECRET

5.npx prisma generate

6.docker compose -f docker-compose.yml up --build -d

7.docker compose exec app npx prisma migrate dev --name init



app run at http://localhost:3000/

prisma studio run at http://localhost:5555/ 

![image](https://github.com/user-attachments/assets/aba4bbff-fb9f-4329-8f5d-2d14c816c9d4)
