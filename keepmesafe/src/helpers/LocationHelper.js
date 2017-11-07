import { Constants, Location, Permissions } from 'expo';

export const LocationHelper =  async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permiso de acceso a localización denegado.',
            });
        }

        let location = await Location.getCurrentPositionAsync({});
        return location;
}