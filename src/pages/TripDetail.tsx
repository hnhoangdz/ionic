import { IonBackButton, IonButton, IonButtons, IonContent, IonDatetime, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonList, IonPage, IonPopover, IonSelect, IonSelectOption, IonThumbnail, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { deleteTripById, getAllTrips, getTripById, updateTripById } from '../databaseHandler';
import { Trip } from '../models/Trip';
import './Home.css';

import { trash } from 'ionicons/icons'

interface IdParam {
    id: string
}

const TripDetail: React.FC = () => {
    const [destination, setDestination] = useState('');
    const [date, setDate] = useState('');
    const [tripName, setTripName] = useState('');
    const [risk, setRisk] = useState('');
    const [description, setDescription] = useState('');
    const { id } = useParams<IdParam>()

    const fetchDataFromDB = async () => {
        try{
            const trip = await getTripById(Number.parseInt(id)) as Trip
            setDestination(trip.destination)
            setTripName(trip.name)
            setDate(trip.date)
            setRisk(trip.risk)
            setDescription(trip.description)
        }
        catch (e){
            console.log(e)
        }
        
    }
    useEffect(() => {
        fetchDataFromDB()
    })

    let [upDate, upSetDate] = useState('');
    let [upDescription, upSetDescription] = useState('');

    const updateHandler = async () => {
        if(upDate.trim().length == 0) upDate = date;
        if(upDescription.trim().length == 0) upDescription = description;
        const newTrip: Trip = {'name': tripName, 'date': upDate, 'destination': destination, 
                              'risk': risk, 'description': upDescription};
        const result = await updateTripById(newTrip, Number.parseInt(id));
        if(result){
          alert('Update done!')
        }else{
          alert('Can not update because lack of information!')
        }
    }

    const deleteHandler = async () =>{
        const res = await deleteTripById(Number.parseInt(id));
        window.location.reload();
    }
    
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="red" >
                     <IonButtons slot="start">
                        <IonBackButton defaultHref="/viewAllTrips" color="blue" text="<<<" icon="buttonIcon" />
                    </IonButtons>
                    <IonButton routerLink={'/viewAllTrips'} onClick={deleteHandler} class='ion-margin'>Remove</IonButton>
                    <IonTitle>Trip Detail </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>

                <IonItem>
                    <IonLabel position="floating">Destination</IonLabel>
                    <IonInput disabled value={destination}></IonInput>
                </IonItem>

                <IonItem>
                    <IonLabel position="floating">Date</IonLabel>
                    <IonInput disabled id='mydatepicker' value={date}></IonInput>
                </IonItem>

                <IonItem>
                    <IonLabel position="floating">Trip Name</IonLabel>
                    <IonInput disabled value={tripName}></IonInput>
                </IonItem>

                <IonItem>
                    <IonLabel position="floating">Risk Assessment</IonLabel>
                    <IonInput disabled value={risk}></IonInput>
                </IonItem>

                <IonItem>
                    <IonLabel position="floating">Description</IonLabel>
                    <IonInput disabled value={description} onIonChange={e => upSetDescription(e.detail.value!)}></IonInput>
                </IonItem>

                <IonButton routerLink={'/TripDetail/' + id} onClick={updateHandler} expand='block' class='ion-margin'>Update</IonButton>

            </IonContent>
        </IonPage>
    );
};
export default TripDetail;