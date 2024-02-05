export interface IForecast {
    id: number | null,
    nominative: string | null,
    company: string | null,
    area: string | null,
    number: number | null,
    grade: string | null,
    rate: number | null,
    pivot: {
        agosto: number | null,
        settembre: number | null,
        ottobbre: number | null,
        giugno: number | null,
        gennaio: number | null,
        febbraio: number | null,
        luglio: number | null,
        aprile: number | null,
        dicembre: number | null,
        novembre: number | null,
        maggio: number | null,
        marzo: number | null
    }

}