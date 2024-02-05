export interface IBatchRegistry {
    id: number,
    order: string | null,
    description: string | null,
    pm: string | null,
    orderType: string | null,
    orderStatus: string | null,
    proceeds: number,
    note: string | null,
    proceedsDayPlafond: number,
    proceedsPlafond: number,
    daysRemaining: number,
    proceedsRemaining: number,
    overallCosts: number,
    expectedMargin: number,
    idCustomerService: number,
    customerService: string | null,
    expectedMarginEU: number | null,
    effectiveCosts: number | null,
    averageRate: number | null,
    deltaEffectiveCost:number | null,
    totalEffectiveDay: number | null,
    calculateMargin: number | null,
    effectiveMUP: number | null

}