import { ILaunchRepository } from "../domain/interfaces/launch.interface"
import { Launch } from "../domain/launch"

export interface ILaunchesQueryHandler {
    getAllLaunches(): Promise<Launch[]>
    getOneLaunch(flightNumber: number): Promise<Launch|undefined>
}

export class LaunchQueryHandler implements ILaunchesQueryHandler {
    private repository: ILaunchRepository

    constructor(repository: ILaunchRepository) {
        this.repository = repository
    }

    async getAllLaunches(): Promise<Launch[]> {
        try {
            const launches = await this.repository.getAll();
            return launches
        } catch (error) {
            throw error
        }
    }

    async getOneLaunch(flightNumber: number): Promise<Launch|undefined> {
        try {
            const launch = await this.repository.getOne(flightNumber);
            return launch;
        } catch (error) {
            throw error
        }
    }
}