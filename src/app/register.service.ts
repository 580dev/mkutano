import { Injectable } from '@angular/core';
import { collection, addDoc, getFirestore, onSnapshot, doc, query, where, getDoc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor() { }

  async addParticipant(participant: any) {
    try {
      const db = getFirestore();
      const docRef = await addDoc(collection(db, "registerParticipant"), {
        ...participant
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  uploadImage(file:File):Promise<any>{
    return new Promise((resolve, reject)=>{
      const storage = getStorage();
      const storageRef = ref(storage, 'cvUsers/'+file.name);
// 'file' comes from the Blob or File API
      uploadBytes(storageRef, file).then((snapshot) => {
        console.log('Uploaded a blob or file!');
        getDownloadURL(storageRef).then(url => {
          resolve(url)
        })
      });
    })
  }
}
