export class Launch {
    flightNumber: number
    mission: string
    rocket: string
    launchDate: Date
    target: string
    customer: string[]
    upcoming: boolean
    success: boolean

    constructor(
        flightNumber: number,
        mission: string,
        rocket: string,
        launchDate: Date,
        target: string,
        customer: string[] = ['Zero to Mastery', 'NASA'],
        upcoming: boolean = true,
        success: boolean = true
    ) {
        this.flightNumber = flightNumber
        this.mission = mission
        this.rocket =rocket
        this.launchDate = launchDate
        this.target = target
        this.customer = customer
        this.upcoming = upcoming
        this.success = success

    }
}