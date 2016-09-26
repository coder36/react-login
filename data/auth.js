const jwt = require('jsonwebtoken')
const fs = require('fs')
const Promise = require('bluebird')
const crypto = require('crypto')
const {User} = require('./model');

let private_key = fs.readFileSync('private.pem')
let public_key = fs.readFileSync('public.pem')
let jwtVerifyAsync = Promise.promisify(jwt.verify, jwt);


function sign_token( payload ) {
    return jwt.sign( payload, private_key, {algorithm: 'RS256'})
}

function verify_token(token) {
    return jwtVerifyAsync(token, public_key, {});
}

function hashPassword(secret) {
    const hash = crypto.createHash('sha256')
    let password_salt = crypto.randomBytes(256).toString('base64')
    hash.update(`${password_salt}${secret}`)
    return ({password_salt, password_hash: hash.digest('base64')})
}

function verifyPassword(user, secret) {
    const hash = crypto.createHash('sha256')
    hash.update(`${user.password_salt}${secret}`)
    return user.password_hash === hash.digest('base64')
}

function getAuthenticatedUser(token) {
    return verify_token(token)
        .then( (payload) =>  User.findOne( {username: payload.username} ) )
        .then( (user) =>  user ? user : { errors: ["user_not_found"] })
        .catch( (e) => ({errors: ["invalid_token", "JsonWebTokenError: " + e.message]}) )
}

function createToken(username, password) {
    return User.findOne( {username} ).then( (user) => {
        if ( !user) return { errors: ["user_not_found"] };
        if( !verifyPassword( user, password ) ) return { errors: ["incorrect_password"] }
        return {token: sign_token({username: user.username}) }
    })
}

function createUser(username, password, name) {
    return User.find( {username} ).limit(1).then( (res) => {
        if ( res.length != 0 ) return {errors: ["user_already_exists"]}

        let h = hashPassword(password)
        let user = new User( {username, name,
            password_hash: h.password_hash,
            password_salt: h.password_salt} )
        return user.save().then( (u) => ({ token: sign_token({username: user.username}) }) )
    })
}


module.exports = {
    createToken,
    createUser,
    getAuthenticatedUser,
}
