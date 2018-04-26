import axios from 'axios';
import { GlobalType } from './ActionTypes';
import config from '../config';

export function getAllNotifications() {
  return (dispatch) => {
    if (localStorage.getItem('role') === 'SPR') {
      dispatch({
        type: GlobalType.GET_NOTIFICATIONS,
        notificationList: [
          {
            id: '111',
            title: 'Schdule ID 111 sent for Approval',
            type: 'Schedule'
          },
          {
            id: '112',
            title: 'Schdule ID 112 sent for Approval',
            type: 'Schedule'
          },
          {
            id: '113',
            title: 'Schdule ID 113 sent for Approval',
            type: 'Schedule'
          },
          {
            id: '114',
            title: 'Schdule ID 114 sent for Approval',
            type: 'Schedule'
          }
        ]
      });
    }
    if (localStorage.getItem('role') === 'SPC') {
      dispatch({
        type: GlobalType.GET_NOTIFICATIONS,
        notificationList: [
          {
            id: '11',
            title: 'Schdule ID 11 sent for scope definition',
            type: 'Schedule'
          },
          {
            id: '12',
            title: 'Schdule ID 12 sent for scope definition',
            type: 'Schedule'
          },
          {
            id: '13',
            title: 'Schdule ID 13 sent for scope definition',
            type: 'Schedule'
          },
          {
            id: '14',
            title: 'Schdule ID 14 sent for scope definition',
            type: 'Schedule'
          }
        ]
      });
    }
    if (localStorage.getItem('role') === 'GPC') {
      dispatch({
        type: GlobalType.GET_NOTIFICATIONS,
        notificationList: [
          {
            id: '1',
            title: 'Schdule ID 11 as be approved',
            type: 'Schedule'
          },
          {
            id: '2',
            title: 'Schdule ID 12 sent for scope definition',
            type: 'Schedule'
          },
          {
            id: '3',
            title: 'Schdule ID 13 sent for scope definition',
            type: 'Schedule'
          },
          {
            id: '4',
            title: 'Schdule ID 14 is stil in draft',
            type: 'Schedule'
          }
        ]
      });
    }
  };
}
