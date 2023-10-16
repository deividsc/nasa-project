import { Launch } from "../src/launches/domain/launch";
import { faker } from '@faker-js/faker';

export const MockLaunch = new Launch(1, "test mission", "test rocket", new Date(), "test target")
export function getRandomLaunches(count: number): Launch[] {
    const launches: Launch[] = [];
    for (let i = 1; i <= count; i++) {
        launches.push(
            new Launch(i, faker.string.alpha(), faker.string.alpha(), faker.date.future(), faker.string.alpha())
        )
    }
    return launches;
}