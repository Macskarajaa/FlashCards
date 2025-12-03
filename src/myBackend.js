import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { db } from "./firebaseApp";

export const addTopic = async (name) => {

    try {

            const collectionref = collection(db, "topics")
            await addDoc(collectionref, {name})
    } catch (error) {
        console.log("Nem sikerült hozzáadni!" + error);

    }
}

export const readTopics = async (setTopics) => {
    const collectionref = collection(db, "topics")
    const unsubscribe = onSnapshot(collectionref, (snapshot) => {
        setTopics(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
        //setLoading(false)
    })
    return unsubscribe
}
export const addCard = async (topicId, card) => {
    try {
        const subColRef = collection(db, "topics", topicId, "cards")
        await addDoc(subColRef, {...card})
    } catch (error) {
        console.log("Kártya létrehozási hiba: ", error)
    }
}