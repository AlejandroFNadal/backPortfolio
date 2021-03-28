module.exports={
    'secret': process.env.JWTSECRET,
    'database': 'mongodb://localhost/node-auth',
    'remoteDB' : 'mongodb+srv://backendPortfolio:'+process.env.MONGOKEY+'@nadal-cluster.9oeuo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
}