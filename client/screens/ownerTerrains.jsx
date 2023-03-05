import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { View, Text, Button, Modal,TextInput } from 'react-native';

const HandleOwnerTerrains = () => {
  const [terrains, setTerrains] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTerrain, setSelectedTerrain] = useState(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState('');
  const [capacity, setCapacity] = useState('');
  const [availability, setAvailability] = useState('');

  const getTerrains = async () => {
    try {
      const response = await axios.get('http://192.168.104.13:3000/api/terrain/terrainS/1');
      // setTerrains(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteTerrain = async (id) => { 
    try {
      const response = await axios.delete(`http://192.168.104.13:3000/api/terrain/${id}`);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateTerrain = async () => {
    try {
      const response = await axios.patch(`http://192.168.104.13:3000/api/terrain/${selectedTerrain.id}`, {
        Name: name,
        Price: price,
        Description: description,
        Images: images,
        Capacity: capacity,
        Availability: availability,
      });
      console.log(response.data);
      setModalVisible(false);
      getTerrains();
    } catch (error) {
      console.error(error);
    }
  };


  
  useEffect(() => {
    getTerrains();
  }, []);

  return (
    <View>
      {terrains.map((terrain) => (
        <View key={terrain.id}>
          <Text>{terrain.Name}</Text>
          <Text>{terrain.Price}</Text>
          <Text>{terrain.Description}</Text>
          <Text>{terrain.Location}</Text>
          <Text>{terrain.Region}</Text>
          <Text>{terrain.Category}</Text>
          <Text>{terrain.Images}</Text>
          <Text>{terrain.Capacity}</Text>
          <Text>{terrain.Availability ? 'Available' : 'Unavailable'}</Text>
          <Button
            title="Delete"
            onPress={() => handleDeleteTerrain(terrain.id)}
          />
          <Button
            title="Update"
            onPress={() => {
              setModalVisible(true);
            }}
          />
        </View>
      ))}
     <Modal
   animationType="slide"
   visible={modalVisible}
   onRequestClose={() => {
     setModalVisible(false);
   }}
>
  <View>
    <Text>Edit Terrain</Text>
    <TextInput
      placeholder="Name"
      value={name}
      onChangeText={(text) => setName(text)}
    />
    <TextInput
      placeholder="Price"
      value={price}
      onChangeText={(text) => setPrice(text)}
    />
    <TextInput
      placeholder="Description"
      value={description}
      onChangeText={(text) => setDescription(text)}
    />
    <TextInput
      placeholder="Images"
      value={images}
      onChangeText={(text) => setImages(text)}
    />
    <TextInput
      placeholder="Capacity"
      value={capacity}
      onChangeText={(text) => setCapacity(text)}
    />
    <View>
      <Text>Availability:</Text>
      <Button
        title={availability ? 'Available' : 'Unavailable'}
        onPress={() => setAvailability(!availability)}
      />
    </View>
    <Button title="Save" onPress={handleUpdateTerrain} />
    <Button title="Cancel" onPress={() => setModalVisible(false)} />
  </View>
</Modal>

    </View>
  );
}

export default HandleOwnerTerrains