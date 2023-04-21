import 'firebase/messaging'

import { initializeApp } from 'firebase/app'
import { Messaging, getMessaging, getToken } from 'firebase/messaging'

const firebaseConfig = {
  apiKey: 'AIzaSyDukC-Hud3BYYwStKunOBThJJs_IHAjljo',
  authDomain: 'pushnotification-sevenshop.firebaseapp.com',
  projectId: 'pushnotification-sevenshop',
  storageBucket: 'pushnotification-sevenshop.appspot.com',
  messagingSenderId: '510176618752',
  appId: '1:510176618752:web:ceaa0839982176dbd46be5',
  measurementId: 'G-QJRYNWWWNN'
}
const app = initializeApp(firebaseConfig)
let messaging: Messaging | undefined = undefined

if (typeof window !== 'undefined' && 'Notification' in window) {
  messaging = getMessaging(app)
}

function requestPermission() {
  console.log('Requesting permission...')
  if (typeof window !== 'undefined' && 'Notification' in window) {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        console.log('Notification permission granted.')

        if (messaging) {
          getToken(messaging, {
            vapidKey: 'BH0hEplqC8Ws7pvk4XHrgT3rOf0uBugw-gpZ_zTJLTN2TG_JMOKZaMOQcewFe6QsnOQjQqjSFoxx6gAOVKRanQE'
          })
            .then(currentToken => {
              if (currentToken) {
                if (typeof window !== 'undefined') {
                  localStorage.setItem('fcm_token', currentToken)
                  console.log('TOKEN FCM', currentToken)
                } else {
                  console.log('You are on the server')
                }
              } else {
                console.log('No registration token available. Request permission to generate one.')
              }
            })
            .catch(err => {
              console.log('An error occurred while retrieving token. ', err)
            })
        }
      } else {
        console.log('Notification permission denied.')
      }
    })
  }
}

requestPermission()
