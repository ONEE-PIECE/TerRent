// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, FlatList } from 'react-native';

// const ChatScreen = ({ route }) => {
//   const { firebase } = route.params;
//   const [messages, setMessages] = useState([]);
//   const [text, setText] = useState('');

//   useEffect(() => {
//     const unsubscribe = firebase
//       .firestore()
//       .collection('messages')
//       .orderBy('createdAt', 'desc')
//       .onSnapshot((querySnapshot) => {
//         const messages = [];
//         querySnapshot.forEach((doc) => {
//           messages.push({
//             id: doc.id,
//             text: doc.data().text,
//             createdAt: doc.data().createdAt.toDate(),
//           });
//         });
//         setMessages(messages);
//       });

//     return () => unsubscribe();
//   }, []);

//   const handleSend = async () => {
//     try {
//       await firebase.firestore().collection('messages').add({
//         text,
//         createdAt: new Date(),
//       });
//       setText('');
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const renderItem = ({ item }) => (
//     <View>
//       <Text>{item.text}</Text>
//       <Text>{item.createdAt.toString()}</Text>
//     </View>
//   );

//   return (
//     <View style={{ flex: 1 }}>
//       <FlatList
//         inverted
//         data={messages}
//         keyExtractor={(item) => item.id}
//         renderItem={renderItem}
//       />
//       <View style={{ flexDirection: 'row' }}>
//         <TextInput
//           style={{ flex: 1, height: 40 }}
//           value={text}
//           onChangeText={(value) => setText(value)}
//         />
//         <Button title="Send" onPress={handleSend} />
//       </View>
//     </View>
//   );
// };

// export default ChatScreen;


import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'

function ChatScreen() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
      setMessages([
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ])
    }, [])
  
    const onSend = useCallback((messages = []) => {
      setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }, [])
  
    return (
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    )
}

export default ChatScreen
