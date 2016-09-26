# React-login

Reading this [blog post](https://medium.com/the-graphqlhub/graphql-and-authentication-b73aed34bbeb) inspired me to
create a React / GraphQL authentication solution.

The author suggests that we could:
 1) Use a GraphQL query to create a Json Web token which can then
 2) Use the token to access a user specific view of their data


I ended up with a graphql schema which worked as follows:    
 

```

mutation {
  create_user( username: "marky" password: "password" name: "Mark Middleton ) {
    token
    errors
  }
}

{
  token( username: "marky" password: "password") {
    token
    errors
  }
}

...
{
  viewer( token: "eyJhbGciOiJSUzI1NiIsInR..." ) {
    username   
}

```



## Running the prototype

Assuming mongo is up and running:

```
npm install
npm install foreman -g
foreman start
```

(http://localhost:5000)[http://localhost:5000]


The graphql server will start up on: (http://localhost:5100)[http://localhost:5100]


## Followup work

* Could this be extended to allow for second factors ie. google authenticator?



# Working notes...

## Passwords

Passwords are stored as a salted sha-256 hash:
``` 
salt = random 256 bytes  
hash = sha256(salt + password)
```  
The password and salt are then stored against the username
  
  

## Json Web Tokens (JWT)

An example JWT token:
```
eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJvYjciLCJhdXRoX3Bhc3NlZCI6WyJwYXNzd29yZCJdLCJhdXRoZW50aWNhdGVkIjpmYWxzZSwiaWF0IjoxNDc0NDc2MTYxfQ.XThJKOHRG5FNOWxppFSmxy3K_UsCilpmBg6iYuAv6G8LymoxDrg1Uk3cOPKAcC0CnX15flU-HxlRQZzNu44uwHm42pv6G27LDs6ta9vpfQQqtFFMZXjmtG6seLsDsApjUKJMtDeJ9YNk-LkDm12c9IagaScJCBe4j9kibimE9oI
```
Paste this base64 encoded `Header.Payload.Signature` into the [http:///jwt.io](http:///jwt.io) debugger to take a look.

Important facts:
 
1) A JWT token is cryptographically signed on the server (using a private key) and then passed to the 
client safe in the knowledge that the client can not tamper with its contents.

2) A JWT token can contain an arbitrary json payload (which can not be tampered with).  We can use the payload to safely store an 
  authentication status (see 1).

The web token is signed using a secret key `private.pem` and verified with `public.pem`


## React-relay

I wanted to use React-Relay, but rapidly got bogged down in what seemed like overly complicated setup.  I got something working 
but my overriding feeling is that Relay needs work doing to make it developer friendly.  There seems like a lot of
magic happening behind the scenes which unless you are running at facebook scale, does not give me much.  I'm sure I'll revisit 
this in the future.

Instead I'm using [lokka](https://github.com/kadirahq/lokka) as a graphql client.  Any data I pull back, I'm immediately saving in to a 
  Redux store.


## Redux store

I've created a redux store which can be used like a session to store global state.  It's an especially useful pattern for single page 
apps.  The only downside is the boilder plate, decorator you have to put around any react components which use the redux store.