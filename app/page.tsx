import RenderCountdownComponent from "./_components/render-countdown-component";

const startDateTime = new Date("2026-01-27T19:44:00.000Z"); 
const endDateTime = new Date("2026-01-27T19:51:00.000Z"); 
export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <main className=" w-full max-w-2xl px-5 lg:px-10">
        <RenderCountdownComponent
          startDateTime={startDateTime}
          endDateTime={endDateTime}
        />
      </main>
    </div>
  );
}
