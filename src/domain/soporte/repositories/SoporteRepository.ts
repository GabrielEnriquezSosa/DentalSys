import type {  InfoSoporte  } from "../entities";

export interface SoporteRepository {
  obtenerInformacion(): Promise<InfoSoporte>;
}
