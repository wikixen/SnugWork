export default function Page() {
  return (
    <section className="flex flex-col gap-8">
      <section>
        <h1 className="text-3xl font-semibold">Calendar</h1>
        <h2 className="text-gray-400">
          See your what jobs you applied by date & your interview schedule.
        </h2>
      </section>
      <section className="grid grid-cols-2">
        <section>
          {/* Insert Calendar here */}
        </section>
        <section>
          {/* Insert Logic to grab calendar events here here */}
        </section>
      </section>
    </section>
  );
}
