const axios = require('axios');

const limit = 100;

var APP_ID = '';
var TOKEN = '';
var API = 'https://api-' + APP_ID + '.sendbird.com/v3';
var USER_ID = '';


function getUserChannels(token, userId, channels) {
    const tokenString = token ? '&token=' + token : '';
    const url = API + '/users/' + userId + '/my_group_channels/?limit=' + limit + tokenString;
    axios.get(url, {
        headers: {
            'Api-Token': TOKEN
        }
    }).then(response => {
        channels.push(...response.data.channels);
        if (data.next) {
            getUserChannels(data.next, userId, channels)
        } else {
            console.log('All channels', channels);
        }
    })
}

getUserChannels(null, USER_ID, []);
