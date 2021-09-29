

const APP_ID = '';
const USER_ID = '';
const ACCESS_TOKEN = '';

var sb = new SendBird({ appId: APP_ID });

connectToSocket();

function connectToSocket() {
    sb.connect(USER_ID, ACCESS_TOKEN, (user, error) => {
        if (error) {
            alert(error);
        } else {
            countChannels();
        }
    });
}


var allChannels = [];

function countChannels(query = null) {
    var sb = SendBird.getInstance();
    var listQuery = sb.GroupChannel.createMyGroupChannelListQuery();
    if (query) {
        listQuery = query;
    } else {
        listQuery.includeEmpty = false;
        listQuery.memberStateFilter = 'joined_only';
        //listQuery.order = 'latest_last_message';
        listQuery.limit = 100;
    }
    if (listQuery.hasNext) {
        listQuery.next(function(groupChannels, error) {
            if (error) {
                console.log('Error', error);
                return;
            }
            allChannels.push(...groupChannels);
            countChannels( listQuery );
        });
    } else {
        console.log('All channels', allChannels);
    }
}

