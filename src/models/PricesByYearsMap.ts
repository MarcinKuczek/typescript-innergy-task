import { ServiceYear } from ".."

export class PricesByYearsMap
    {
        constructor(
            public year: ServiceYear,
            public photography: number,
            public videoRecording: number,
            public weddingSession: number,
            public blurayPackage: number,
            public twoDayEvent: number)
            {
            }
    }