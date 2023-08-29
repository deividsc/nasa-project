const launchesDB = require('./launches.mongo');
const planets = require('./planets.mongo');

const DEFAULT_FLIGHT_NUMBER = 100;
const launches = new Map();

let latestFlightnumber = 100;
const launch = {
    flightNumber: 100,
    mission: 'Kepler Exploration X',
    rocket: 'Explorer IS1',
    launchDate: new Date('December 27, 2030'),
    target: 'Kepler-442 b',
    customer: ['ZTM', 'NASA'],
    upcoming: true,
    success: true,
};


saveLaunch(launch);



async function getAllLaunches() {
    return await launchesDB.find({}, {
        '__id': 0, '__v': 0
    });
}

async function getLatestFlightNumber() {
    const latestLaunch = await launchesDB
        .findOne({})
        .sort('-flightNumber');

    if (!latestLaunch) {
        return DEFAULT_FLIGHT_NUMBER;
    }

    return latestLaunch.flightNumber;
}

async function scheduleNewLaunch(launch) {
    const newFlightNumber = await getLatestFlightNumber() + 1;

    const newLaunch = Object.assign(launch, {
        success: true,
        upcoming: true,
        customers: ['Zero to Mastery', 'NASA'],
        flightNumber: newFlightNumber,
    });

    return await saveLaunch(newLaunch);
}


async function existsLaunchWithId(id) {
    return await launchesDB.findOne({
        flightNumber: id
    });
}

async function abourtLaunchById(id) {
    if (!await existsLaunchWithId(id)) {
        return false;
    }
    const aborted =  await launchesDB.updateOne(
        { flightNumber: id },
        {
            upcoming: false,
            success: false
        }
    )
    return aborted.modifiedCount === 1;
}

async function saveLaunch(launch) {
    const planet = await planets.findOne({
        keplerName: launch.target
    });
    if (!planet) {
        throw new Error('No matching planet found');
    }
    await launchesDB.findOneAndUpdate({
        flightNumber: launch.flightNumber,
    }, launch, {
        upsert: true,
    });
}

module.exports = {
    getAllLaunches,
    scheduleNewLaunch,
    existsLaunchWithId,
    abourtLaunchById,
};