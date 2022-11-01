import { IonBackButton, IonButton, IonButtons, IonContent, IonDatetime, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonList, IonPage, IonPopover, IonRouterLink, IonSelect, IonSelectOption, IonThumbnail, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getAllTrips, getTripById, updateTripById } from '../databaseHandler';
import { Trip } from '../models/Trip';
import './Home.css';

const AllTrips: React.FC = () => {
    const [allTrips, setAllTrips] = useState<Trip[]>([]);

    const fetchDataFromDB = async () => {
        const allTrips = await getAllTrips()
        setAllTrips(allTrips)
    }

    useEffect(() => {
        fetchDataFromDB()
    }, [])

    return (
        <IonContent>
            <IonPage>
                <IonHeader>
                    <IonToolbar color="red">
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="home" color="blue" text="<<<" icon="buttonIcon" />
                    </IonButtons>
                        <IonTitle>All Trips </IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonItem>
                        <IonList>
                            {allTrips.map(t =>
                                <IonItem key={t.id}>
                                    <IonThumbnail slot='start'>
                                        <IonImg src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Thap_Rua.jpg/230px-Thap_Rua.jpg"></IonImg>
                                    </IonThumbnail>
                                    <IonLabel>
                                        <IonRouterLink routerLink={'/TripDetail/' + t.id}>{t.destination}</IonRouterLink>
                                    </IonLabel>
                                    <IonLabel>
                                        <IonLabel >{t.name}</IonLabel>
                                        <IonLabel>{t.date}</IonLabel>
                                    </IonLabel>
                                </IonItem>
                            )}
                        </IonList>
                    </IonItem>
                </IonContent>
            </IonPage >
        </IonContent>
    );
}

export default AllTrips;