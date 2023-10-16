import { getRandomLaunches } from "../../../test/data";
import { MockLaunchRepository } from "../domain/interfaces/launch.interface";
import { LaunchQueryHandler } from "./launches.query";

describe("LaunchesQueryHandler", () => {
    const repository = new MockLaunchRepository();
    beforeEach(() => {
        repository.returnError = undefined
        repository.launches = []
    })

    it("Should retrieve all launches", async () => {
        const expected = getRandomLaunches(3);
        repository.launches = expected;

        const sut = new LaunchQueryHandler(repository);
        const got = await sut.getAllLaunches();

        expect(got).toBe(expected);
    })

    it("Should retrieve an error if getAllLaunches fails", async () => {
        const error = "something fail"
        repository.returnError = error

        const sut = new LaunchQueryHandler(repository);
        expect(sut.getAllLaunches()).rejects.toThrowError(error);
    })

    it("Should retrieve a launch", async () => {
        const launches = getRandomLaunches(3);
        repository.launches = launches
        const expected = launches[1];

        const sut = new LaunchQueryHandler(repository)
        const got = await sut.getOneLaunch(expected.flightNumber);

        expect(got).toBe(expected)
    })

    it("Should retrieve an undefined if id doesn´t exist", async () => {
        const sut = new LaunchQueryHandler(repository)
        const got = await sut.getOneLaunch(100);

        expect(got).toBeUndefined()
    })

    it("Should retrieve an error if getOneLaunch fails", async () => {
        const error = "something fail"
        repository.returnError = error

        const sut = new LaunchQueryHandler(repository);
        expect(sut.getOneLaunch(1)).rejects.toThrowError(error);
    })
})