import {Lokka} from 'lokka'
import {Transport} from 'lokka-transport-http'

export default new Lokka({ transport: new Transport(process.env.REACT_APP_GRAPHQL_URL ) })
