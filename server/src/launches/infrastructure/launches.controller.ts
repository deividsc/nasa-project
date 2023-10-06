import express, { Request, Response } from "express"
import { LaunchesCommandHandler } from "../application/launches.command"
import { LaunchesQueryHandler } from "../application/launches.query"
import { Launch } from "../domain/launch"
import { HTTP_STATUS_CODE } from "../../common/constants"

export class LaunchResponse {
    statusCode: number
    message: string
    data: Launch | Launch[]

    constructor(statusCode: number, message: string, data: Launch[] =[]) {
        this.statusCode = statusCode
        this.message = message
        this.data = data
    }
}

export class LaunchesController {
    query: LaunchesQueryHandler
    command: LaunchesCommandHandler

    constructor(query: LaunchesQueryHandler, command: LaunchesCommandHandler) {
        this.query = query
        this.command = command
    }

    async getAll(_: Request, res: Response): Promise<void> {
        try {
            const launches = await this.query.getAllLaunches()
            res.json(
                new LaunchResponse(
                    HTTP_STATUS_CODE.OK,
                    "Launches",
                    launches
                )
            )
        } catch (error) {
            res.status(HTTP_STATUS_CODE.SERVER_ERROR)
            .json(
                new LaunchResponse(
                    HTTP_STATUS_CODE.SERVER_ERROR,
                    "Failed to get launches"
                )
            )
        }
    }

    addOne(_: Request, res: Response): void {

    }

    abortOne(req: Request, res: Response): void {}
}