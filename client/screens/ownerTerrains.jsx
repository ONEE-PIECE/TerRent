import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { View, Text, Button, Modal,TextInput,Image,StyleSheet } from 'react-native';

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
      const response = await axios.get('http://192.168.43.108:3000/api/terrain/0dREETaPxIc98JD74fLxQrVzKJm2');
       setTerrains(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteTerrain = async (id) => { 
    try {
      const response = await axios.delete(`http://192.168.43.108:3000/api/terrain/${id}`);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateTerrain = async () => {
    try {
      const response = await axios.patch(`http://192.168.43.108:3000/api/terrain/${selectedTerrain.id}`, {
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
         <Image source={{uri:'https://i.guim.co.uk/img/media/888a4d1a86c821338ae04c8af431b2d3dcb80fe6/0_346_5184_3110/master/5184.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=a0b14c1253162370f7c2a76e5c962551'}} />
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
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  terrain: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
  description: {
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  modalContent: {
    padding: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  availabilityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  availabilityText: {
    marginRight: 10,
  },
});

export default HandleOwnerTerrains 