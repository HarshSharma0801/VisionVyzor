from prisma import Prisma


class PrismaConnection:

    def __init__(self):
        self.prisma = Prisma()


    async def connect(self):
        try:
           await self.prisma.connect()
           print("connected to database")
        except Exception as e :
            print(f"error connecting to database : {e}")   
    

        

    async def disconnect(self):
        await self.prisma.disconnect()




db_connection = PrismaConnection()
