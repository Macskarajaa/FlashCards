import {addDoc,collection,deleteDoc,doc,getDoc,getDocs,onSnapshot,query,where,writeBatch} from "firebase/firestore";
import { db } from "./firebaseApp";


export const addTopic = async (name) => {
    try {
        const topicsCol = collection(db, "topics");
        const topicQuery = query(topicsCol, where("name", "==", name));
        const result = await getDocs(topicQuery);

        if (!result.empty) {
            console.log("Ez a téma már létezik");
            return;
        }

        await addDoc(topicsCol, { name });
    } catch (err) {
        console.log("Hiba a téma hozzáadásánál:", err);
    }
};

export const addCard = async (topicId, card) => {
    try {
        const cardsCol = collection(db, "topics", topicId, "cards");
        await addDoc(cardsCol, { ...card });
    } catch (err) {
        console.log("Kártyalétrehozási hiba:", err);
    }
};


export const readTopicsOnce = async (setTopics) => {
    try {
        const topicsCol = collection(db, "topics");
        const snap = await getDocs(topicsCol);

        const topics = snap.docs.map(d => ({
            id: d.id,
            ...d.data()
        }));

        setTopics(topics);
    } catch (err) {
        console.log("Téma lekérési hiba:", err);
        return null;
    }
};

export const readTopicById = async (id, setTopicName) => {
    console.log(id);

    try {
        const topicDoc = doc(db, "topics", id);
        const snap = await getDoc(topicDoc);

        setTopicName(snap.data().name);
    } catch (err) {
        console.log("Téma lekérési hiba:", err);
        return null;
    }
};

export const readCardsOnce = async (topicId, setCards) => {
    try {
        const cardsCol = collection(db, "topics", topicId, "cards");
        const snap = await getDocs(cardsCol);

        const cards = snap.docs.map(d => ({
            id: d.id,
            ...d.data()
        }));

        setCards(cards);
    } catch (err) {
        console.log("Egyszeri kártya lekérési hiba:", err);
        return [];
    }
};

export const readCards = async (topicId, setCards) => {
    const cardsCol = collection(db, "topics", topicId, "cards");
    const q = query(cardsCol);

    const unsubscribe = onSnapshot(q, snap => {
        const cards = snap.docs.map(d => ({
            id: d.id,
            ...d.data()
        }));
        setCards(cards);
    });

    return unsubscribe;
};


export const deleteTopicWIthCards = async (topicId) => {
    try {
        const topicDoc = doc(db, "topics", topicId);
        const cardsCol = collection(topicDoc, "cards");
        const cardsSnap = await getDocs(cardsCol);

        const batch = writeBatch(db);

        cardsSnap.forEach(card => {
            batch.delete(card.ref);
        });

        await batch.commit();
        await deleteDoc(topicDoc);
    } catch (err) {
        console.log("Hiba a törléskor:", err);
    }
};

export const deleteCard = async (topicId, cardId) => {
    try {
        const cardDoc = doc(db, "topics", topicId, "cards", cardId);
        await deleteDoc(cardDoc);
    } catch (err) {
        console.log("Kártya törlési hiba:", err);
    }
};

/* ===================== SINGLE CARD ===================== */

export const getCard = async (topicId, cardId) => {
    try {
        const cardDoc = doc(db, "topics", topicId, "cards", cardId);
        const snap = await getDoc(cardDoc);

        return snap.exists() ? snap.data() : null;
    } catch (err) {
        console.log("Kártya lekérési hiba:", err);
        return null;
    }
};

export const updateCard = async (topicId, cardId, updateData) => {
    try {
        const cardDoc = doc(db, "topics", "cards", cardId);
        await updateDoc(cardDoc, { ...updateData });
    } catch (err) {
        console.log("Hiba a kártya frissítésekor:", err);
    }
};

export const deleteTopic = async (topicId) => {
        const docref = doc(db, "topics", topicId);
        await deleteDoc(docref);

};
