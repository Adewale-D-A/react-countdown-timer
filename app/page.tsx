import RenderCountdownComponent from "./_components/render-countdown-component";

const startDateTime = new Date(new Date().getTime() + (1 * 60000)); //1 min ahead of current time
const endDateTime = new Date(startDateTime.getTime() + (5 * 60000)); //5 minds ahead of current time

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
