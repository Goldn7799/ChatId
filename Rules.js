/*
  GLOBAL RULES
  Server User Id : Must 18 char
  Server File Id or Server Group Id : Must 16 char
  Auth Code : must 24 char and resseted on 1 hour or server start|restart
  Profile(Group|User) and Banner(User) : id of user or group and image name for access
*/


// User Data
/*
  Key On Data : Id User in Server
  AuthCode : Auth Code to acces full information of user
  DisplayName : Name for display profile
  UserName : Identity as Public ID
  Bio : User Bio
  BlueTick : if 'none' meaning as no have blue tick, if true filled with blue tick type
  LastOnline : Data from Date.now() or TimeStamp
  Region : Region Code
  PublicSettings : public settings 
  UserState : 
    IsBanned : for false fill with 'no' id true fill with her reason
    ContactList : Array Of Contact list AsNote for note and id for server id of user
    GroupId : List of Grup user joined
    BlockList : list array of server id user
    PrivateChat : Array list of Frivate ChatId
*/
const UserData = {
  'usahebsahe': {
    AuthCode: 'abfduwbfuiauhwuh',
    DisplayName: 'Dummy',
    UserName: 'someone_dummy',
    Bio: 'Good Luck',
    BlueTick: 'none',
    LastOnline: 6293197219,
    Regios: 'en_us',
    PublicSettings: {
      ShowLastOnline: false,
      ShowProfileAsPublic: false,
      ShowProfileOnSearch: false,
      ShowBannerAsPublic: false
    },
    UserState: {
      IsBanned: 'no',
      ContactList: [
        { AsNote: 'My Friend', id: '6ashqus7as'}
      ],
      GroupList: [
        'audbuaebvsaj'
      ],
      BlockList: [
        '6ru18nsua'
      ],
      PrivateChat: [
        'usahebsahe-wjhgduywheu'
      ]
    }
  }
}

// Group Data
const GroupData = {
  'jdaiuwbsha': {
    Name: 'Programmirer',
    Description: 'Welcome To Program World',
    Owner: 'agsywgydvbuyaw',
    PublicSettings: {
      AdminOnlyMessage: false,
      AdminOnlyEditGroup: true,
      NewMemberConfirmation: false
    },
    PendingMemberList: [],
    GroupParticipants: [
      { Id: 'jsuybeiudaiwu', IsAdmin: true},
      { Id: 'wihfwiujeriwu', IsAdmin: false}
    ],
    Messages: [
      {
        Id: 'wudgyuwg',
        Reply: false,
        From: 'wihfwiujeriwu',
        Type: 'text',
        Body: 'Hello World'
      },
      {
        Id: 'fede',
        Reply: 'wudgyuwg',
        From: 'jsuybeiudaiwu',
        Type: 'text',
        Body: 'Hello Carl'
      }   
    ]
  }
}

// Private Chat
/*
  Key : before and after '-' is server user id
  After Key : array of Messages
*/
const PrivateChat = {
  'usahebsahe-wjhgduywheu': [
    {
      Id: 'wudgyuwg',
      Reply: false,
      From: 'usahebsahe',
      Type: 'text',
      Body: 'Hello World'
    }
  ]
}

// Messaging
/*
  To(server request) :
    Type: type of chat 'group'|'private'
    Id : id of chat
  Id : If of Message
  Reply : Reply Id Message
  From : From who this message sent
  Type : Type of chat(can see at message type and body)
  Body : Data list(can see at message type and body)
*/
const StandartMessage = {
  Reply: false,
  From: 'ydba71s28sa3',
  Type: 'text',
  Body: 'Hello World'
}

//// Message Type And Body
/*
Body : Text or string
*/
const TextMessage = {
  Type: 'text',
  Body: 'Hello World'
}

/*
  Type : image | sticker
  Body :
    FileId : Id Of image in storage server
    Caption : string of text caption
*/
const ImageMessage = {
  Type: 'image',
  Body: {
    FileId: 'ashyuebdya',
    Caption: 'This is my home'
  }
}

/*
  Body :
    FileId : Id Of image in storage server
    Caption : string of text caption
*/
const VideoMessage = {
  Type: 'video',
  Body: {
    FileId: 'uuahushuqh',
    Caption: 'This is a elephant'
  }
}

/*
  Body :
    FileId : Id Of image in storage server
    Caption : string of text caption
*/
const FileMessage = {
  Type: 'file',
  Body: {
    FileId: 'uauevsbdne',
    Caption: 'This is your file project'
  }
}

/*
  Body :
    Contact : Id Of Server User  Id
    Caption : string of text caption
*/
const ContactMessage = {
  Type: 'contact',
  Body: {
    Contact: '8da8dafua',
    Caption: 'This is your Friend'
  }
}

/*
  Body :
    Caption : caption of pooling
    SingleSelect : if true, user cant only select one option( radio ), if else user can select 1+ or more option( checkbox )
    Data : Array Of Option List
      Name : Name of option
      Selected : array of server id user selected this option
*/
const PoolingMessage = {
  Type: 'pooling',
  Body: {
    Caption: 'Select New Feature',
    SingleSelect: false,
    Data: [
      { Name: 'Option A', Selected: [ '736shauyge', '73widwaiuoh' ] },
      { Name: 'Option B', Selected: [ '736shauyge', '73widwaiuoh', 'augeyasge' ] },
      { Name: 'Option C', Selected: [ '736shauyge' ] }
    ]
  }
}

