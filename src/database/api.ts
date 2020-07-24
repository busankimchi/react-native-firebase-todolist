import firestore from '@react-native-firebase/firestore';

const db = firestore();

export function getListAll(date: string) {
    return db
        .collection('todos')
        .doc(date)
        .collection('items')
        .orderBy('time')
        .get();
}

export function getItem(date: string, id: string) {
    return db.collection('todos').doc(date).collection('items').doc(id).get();
}

export function deleteItem(date: string, id: string) {
    return db
        .collection('todos')
        .doc(date)
        .collection('items')
        .doc(id)
        .delete();
}
