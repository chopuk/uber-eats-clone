const environments = {
    development: {
        YELP_API_KEY : '_Uk3KxIuc1ufrBeUmHavtNhj4X-Jg6VVHUO2X1WgcHqLrPocFKYfp3rmS8fUyZjvmwLmSbyvWYHcO5xDuC75qubJ0S5AEAj91g9fuhmAnn274nZb-MjWguF2gC7yY3Yx',
        GOOGLE_PLACES_API_KEY : 'AIzaSyC2TFvA1RsKYZhLvRj9LdWIpYPtEnX6p-I'
    },
    production: {
        YELP_API_KEY : '_Uk3KxIuc1ufrBeUmHavtNhj4X-Jg6VVHUO2X1WgcHqLrPocFKYfp3rmS8fUyZjvmwLmSbyvWYHcO5xDuC75qubJ0S5AEAj91g9fuhmAnn274nZb-MjWguF2gC7yY3Yx',
        GOOGLE_PLACES_API_KEY : 'AIzaSyC2TFvA1RsKYZhLvRj9LdWIpYPtEnX6p-I'
    }
}

const env = environments.development // change this line as needed and import environment.js where needed
export default env