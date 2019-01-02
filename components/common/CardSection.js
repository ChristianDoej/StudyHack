import React from 'react';
import { View } from 'react-native';

// eslint-disable-next-line arrow-body-style
const CardSection = (props) => {
    return (
        <View style={styles.containerStyle}>
        {props.children}
        </View>
    );
};

const styles = {
    containerStyle: {
        borderBottomWidth: 1,
        padding: 5,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        borderColor: '#ddd',
        position: 'relative'

    }
};

export default CardSection;
// export { CardSection };

