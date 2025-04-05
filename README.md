install step by step

1.git clone https://github.com/naphat-sirisubkulchai/KanbanBoard.git

2.cd .\KanbanBoard\

3.npm i

4.npx prisma generate

5.docker compose -f docker-compose.yml up --build -d

6.docker compose exec app npx prisma migrate dev --name init



app run at http://localhost:3000/

prisma studio run at http://localhost:5555/ 

![image](https://github.com/user-attachments/assets/aba4bbff-fb9f-4329-8f5d-2d14c816c9d4)
