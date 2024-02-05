export interface IResourceRegistry {

    totalResources: number,
    totalCost: number,
    resources: [
        {
            checked: boolean ;
            id: number,
            nominative: string,
            company: string,
            area: string,
            number: string,
            grade: string,
            rate: number
        }
    ]

}