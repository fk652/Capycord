import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchMembers, getMembers } from '../../store/members';
import { getShowMembersToggle } from '../../store/ui';
import MemberItem from './MemberItem';
import './MemberList.css'

const MemberList = () => {
  const {serverId} = useParams();
  const members = useSelector(getMembers);
  const showMembers = useSelector(getShowMembersToggle);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchMembers(serverId));
  }, [dispatch, serverId])

  const membersSorted = {
    owner: null,
    mods: {
      online: [],
      offline: []
    },
    online: [],
    offline: []
  }
  
  members.forEach(member => {
    switch (member.position) {
      case "owner":
        membersSorted.owner = member
        break;
      case "admin":
        member.onlineStatus === "Offline"
          ? membersSorted.mods.offline.push(member)
          : membersSorted.mods.online.push(member)
        break;
      default:
        member.onlineStatus === "Offline"
          ? membersSorted.offline.push(member)
          : membersSorted.online.push(member)
    }
  })

  const dummies = [];
  for (let i = 1000; i < 1050; i++) {
    dummies.push(i)
  }
  const status = ["Busy", "Idle", "Do Not Disturb"]
  const customStatus = ["everything is fine 🔥", "bruh 🦫", null, null, null]
  const pictures = [
    "https://upload.wikimedia.org/wikipedia/en/9/9a/Trollface_non-free.png",
    "https://media.tenor.com/GryShD35-psAAAAC/troll-face-creepy-smile.gif",
    "https://media.tenor.com/jtliaaom4MQAAAAd/clueless-aware.gif",
    // "https://assets.stickpng.com/thumbs/588359d52c9eb99faafea8bd.png",
    // "https://assets.stickpng.com/thumbs/58716c647b7f6103e35c6c9b.png",
    // "https://assets.stickpng.com/thumbs/580b585b2edbce24c47b2a32.png",
    null
  ]

  if (!membersSorted.owner || !showMembers) return null;

  return (
    <div className="member-list-container">
      <h3 className="member-positions-header">
        <span className="member-position">
          SERVER OWNER
        </span>
        <div className="icon-wrapper crown-icon">
          <svg className="crown-icon" width="12" height="12" viewBox="0 0 16 16">
            <path fillRule="evenodd" clipRule="evenodd" d="M13.6572 5.42868C13.8879 5.29002 14.1806 5.30402 14.3973 5.46468C14.6133 5.62602 14.7119 5.90068 14.6473 6.16202L13.3139 11.4954C13.2393 11.7927 12.9726 12.0007 12.6666 12.0007H3.33325C3.02725 12.0007 2.76058 11.792 2.68592 11.4954L1.35258 6.16202C1.28792 5.90068 1.38658 5.62602 1.60258 5.46468C1.81992 5.30468 2.11192 5.29068 2.34325 5.42868L5.13192 7.10202L7.44592 3.63068C7.46173 3.60697 7.48377 3.5913 7.50588 3.57559C7.5192 3.56612 7.53255 3.55663 7.54458 3.54535L6.90258 2.90268C6.77325 2.77335 6.77325 2.56068 6.90258 2.43135L7.76458 1.56935C7.89392 1.44002 8.10658 1.44002 8.23592 1.56935L9.09792 2.43135C9.22725 2.56068 9.22725 2.77335 9.09792 2.90268L8.45592 3.54535C8.46794 3.55686 8.48154 3.56651 8.49516 3.57618C8.51703 3.5917 8.53897 3.60727 8.55458 3.63068L10.8686 7.10202L13.6572 5.42868ZM2.66667 12.6673H13.3333V14.0007H2.66667V12.6673Z" fill="currentColor">
            </path>
          </svg>
        </div>
      </h3>
      <MemberItem 
        name={membersSorted.owner.username}
        status={membersSorted.owner.onlineStatus}
        customStatus={membersSorted.owner.customStatus}
        picture={membersSorted.owner.profilePictureUrl}
        key={membersSorted.owner.id}
      />

      <h3 className="member-positions-header">
        <span className="member-position">
          MODERATORS - {membersSorted.mods.offline.length + membersSorted.mods.online.length}
        </span>
      </h3>
      {
        Object.values(membersSorted.mods).forEach(status => {
          status.map(mod => {
            return <MemberItem 
              name={mod.username}
              status={mod.onlineStatus}
              customStatus={mod.customStatus}
              picture={mod.profilePictureUrl}
              key={mod.id}
            />
          })
        })
      }

      <h3 className="member-positions-header">
        <span className="member-position">
          ONLINE - {membersSorted.online.length}
        </span>
      </h3>
      {
        membersSorted.online.map(member => {
          return <MemberItem 
            name={member.username}
            status={member.onlineStatus}
            customStatus={member.customStatus}
            picture={member.profilePictureUrl}
            key={member.id}
          />
        })
      }

      <h3 className="member-positions-header">
        <span className="member-position">
          OFFLINE - {membersSorted.offline.length}
        </span>
      </h3>
      {
        membersSorted.offline.map(member => {
          return <MemberItem 
            name={member.username}
            status={member.onlineStatus}
            customStatus={member.customStatus}
            picture={member.profilePictureUrl}
            key={member.id}
          />
        })
      }


      <h3 className="member-positions-header">
        <span className="member-position">
          THUNKS - me dunno how count
        </span>
      </h3>
      {
        dummies.map(dummyId => {
          return <MemberItem
            name={"dummy#dumdum"} 
            status={status[Math.floor(Math.random()*status.length)]} 
            customStatus={customStatus[Math.floor(Math.random()*customStatus.length)]}
            picture={pictures[Math.floor(Math.random()*pictures.length)]}
            key={dummyId}
          />
        })
      }
    </div>
  )
}

export default MemberList;