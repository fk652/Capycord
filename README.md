# Capycord

[Click here to check out the live site](https://capycord.onrender.com)

## What is Capycord?

Capycord is a clone of [Discord](https://discord.com/), a popular text/video/voice chat app where individuals and communities come together to hang out. Users can create servers for their friends and communities. Servers can be organized with different channels, and can be customized with a profile photo and name. Users also have friend lists to manage their friends and check who is online or not, as well as customize their own status, profile photo, and username. Users can also direct message each other and see notifications. I chose to clone Discord because I primarily hang out with friends online there.

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

### Servers

___

Servers are where groups of people can text each other. Can also view the members listing and get live updates on member status changes.

![server screenshot](./frontend/src/assets/readme_images/server.png)

The ServerPage component fetches necessary channel and message data, and sets up

```javascript
const ServerPage = () => {
  const sessionUser = useSelector(getCurrentUser);
  const {serverId, channelId} = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (sessionUser) {
      dispatch(setSelectedServer(serverId));
      dispatch(fetchChannels(serverId))
      ... // error handling code
      dispatch(fetchMembers(serverId));
    }

    ... // action cable subscription handling
  }, [dispatch, serverId])
  
  useEffect(() => {
    if (channelId && sessionUser) {
      dispatch(fetchMessages(channelId))
      ... // error handling
    }

    ... // action cable subscription handling

    return () => {
      subscription?.unsubscribe();
      dispatch(resetMessages());
      dispatch(setScroll(true));
    }
  }, [dispatch, channelId])
  
  if (!sessionUser) return <Redirect to="/login" />
  
  return (
    <div className="server-page">
      <HomeSideBar />
      {
        channelId 
          ? <MessageDisplay />
          : null
      }
    </div>
  )
}
```

### Friends List

___

Users can manage their friends, filter by their online status, and manage sent and incoming friend requests. Friend listings are live updated when any friend status changes or friends get added/deleted.

![friends screenshot](./frontend/src/assets/readme_images/friends.png)

HomePage component fetches the necessary friends and requests data

```javascript
const HomePage = () => {
  const sessionUser = useSelector(getCurrentUser);

  const dispatch = useDispatch();
  useEffect(() => {
    if (sessionUser) {
      dispatch(setSelectedServer("home"));
      dispatch(fetchFriends());
      dispatch(fetchFriendRequests());
    }

    ... // action cable handling

    return () => {
      friendSubscription?.unsubscribe();
      dispatch(resetFriends());
      dispatch(resetFriendRequests());
      dispatch(setHomePageLoad(false));
    }
  }, [dispatch])
  
  if (!sessionUser) return <Redirect to="/login" />

  return (
    <div className="home">
      <HomeSideBar />
      <FriendsDisplay />
    </div>
  )
}
```

FriendsDisplay component chooses the appropriate friends tab to display which each read through the appropriate redux data fetched from HomePage.

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

### Live Chat

___

Users can message each other within server channels. Can post and delete messages which gets updated in realtime for everyone seeing the channel.

![messages screenshot](./frontend/src/assets/readme_images/chat.png)

MessageDisplay subcomponents will use and display the messages data fetched from the ServerPage.

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

### Notifications

___

Includes live updates for change in member status, friends, requests, and messages.

Implemented in the Rails backend using Action Cable, and using an Action Cable npm library in the React frontend. Uses a redis database to manage web connections.

Example of broadcasting status updates on the backend when logging out.

```ruby
def destroy
  if current_user
    memberships = current_user.memberships.includes(:server)
    friendships1 = current_user.friendships1.includes(:user2, :user1)
    friendships2 = current_user.friendships2.includes(:user1, :user2)
    sent = current_user.sent_friend_requests.includes(:receiver, :sender)
    received = current_user.received_friend_requests.includes(:sender, :receiver)

    logout!()

    memberships.each do |membership|
      ServersChannel.broadcast_to(
        membership.server,
        type: 'UPDATE_MEMBER',
        **from_template('api/memberships/show', membership: membership)
      )
    end

    friendships1.each do |friendship|
      FriendsChannel.broadcast_to(
        friendship.user2,
        type: 'UPDATE_FRIEND',
        **from_template('api/friends/show', friendship: friendship, friend: friendship.user1)
      )
    end

    friendships2.each do |friendship|
      FriendsChannel.broadcast_to(
        friendship.user1,
        type: 'UPDATE_FRIEND',
        **from_template('api/friends/show', friendship: friendship, friend: friendship.user2)
      )
    end

    sent.each do |request|
      if request.status === "pending"
        FriendsChannel.broadcast_to(
          request.receiver,
          type: 'UPDATE_INCOMING_REQUEST',
          **from_template('api/friend_requests/show', friend_request: request, receiver: request.sender)
        )
      end
    end

    received.each do |request|
      if request.status === "pending"
        FriendsChannel.broadcast_to(
          request.sender,
          type: 'UPDATE_SENT_REQUEST',
          **from_template('api/friend_requests/show', friend_request: request, receiver: request.receiver)
        )
      end
    end

    head :no_content
  end
end
```

Example of the frontend subscribing to friend broadcasts and dispatching the appropriate redux actions

```javascript
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
        case "ADD_INCOMING_REQUEST":
          dispatch(addReceivedRequest(friendRequest));
          break;
        case "DELETE_INCOMING_REQUEST":
          dispatch(removeReceivedRequest(id));
          break;
        case "UPDATE_INCOMING_REQUEST":
          dispatch(addReceivedRequest(friendRequest));
          break;
        case "UPDATE_SENT_REQUEST":
          dispatch(addSentRequest(friendRequest));
          break;
      }
    }
  }
);
```
