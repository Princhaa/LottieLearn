import { Dimensions, Platform } from 'react-native';
const { width, height } = Dimensions.get('window');

export default{
    DEVICE_WIDTH: width,
    DEVICE_HEIGHT: height,
    BASE_URL: 'https://api.opendota.com/api'
}