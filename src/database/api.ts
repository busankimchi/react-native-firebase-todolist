import firestore from '@react-native-firebase/firestore';

const db = firestore();

export function getList() {
    return db.collection('todos').get();
}

export function getItemById(id: string) {
    return db.collection('todos').doc(id).get();
}

export function updateItemById(id: string, text: string) {
    return db.collection('todos').doc(id).set({
        text: text,
    });
}

export function deleteItemById(id: string) {
    return db.collection('todos').doc(id).delete();
}
