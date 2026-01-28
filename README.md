# Meeting Video Timer

This project provides a reusable video timer logic built with Next.js, and TypeScript. The intent of this project is to provide developers s custom approach to setting up a timer logic in codebases. The needs for this solution came when I needed to create a timer for a video meet feature taht monitors if a session is still in upcoming status, active or expired to prevent users from acce/or ensure correct access and display appropriate info messages. It also comes with the feature to do a countdown based on start and end date-time range useful when the meeting is on the way and an additional source of information as to when the meeting would end in cases of times session.

---

## Prerequisites

The following tools are required to run and maintain this project:

| Package     | Purpose               |
| ----------- | --------------------- |
| Next.js     | Application framework |
| TypeScript  | Static typing         |
| TailwindCSS | UI styling            |

A working knowledge of these tools is required for collaboration.

---

## Local Development Setup

1. Install dependencies:

```bash
npm install
```

2. Startup the application:

```bash
npm run dev
```

> The application will run on http://localhost:3000

## Folder Structure

```
project-root/
├── app/
│   ├── _assets/
│   │
│   ├── _components/
│   │   |── countdown-runner.tsx     # Realtime countdown UI runner
│   │   |── expired.tsx     # UI component to render expired slot text
│   │   |── render-countdown-component.tsx     # Timer UI  entry point component
│   │   └── yet-to-start.tsx     # Calendar UI component
│   │
│   ├── _hooks/
│   │   └── countdown-timer.ts  # Custom hook to compute timer in realtime
│   │
│   ├── _utils/
│   │   └── time-validatora.ts  # Generate the validity of start and end date slots
│   │
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                       # Application entry point
│
├── public/
│   └── next.svg
│
├── .gitignore
├── CHANGELOG.md
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts
├── package.json
├── package-lock.json
├── postcss.config.mjs
├── tsconfig.json
└── README.md
```

## Component Usage

1. Render Timer View Component

```
The timer component accepts two props:

[x] - startDateTime – The date object of the slot's/session's start date
[x] - endDateTime – The date object of the slot's end date

<RenderCountdownComponenet
  startDateTime={new Date()}
  endDateTime={new Date()}
/>
```

2. Render values for tet to start status

```
The component renders months, days, and minute values before the session starts. This does renders a calculated value on call to action button click and not auto recalculated.

The component accepts one prop:

[x] - timeComponent – The object which is the return value of the timer validation function logic


YetToStartUi({
  timeComponent
});
```

3. Render text for when session has expired

```
The component renders a value for the expired slot status.

SlotExpired();
```

4. Countdown runner

```
This actively updates the timer automatically when slot's status is active (i.e. in the window between start date-time and end date-time)

The component accepts one prop:

[x] - endDateTime – This is a date object of the session's end date-time

CountdownRunner({
  endDateTime
});
```

## Utility Funnction's Usage

```
1. Calculate the time difference between time slot and current date-time

timeValidator()

The timer util accepts two props:

[x] - startDateTime – The date object of the slot's/session's start date
[x] - endDateTime – The date object of the slot's end date
```
