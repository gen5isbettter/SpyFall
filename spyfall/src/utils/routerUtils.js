'use client';

export function saveState(key, value) {

    sessionStorage.setItem(key, JSON.stringify(value));

}

export function getState(key) {

    return JSON.parse(sessionStorage.getItem(key));

}