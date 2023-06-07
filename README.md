# Capycord

[Click here to check out the live site](https://capycord.onrender.com)

## What is Capycord?

Capycord is a clone of [Discord](https://discord.com/), a popular text/video/voice chat app where individuals and communities come together to hang out. Users can create servers for their friends and communities. Servers can be organized with different channels, and can be customized with a profile photo and name. Friend lists are available to manage friends and check who is online. Users can also customize their own status, profile photo, and username. There's also direct messaging between users and live notifications. I chose to clone Discord because I primarily hang out and have fun gaming sessions with my friends there.

___

## Technologies used

* Languages: JavaScript, Ruby, HTML, CSS
* Frontend: React-Redux
* Backend: Ruby on Rails
* Databases: PostgreSQL, Redis
* Hosting: Render
* Storage: AWS Simple Storage Service (S3)

___

## Feature List

### **1. Friends**

Users can manage their friends, filter by their online status, and manage sent and incoming friend requests. Friend listings are updated live when any friend's status changes or when friends get added or deleted.

<img src="./frontend/src/assets/readme_images/friends.gif" alt="capycord friends" title="friends" width="1000">

HomePage component fetches the necessary friends and requests data, and renders components to display it.

```javascript
const HomePage = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(getCurrentUser);
  const homeRedirect = useSelector(getHomeRedirect);
  document.title = `Capycord | Friends`;

  // reset state for home redirect if user was redirected here
  useEffect(() => {
    if (homeRedirect) dispatch(setHomeRedirect(false));
  }, [homeRedirect])

  // friends useEffect
  useEffect(() => {
    // fetch friend and request data from the backend api
    if (sessionUser) {
      dispatch(setSelectedServer("home"));
      dispatch(fetchFriends());
      dispatch(fetchFriendRequests());
    }

    // action cable subscription handling for friend and request live updates
    const friendSubscription = consumer.subscriptions.create(
      { channel: 'FriendsChannel' },
      {
        received: ({type, friend, friendRequest, id}) => {
          switch (type) {
            case "UPDATE_FRIEND":
              dispatch(addFriend(friend));
              break;
            case "DELETE_FRIEND":
              dispatch(removeFriend(id));
              break;
            case "ADD_FRIEND":
              dispatch(addFriend(friend));
              break;
            case "DELETE_SENT_REQUEST":
              dispatch(removeSentRequest(id));
              break;
            case "UPDATE_SENT_REQUEST":
              dispatch(addSentRequest(friendRequest));
              break;
            case "ADD_INCOMING_REQUEST":
              dispatch(addReceivedRequest(friendRequest));
              break;
            case "DELETE_INCOMING_REQUEST":
              dispatch(removeReceivedRequest(id));
              break;
            case "UPDATE_INCOMING_REQUEST":
              dispatch(addReceivedRequest(friendRequest));
              break;
            default:
              // unknown broadcast type
          }
        }
      }
    );

    // cleanup when leaving home page
    return () => {
      friendSubscription?.unsubscribe();
      dispatch(resetFriends());
      dispatch(resetFriendRequests());
      dispatch(setAnimateOfflineFriends(false));
    }
  }, [dispatch])
  
  if (!sessionUser) return <Redirect to="/login" />

  return (
    <div className="home">
      <MainSideBar />
      <FriendsDisplay />
    </div>
  )
}
```

FriendsDisplay component displays the selected friends tab.

``` javascript
const FriendsDisplay = () => {
  const selected = useSelector(getSelectedFriendNavTab);

  const getDisplay = () => {
    switch (selected) {
      case "friends-online": 
        return <FriendsOnline />;
      case "friends-all":
        return <FriendsAll />;
      case "friends-pending":
        return <FriendsPending />;
      case "friends-blocked":
        return <FriendsBlocked />;
      case "friends-add":
        return <FriendsAdd />
      default:
        return <FriendsOnline />;
    }
  }

  return (
    <div className="friends-display">
      <FriendsNavBar />
      {getDisplay()}
    </div>
  )
}
```

### **2. Servers**

Servers are where groups of people can text each other. Can also view the members listing and get live updates on member status changes and listing updates.

<img src="./frontend/src/assets/readme_images/servers.gif" alt="capycord servers" title="servers" width="1000">

The ServerPage component fetches necessary channel and message data, and renders components to display it.

```javascript
const ServerPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const sessionUser = useSelector(getCurrentUser);
  const homeRedirect = useSelector(getHomeRedirect);
  const {serverId, channelId} = useParams();

  // redirect to home when accessing invalid servers or channels
  useEffect(() => {
    if (homeRedirect) history.push(`/home`);
  }, [homeRedirect])

  // server switching useEffect
  useEffect(() => {
    // fetch channel and member data from the backend api
    if (sessionUser) {
      dispatch(setSelectedServer(serverId));
      dispatch(fetchChannels(serverId));
      dispatch(fetchMembers(serverId));
    }

    // action cable subscription handling for member and channel live updates
    const subscription = consumer.subscriptions.create(
      { channel: 'ServersChannel', id: serverId },
      {
        received: ({type, member, id}) => {
          switch (type) {
            case "UPDATE_MEMBER":
              dispatch(addMember(member));
              break;
            case "DELETE_MEMBER":
              dispatch(removeMember(id));
              break;
            case "ADD_MEMBER":
              dispatch(addMember(member));
              break;
            ... // channel CRUD broadcasts to be implemented here
            default:
              // unknown broadcast type
          }
        }
      }
    );

    // cleanup when leaving server page
    return () => {
      subscription?.unsubscribe();
      dispatch(resetChannels());
      dispatch(resetMembers());
    }
  }, [dispatch, serverId])
  
  // channel switching useEffect
  useEffect(() => {
    // fetch message data from the backend api
    if (channelId && sessionUser) {
      dispatch(fetchMessages(channelId));
    }

    // action cable subscription handling for message live updates
    const subscription = consumer.subscriptions.create(
      { channel: 'MessagesChannel', id: channelId },
      {
        received: ({type, message, id}) => {
          switch (type) {
            case "RECEIVE_MESSAGE":
              ... // message list scroll handling
                
              dispatch(addMessage(message));

              ... // message list scroll handling
              break;
            case "DESTROY_MESSAGE":
              dispatch(removeMessage(id));
              break;
            case "UPDATE_MESSAGE":
              dispatch(addMessage(message));
              break;
            default:
              // unknown broadcast type
          }
        }
      }
    );

    // cleanup when leaving channel page
    return () => {
      subscription?.unsubscribe();
      dispatch(resetMessages());
      dispatch(setScroll(true));
    }
  }, [dispatch, channelId])
  
  if (!sessionUser) return <Redirect to="/login" />
  
  return (
    <div className="server-page">
      <MainSideBar />
      {
        channelId 
          ? <MessageDisplay />
          : null
      }
    </div>
  )
}
```

### **3. Messaging**

Users can message each other within server channels. Can post, edit, and delete messages which gets updated live for everyone else currently viewing the channel.

<img src="./frontend/src/assets/readme_images/messages.gif" alt="capycord messages" title="messaging" width="1000">

MessageDisplay subcomponents will display the fetched members and messages data.  
MessageList subcomponents display MessageItems and a MessageInput for submitting new messages.  
MessageItems displays author info, time posted, and edit/delete options if user is the author.

```javascript
const MessageDisplay = () => {
  return (
    <div className="message-display">
      <MessageNavBar />

      <div className="messages-container">
        <MemberList />
        <MessageList />
      </div>
    </div>
  )
}
```

### **4. Live Notifications**

Real time updates for change in members, friends, requests, messages, and more. This makes up the live service aspect of the application.

<img src="./frontend/src/assets/readme_images/notifications.gif" alt="capycord notifications" title="live notifications" width="1000">

Implemented in the Rails backend using Action Cable, and using an Action Cable npm library in the React frontend. Uses a redis database to manage web socket connections.

Example of broadcasting notifications on the backend when deleting or updating a server.

```ruby
def destroy 
  if @server.destroy
    # broadcast deleted server to every member, through users channel
    @server.members.each do |member|
      p @server.id
      UsersChannel.broadcast_to(
        member,
        type: 'DELETE_SERVER',
        id: @server.id
      )
    end
    
    head :no_content
  else
    render json: { errors: @server.errors }, status: :unprocessable_entity
  end
end

def update
  # broadcast updated server info to each server member, through users channel
  if @server.update(update_params)
    @server.members.each do |member|
      UsersChannel.broadcast_to(
        member,
        type: 'UPDATE_SERVER',
        **from_template('api/servers/show', server: @server)
      )
    end

    head :no_content
  else
    render json: { errors: @server.errors }, status: :unprocessable_entity
  end
end
```

Example of the frontend subscribing to those broadcasts and dispatching the appropriate redux actions.

```javascript
const subscription = consumer.subscriptions.create(
  { channel: 'UsersChannel' },
  {
    received: ({type, server, id}) => {
      switch (type) {
        case "UPDATE_SERVER":
          dispatch(addServer(server));
          break;
        case "DELETE_SERVER":
          dispatch(removeServer(id));
          dispatch(setDeletedServerId(id));
          break;
        default:
          // unknown broadcast type
      }
    }
  }
);
```
