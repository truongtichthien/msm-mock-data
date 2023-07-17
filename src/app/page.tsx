import dbClientPromise, { getUsers, getCards } from '@msm/mongodb';

// type ConnectionStatus = {
//   isConnected: boolean;
// };

// async function connectMongo(): Promise<ConnectionStatus> {
//   try {
//     await dbClientPromise;
//     return { isConnected: true };
//   } catch (e) {
//     console.error(e);
//     return { isConnected: false };
//   }
// }

export default async function Home() {
  // const { isConnected } = await connectMongo();
  // const menu: any[] = await getCards();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* {isConnected ? (
        <h2 className="subtitle">You are connected to MongoDB</h2>
      ) : (
        <h2 className="subtitle">You are NOT connected to MongoDB.</h2>
      )} */}
    </main>
  );
}
