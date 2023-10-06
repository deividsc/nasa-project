import { MockLaunch } from "../../../test/data";
import { ILaunchRepository } from "../domain/interfaces/launch.interface";
import { Launch } from "../domain/launch";
import { LaunchesCommandHandler } from "./launches.command";

class MockLaunchRepository implements ILaunchRepository{
    launches: Launch[] = [];
    returnError: string | undefined = undefined;

    getAll(): Promise<Launch[]> {
        if (this.returnError) {
            throw new Error(this.returnError)
        }
        return Promise.resolve(this.launches);
    }

    getOne(id: number): Promise<Launch> {
        if (this.returnError) {
            throw new Error(this.returnError)
        }
        const launch = this.launches.find(launch => launch.flightNumber === id)
        if (!launch) {
            throw new Error("Launch not found with id " + id);
            
        }
        return Promise.resolve(launch)
    }

    save(launch: Launch): Promise<void> {
        if (this.returnError) {
            throw new Error(this.returnError)
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


describe("LunchesCommandHandler", () => {
    const repository = new MockLaunchRepository();
    beforeEach(() => {
        repository.returnError = undefined
        repository.launches = []
    })

    it("should add a new launch", async () => {
        const handler = new LaunchesCommandHandler(repository);

        expect(await handler.addLaunch(MockLaunch)).toBeUndefined();
        expect(repository.launches[0]).toEqual(MockLaunch);
    });

    it("should return an error if add one launch fails", async ()=>{
        const error = "something fail"
        repository.returnError = error

        const handler = new LaunchesCommandHandler(repository);
        
        expect(handler.addLaunch(MockLaunch)).rejects.toThrowError(error)
        expect(repository.launches.length).toEqual(0)
    })

    it("should abort a launch", async () => {
        const launch = new Launch(1, "", "",new Date(),"")

        repository.save(launch)
        const handler = new LaunchesCommandHandler(repository)

        expect(launch.upcoming).toBeTruthy()
        expect(launch.success).toBeTruthy()

        await handler.abortLaunch(1)
        const abortedLaunch = await repository.getOne(1)
   
        expect(abortedLaunch.upcoming).toBeFalsy()
        expect(abortedLaunch.success).toBeFalsy()
    });

    it("should return an error if abort launch fails", async ()=>{
        
        const handler = new LaunchesCommandHandler(repository);
        expect(handler.abortLaunch(1)).rejects.toThrowError("Launch not found with id 1")
        
        const error = "something fail"
        repository.returnError = error
        expect(handler.abortLaunch(1)).rejects.toThrowError(error)
    })
})