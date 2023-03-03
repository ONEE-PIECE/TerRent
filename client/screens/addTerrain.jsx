
// import React, { useState } from 'react';
// import axios from 'axios';
// import { View, TextInput, Button } from 'react-native';

// const AddTerrainForm = () => {
//   const [name, setName] = useState('');
//   const [price, setPrice] = useState('');
//   const [description, setDescription] = useState('');
//   const [location, setLocation] = useState('');
//   const [region, setRegion] = useState('');
//   const [category, setCategory] = useState('');
//   const [images, setImages] = useState('');
//   const [capacity, setCapacity] = useState('');
//   const [availability, setAvailability] = useState(false);

//   const handleAddTerrain = async () => {
//     try {
//       const newTerrain = {
//         Name: name,
//         Price: price,
//         Description: description,
//         Location: location,
//         Region: region,
//         Category: category,
//         Images: images,
//         Capacity: capacity,
//         Availability: availability,
//       };
//       const response = await axios.post('http://192.168.104.13:3000/api/terrain/ownerId', newTerrain);
//       console.log(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <View>
//       <TextInput
//         placeholder="Name"
//         value={name}
//         onChangeText={setName}
//       />
//       <TextInput
//         placeholder="Price"
//         value={price}
//         onChangeText={setPrice}
//         keyboardType="numeric"
//       />
//       <TextInput
//         placeholder="Description"
//         value={description}
//         onChangeText={setDescription}
//       />
//       <TextInput
//         placeholder="Location"
//         value={location}
//         onChangeText={setLocation}
//       />
//       <TextInput
//         placeholder="Region"
//         value={region}
//         onChangeText={setRegion}
//       />
//       <TextInput
//         placeholder="Category"
//         value={category}
//         onChangeText={setCategory}
//       />
//       <TextInput
//         placeholder="Images"
//         value={images}
//         onChangeText={setImages}
//       />
//       <TextInput
//         placeholder="Capacity"
//         value={capacity}
//         onChangeText={setCapacity}
//         keyboardType="numeric"
//       />
//       <Button
//         title={availability ? 'Available' : 'Unavailable'}
//         onPress={() => setAvailability(!availability)}
//       />
//       <Button
//         title="Add Terrain"
//         onPress={handleAddTerrain}
//       />
//     </View>
//   );
// };

// export default AddTerrainForm;