// Import libraries for making a component
import React from 'react';
import { Text, View } from 'react-native';

// Make a component
// eslint-disable-next-line arrow-body-style
const Header = (props) => {
    return (
        <View style={styles.viewStyle}>
            <Text style={styles.textStyle}>{props.headerText}</Text>
        </View>
    );
};

const styles = {
    viewStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 80,
        paddingTop: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        elevation: 2,
        position: 'relative',
        
    },
    textStyle: {
        fontSize: 30,
    }
};

export default Header;
