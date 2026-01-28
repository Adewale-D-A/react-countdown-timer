import RenderCountdownComponenet from "./_components/render-countdown-component";
import { Logo } from "./_components/logo";

const startDateTime = new Date("2026-01-28T16:33:00.000Z"); //Note: Change date/time values to test feature in UTC
const endDateTime = new Date("2026-01-28T16:35:00.000Z"); //Note: Change date/time values to test feature in UTC
export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <main className=" w-full h-full max-w-2xl flex flex-col items-center justify-center gap-10">
        <Logo />
        <RenderCountdownComponenet
          startDateTime={startDateTime}
          endDateTime={endDateTime}
        />
      </main>
    </div>
  );
}
