import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Image,Text } from 'react-native';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';

const AddEventForm = ({ terrainId }) => {
  const [eventName, setEventName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [price, setPrice] = useState('');
  const [media, setMedia] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('EventName', eventName);
      formData.append('Description', description);
      formData.append('Date', date);
      formData.append('Price', price);
      formData.append('Media', media);

      const response = await axios.post(`http://192.168.43.108:3000/api/events/2`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log(response);
      setMessage('Event added');
      setEventName('');
      setDescription('');
      setDate('');
      setPrice('');
      setMedia(null);
    } catch (err) {
      console.log(err);
    }
  };

  const handlePickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setMedia(result.uri);
    }
  };

  return (
    <View>
      <TextInput
        value={eventName}
        onChangeText={setEventName}
        placeholder="Event Name"
      />
      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="Description"
      />
      <TextInput
        value={date}
        onChangeText={setDate}
        placeholder="Date"
      />
      <TextInput
        value={price}
        onChangeText={setPrice}
        placeholder="Price"
      />
      {media && (
        <Image
          source={{ uri: media }}
          style={{ width: 200, height: 200 }}
        />
      )}
      <Button title="Select Image" onPress={handlePickImage} />
      <Button title="Submit" onPress={handleSubmit} />
      {message ? <Text>{message}</Text> : null}
    </View>
  );
};

export default AddEventForm;
