import areas, { Area } from "./area";

export async function getLocalAreas(): Promise<Area[]> {
  return areas;
}
