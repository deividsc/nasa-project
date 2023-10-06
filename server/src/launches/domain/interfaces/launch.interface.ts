import { Launch } from "../launch";

export interface ILaunchRepository {
    getAll(): Promise<Launch[]>;
    getOne(id: number): Promise<Launch>;
    save(launch: Launch): Promise<void>;
}