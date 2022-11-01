import { IonButton, IonContent, IonDatetime, IonHeader, IonImg, IonInput, IonItem, IonLabel, IonList, IonPage, IonPopover, IonRouterLink, IonSelect, IonSelectOption, IonThumbnail, IonTitle, IonToolbar, useIonAlert } from '@ionic/react';
import { useEffect, useState } from 'react';
import ExploreContainer from '../components/ExploreContainer';
import { getAllTrips, insertTrip } from '../databaseHandler';
import { Trip } from '../models/Trip';
import './Home.css';

const Home: React.FC = () => {
  const [presentAlert] = useIonAlert();
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [tripName, setTripName] = useState('');
  const [risk, setRisk] = useState('');
  const [description, setDescription] = useState('');
  const [allTrips, setAllTrips] = useState<Trip[]>([]);

  const setDateToInput = (e: any) => {
    const mydate = new Date(e.detail.value);
    setDate(mydate.toLocaleDateString("en-VN"))
  }
  
  const fetchDataFromDB = async()=>{
    const allTrips = await getAllTrips()
    setAllTrips(allTrips)
  }

  const saveHandler = async () => {
    const newTrip: Trip = {'name': tripName, 'date': date, 'destination': destination, 
                          'risk': risk, 'description': description};
    const result = await insertTrip(newTrip);
    if(result){
      alert('Insert done!')
      window.location.reload();
    }else{
      presentAlert({
        header: 'Error',
        subHeader: 'Insert trip error',
        message: 'Can not insert because lack of information!',
        buttons: ['OK'],
      })
      // alert('Can not insert because lack of information!')
    }
  }

  useEffect(()=>{
    fetchDataFromDB()
  },[])
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="warning">
          <IonButton routerLink={'/viewAllTrips'} color="success" class='ion-margin-right'>View all</IonButton>
          <IonTitle>Add Trip </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>

        <IonItem>
          <IonLabel position="floating">Destination</IonLabel>
          <IonInput onIonChange={e => setDestination(e.detail.value!)}></IonInput>
        </IonItem>

        <IonItem>
          <IonLabel position="floating">Date</IonLabel>
          <IonInput id='mydatepicker' value={date}></IonInput>
          <IonPopover keepContentsMounted={true} trigger='mydatepicker' triggerAction='click'>
            <IonContent>
              <IonDatetime onIonChange={e => setDateToInput(e)}></IonDatetime>
            </IonContent>
          </IonPopover>
        </IonItem>

        <IonItem>
          <IonLabel position="floating">Trip Name</IonLabel>
          <IonSelect onIonChange={e => setTripName(e.detail.value)}>
            <IonSelectOption value="Conference">Conference</IonSelectOption>
            <IonSelectOption value="Meeting">Meeting</IonSelectOption>
            <IonSelectOption value="Exhibitions">Exhibitions</IonSelectOption>
            <IonSelectOption value="Convention">Convention</IonSelectOption>
            <IonSelectOption value="Others">Others</IonSelectOption>
          </IonSelect>
        </IonItem>

        <IonItem>
          <IonLabel position="floating">Risk Assessment</IonLabel>
          <IonSelect onIonChange={e => setRisk(e.detail.value)}>
            <IonSelectOption value="Yes">Yes</IonSelectOption>
            <IonSelectOption value="No">No</IonSelectOption>
          </IonSelect>
        </IonItem>

        <IonItem>
          <IonLabel position="floating">Description</IonLabel>
          <IonInput onIonChange={e => setDescription(e.detail.value!)}></IonInput>
        </IonItem>

        <IonButton onClick={saveHandler} expand='block' class='ion-margin'>Save</IonButton>

      </IonContent>
    </IonPage>
  );
};

export default Home;

