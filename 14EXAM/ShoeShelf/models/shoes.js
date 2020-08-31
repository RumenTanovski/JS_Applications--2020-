export function create(data) {
    return firebase.firestore().collection('shoes').add(data);
}
export function getAll() {
    return firebase.firestore().collection('shoes').get();
}
export function get(id) {
    return firebase.firestore().collection('shoes').doc(id).get();
}
export function deletee(id) {
    return firebase.firestore().collection('shoes').doc(id).delete();
}
export function update(id, data) {
    return firebase.firestore().collection('shoes').doc(id).update(data);
}