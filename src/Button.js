import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = ({ onPress }) => {
  const { buttonStyle, textStyle } = styles;
return (
  <TouchableOpacity onPress={onPress} style={buttonStyle}>
   <Text style={textStyle} > Giriş </Text>
   </TouchableOpacity>
  );
};

export default Button;

const styles = {
   textStyle: {
     alignSelf: 'center', //Bulunduğu view içerisinde
     color: '#007aff',
     fontWeight: '600',
     marginTop: 10,
     paddingBottom: 10
   },

   buttonStyle: {
     alignSelf: 'stretch',
     backgroundColor: '$fff',
     borderRadius: 5,
     borderWidth: 1,
     borderColor: '#007aff',
     marginLeft: 5,
     marginRight: 5
   }
};
