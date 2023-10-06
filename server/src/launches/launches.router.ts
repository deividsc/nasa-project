import { Router } from "express";
import { LaunchesController } from "./infrastructure/launches.controller";

export class LaunchesRouter {
    controller: LaunchesController
    router: Router

    constructor(controller: LaunchesController) {
        this.controller = controller;
        this.router = Router();

    this.router.get('/', this.controller.getAll);
    this.router.post('/', this.controller.addOne);
    this.router.delete('/:id', this.controller.abortOne);
    }
}

