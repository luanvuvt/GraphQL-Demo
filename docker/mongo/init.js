var user = 'root';
var passwd = 'example';
var admin = db.getSiblingDB('admin');
admin.auth(user, passwd);
db.createUser({user: user, pwd: passwd, roles: ["readWrite"]});

db.aabb.insert({"name":"tutorials point"})