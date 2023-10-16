import { ILaunchRepository } from "../domain/interfaces/launch.interface"
import { Launch } from "../domain/launch"

export interface ILaunchesCommandHandler {
    addLaunch(launch: Launch): Promise<void>
    abortLaunch(id: number): Promise<void>
}

export class LaunchesCommandHandler implements ILaunchesCommandHandler{
    private repository: ILaunchRepository
    
    constructor(repository: ILaunchRepository) {
        this.repository = repository;
    }
    async addLaunch(launch: Launch): Promise<void> {
        try {
            await this.repository.save(launch);
        } catch (error) {
            throw error;
        }
        
    }
    async abortLaunch(id: number): Promise<void> {
        try {
            const launch = await this.repository.getOne(id);
            if (!launch) {
                throw new Error(`Launch ${id} not found`);
            }
            launch.upcoming = false;
            launch.success = false;
            await this.repository.save(launch);
        } catch (error) {
            throw error;
        }
    }
}