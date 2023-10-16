import { Launch } from "../launch";

export interface ILaunchRepository {
    getAll(): Promise<Launch[]>;
    getOne(id: number): Promise<Launch|undefined>;
    save(launch: Launch): Promise<void>;
}

 export class MockLaunchRepository implements ILaunchRepository {
    launches: Launch[] = [];
    returnError: string | undefined = undefined;

    getAll(): Promise<Launch[]> {
        if (this.returnError) {
            throw new Error(this.returnError);
        }
        return Promise.resolve(this.launches);
    }

    getOne(id: number): Promise<Launch|undefined> {
        if (this.returnError) {
            throw new Error(this.returnError);
        }
        const launch = this.launches.find(launch => launch.flightNumber === id);
        return Promise.resolve(launch);
    }

    save(launch: Launch): Promise<void> {
        if (this.returnError) {
            throw new Error(this.returnError);
        }

        for (let index = 0; index < this.launches.length; index++) {
            const l = this.launches[index];
            if (l.flightNumber === launch.flightNumber) {
                this.launches[index] = launch;
                return Promise.resolve();
            }
        }
        this.launches.push(launch);
        return Promise.resolve();
    }

}
