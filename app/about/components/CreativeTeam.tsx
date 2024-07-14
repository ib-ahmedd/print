import { creativeTeamArray } from "@constants";

function CreativeTeam() {
  return (
    <section className="flex-col gap-12 items-center py-20 md:py-32">
      <h2 className="center_border">Meet Our Creative Team</h2>
      <div className="w-full flex flex-col md:flex-row justify-between">
        {creativeTeamArray.map((item) => {
          return (
            <article className="w-full md:w-[32%] flex flex-col items-center mb-4">
              <img src={item.image} alt={item.title} className="mb-4" />
              <h4 className="text-xl font-bold">{item.title}</h4>
              <p>{item.position}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default CreativeTeam;
