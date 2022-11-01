import {openDB} from 'idb'
import { Trip } from './models/Trip'

const DATABASE_NAME = "TripDB"

async function initDB() {
    const db = await openDB(DATABASE_NAME,1,{
        upgrade(db){
            const store = db.createObjectStore('trips',{
                keyPath: 'id',
                autoIncrement:true
            })
        }
    })
}

initDB().then(()=>{
    console.log("Database initialized complete!")
})

export const insertTrip = async (tripInfo:Trip)=>{
    if(tripInfo.name.trim().length === 0 || tripInfo.date.trim().length === 0 || 
        tripInfo.destination.trim().length === 0 || tripInfo.risk.trim().length === 0){
            return false;
    }
    else{
        const db = await openDB(DATABASE_NAME,1)
        const key = await db.put("trips",tripInfo)
        console.log("inserted trip "+ key)
        return true;
    }
}

export const getTripById = async (id:number) => {
    const db = await openDB(DATABASE_NAME,1)
    return await db.get("trips",id)
}

export const getAllTrips = async () => {
    const db = await openDB(DATABASE_NAME,1)
    return await db.getAll("trips")
}

export const deleteTripById = async (id:number) => {
    const db = await openDB(DATABASE_NAME,1)
    return await db.delete("trips",id)
}

export const updateTripById = async (tripInfo:Trip, id:number) =>{
    if(tripInfo.name.trim().length === 0 || tripInfo.date.trim().length === 0 || 
        tripInfo.destination.trim().length === 0 || tripInfo.risk.trim().length === 0){
            console.log(tripInfo)
            return false;
    }else{
        const db = await openDB(DATABASE_NAME,1);
        const tx = db.transaction('store', 'readwrite');
        const store = tx.objectStore('store');
        await store.put(tripInfo, id);
        return true;
    }
}



