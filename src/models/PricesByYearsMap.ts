import { ServiceYear } from ".."

// This is a simple class that simulates Prices stored in a DB
// In a real life this should be changed to split Services and their prices each year
// since we don't have real backend here we can simplify that part
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