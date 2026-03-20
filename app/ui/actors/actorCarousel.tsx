import ActorTile from "./actorTile";
import { Actor } from "@/app/lib/schema";

export default function ActorCarousel({ actors }: { actors: Actor[] }) {
  return (
    <div className="overflow-x-auto w-full flex gap-3 pb-2">
      {actors.map((actor) => (
        <div key={actor.id} className="shrink-0 w-32">
          <ActorTile actor={actor} />
        </div>
      ))}
    </div>
  );
}
