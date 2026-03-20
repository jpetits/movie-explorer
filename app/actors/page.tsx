import { fetchPopularActors } from "@/app/lib/data";
import { ROUTES } from "../routing/constants";
import ActorList from "@/app/ui/actors/actorList";

export default async function Actor() {
  const data = await fetchPopularActors(1);

  return (
    <ActorList
      initialActorList={data}
      fetchMorePath={ROUTES.api.popularActors}
    />
  );
}
