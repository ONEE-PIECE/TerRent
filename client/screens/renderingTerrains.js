// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { View, Text } from 'react-native-web';

// const TerrainsFoot = () => {
//   const [terrains, setTerrains] = useState([]);

//   useEffect(() => {
//     handleFetchingTerrains();
//   }, []);

//   const handleFetchingTerrains = () => {
//     axios
//       .get('http://192.168.104.9:3000/api/terrains/foot')
//       .then(function (response) {
//         setTerrains(response.data);
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
//   };

//   return (
//     <View>
//       {terrains.map((terrain) => (
//         <Text key={terrain.id}>{terrain.name}</Text>
//       ))}
//     </View>
//   );
// };

// export default TerrainsFoot;