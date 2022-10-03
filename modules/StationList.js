import React from 'react';
import styled from'styled-components/native';
import PropTypes from 'prop-types';
import IconButton from '../components/IconButton'
import {images} from '../modules/images'
import {TouchableOpacity, StyleSheet} from 'react-native';
// 1. src/searchStation의 자식

const Content_name = styled.Text`
flex: 1;
font-size: 14px;
`;

const Content_locate = styled.Text`
flex: 1;
font-size: 15px;
`;

const styles = StyleSheet.create({
    button: {
        alignItems: "center",
    },
});

const StationList = ({ item, saveResult, storage, goBus}) => {

    var choice = new Object();

    const changeClicked = item => {
        if (item.clicked == false) {
            const newStorageObject = {
                [item.id] : {
                    id: item.id,
                    name: item.name,
                    x: item.x,
                    y: item.y,
                },
            };
            saveResult({...storage, ...newStorageObject});
            item.clicked = true;
        }
        else {
            const currentResults = Object.assign({}, storage);
            delete currentResults[item.id];
            saveResult(currentResults);
            item.clicked = false;
        }
    }

    return (
        <TouchableOpacity
        onPressOut = {() => {
            choice = item;
            console.log("item clicked", item.id, item.name);
            goBus(item);
        }}
        style = {styles.button}
        >
            <Content_name>{item.name}</Content_name>
            <Content_locate>{item.id}</Content_locate>
            <Content_locate>위치: {item.x}, {item.y}</Content_locate>
            <IconButton 
            type={item.clicked ? images.clicked : images.unclicked} 
            id={item} 
            onPressOut={changeClicked}
            clicked={item.clicked}
            />
        </TouchableOpacity>
    );
};

StationList.defaultProps = {
    onPressOut: () => {},
};

StationList.propTypes = {
    item: PropTypes.object.isRequired,
    onPressOut : PropTypes.func,
};

export default StationList;