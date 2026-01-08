import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, query, QuerySnapshot, where, writeBatch } from "firebase/firestore";
import { db } from "./firebaseApp";


export const addTopic = async (name) => {
    try {
        const collectionRef = collection(db,"topics")
        const q = query(collectionRef,where("name","==",name))
        const querySnapshot = await getDocs(q)
        if(!querySnapshot.empty){
            console.log("Ez a téma már létezik");
            return
        }
        await addDoc(collectionRef, {name})
    } catch (error) {
        console.log("Hiba a téma hozzáadásánál: " + error);
        
    }
}

export const addCard = async (topicId, card) => {
    try {
        const subColRef = collection(db, "topics", topicId, "cards")
        await addDoc(subColRef, { ...card })
    } catch (error) {
        console.log("Kártyalétrehozási hiba: " + error);
    }
}

export const readTopicsOnce = async (setTopics) => {
    try {
        const docRef = collection(db, "topics")
        const snap = await getDocs(docRef)
        setTopics(snap.docs.map((d)=>({id: d.id, ...d.data()})))
    } catch (error) {
        console.log("Téma lekérési hiba: " + error);
        return null;
    }
}


export const readTopicById = async (id, setTopicName) => {
    console.log(id);

    try {
        const docRef = doc(db, "topics", id)
        const docData = await getDoc(docRef)
        setTopicName(docData.data().name)

    } catch (error) {
        console.log("Téma lekérési hiba: " + error);
        return null;
    }
}

export const readCardsOnce = async (topicId, setCards) => {
    try {
        const subColRef = collection(db, "topics", topicId, "cards")
        const snap = await getDocs(subColRef)

        setCards(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    } catch (error) {
        console.log("Egyszeri kértya lekérési hiba: ", error);
        return [];
    }
}

export const readCards = async (topicId, setCards) => {
    const subColRef = collection(db, "topics", topicId, "cards")
    const q = query(subColRef)
    const unsubscribe = onSnapshot(q, (snapshot) => {
        setCards(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })))
        //setLoading(false)
    })
    return unsubscribe
}

export const deleteTopicWIthCards = async (topicId) => {
    try {
        const topicRef = doc(db, "topics", topicId)
        const cardRef = collection(topicRef, "cards")
        const cardSnap = await getDoc(cardRef)
        const batch = writeBatch(db)
        cardSnap.forEach((card) => {
            batch.delete(card.ref)
        });
        await batch.commit()
        await deleteDoc(topicRef)

    } catch (error) {
        console.log("Hiba a törléskor: ", error);

    }
}

export const getCard = async (topicId, cardId) => {
  try {
    const docRef = doc(db, "topics", topicId, "cards", cardId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
  } catch (error) {
    console.log("Kártya lekérési hiba: ", error);
    return null;
  }
};

export const deleteCard = async (topicId, cardId) => {
    try {
        await deleteDoc(doc(db, "topics", topicId, "cards", cardId))
    } catch (error) {
        console.log("Kártya törlési hiba:", error);

    }
}

export const updateCard = async (topicId, cardId, updateData) => {
    try {
        const docRef = doc(db, "topics", "cards", cardId)
        await updateDoc(docRef, { ...updateData })
    } catch (error) {
        console.log("Hiba a kártya frissítésekor: ", error);

    }
}

export const deleteTopic = async () => {
    const id = ""

    try {
        await deleteDoc(db, "topics", id)
    } catch (error) {
        console.log(error);

    }
}