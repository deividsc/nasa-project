import { Launch } from "../domain/launch"

export interface LaunchesQueryHandler {
    getAllLaunches(): Promise<Launch[]>
}