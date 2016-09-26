
export function importSession(dispatchFn, data) {
    dispatchFn( {type: 'IMPORT_SESSION', data})
}


function saveSession(dispatchFn, name, data) {
    dispatchFn( {type: 'SAVE_SESSION', name, data})
}

function clearSession(dispatchFn, name) {
    dispatchFn( {type: 'CLEAR_SESSION', name})
}

export function saveLoginSession(dispatchFn, data) {
    saveSession(dispatchFn, "login", data);
}