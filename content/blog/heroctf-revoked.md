+++
title = 'HeroCTF Revoked Revenge'
date = 2025-12-18T15:29:46+01:00
draft = true
[params]
  difficulty = ""
  description = "A JWT biggest Nightmare"
+++

This web challenge was part of the HeroCTF v7 event. It combined two vulnerabilities in a flask webapp.

Lets look at the app from the frontend perspective first. After we have logged in we see this page:

![Webpage](/images/heroctf-revoked/frontpage.png)

The webapp seems to be some kind of Employee Managment System. We can even search for employees. Lets look at the implementation of the page.

```python
@app.route("/employees", methods=["GET"])
@token_required
def employees():
    query = request.args.get("query", "")
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        f"SELECT id, name, email, position FROM employees WHERE name LIKE '%{query}%'"
    )
    results = cursor.fetchall()
    conn.close()
    print(request.username)
    return render_template("employees.html", username=request.username, employees=results, query=query)
```

As i was reading the code i immediately spotted the line with the SQL query which seems like a classic SQL injection to me. The reason for this is quite simply that the implementation of such a query should look like this:

```python
conn.execute("SELECT id, name, email, position, FROM employees where name like ?", (query,))
```

The original version is vulnerable because it uses `string interpolation`, which treats user input as executable SQL code, allowing an attacker to manipulate the query. By using parameterized queries (with ? or %s), you separate the command logic from the data. This is because the database driver treats the input strictly as a literal value, making it impossible for malicious commands to be executed.

So lets try to make something out of this. In this case im using a `JOIN attack` to extract data from the `users` table.

![Union Select](/images/heroctf-revoked/union_select.png)

Et voila we have our user hashes. As you can see the last one seems to be the admin user. Because it it states `1`.

But how do we proceed from there? The most obvious answer would be that we try to crack the hash now. But this is harder than you may think. Lets take closer look at the hash.

```text
$2b$12$iHaXXHd.H9JvMCBkA4.ytOqfJ26/t0l9L3CLNwexsMXWBSd1ugBdu
```

From the source code we know that the hash is using the bcrypt library.

```python
password_hash = bcrypt.hashpw(
    password.encode("utf-8"), bcrypt.gensalt()
).decode("utf-8")
```

Bcrypt is using a strong \*\*\* encryption which would take hours to possible decrypt. So we have to assume that we need to gain access differently. Either way we still have access to the database. So lets look at the database schema.

```SQL
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    is_admin BOOL NOT NULL,
    password_hash TEXT NOT NULL);
CREATE TABLE sqlite_sequence(name,seq);
CREATE TABLE revoked_tokens (
     id INTEGER PRIMARY KEY AUTOINCREMENT,
     token TEXT NOT NULL);
CREATE TABLE employees (
     id INTEGER PRIMARY KEY AUTOINCREMENT,
     name TEXT NOT NULL,
     email TEXT UNIQUE NOT NULL,
     position TEXT NOT NULL,
     phone TEXT NOT NULL,
     location TEXT NOT NULL);
```

Besides all the normal stuff that we would expect from an application like this we are looking at a `revoked_tokens` table. This rather unusual implementation adds a expired JWT token (JSON Web Token) whenever a users logs out thus preventing a user which has access to such a token to log in.

The flask application looks for the token in the `revoked_tokens` table. And if there is no result the token is valid and therefore the user is authenticated.

```python
...
  user = conn.execute(
      "SELECT id,is_admin FROM users WHERE username = ?", (username,)
  ).fetchone()
  revoked = conn.execute(
      "SELECT id FROM revoked_tokens WHERE token = ?", (token,)
  ).fetchone()
  conn.close()

  if not user or revoked:
      flash("Invalid or revoked token!", "error")
      return redirect("/login")
...
```

### How are JWT signatrures created?

When an JSON Web token get created it gets signed. That mean its `not encrypted`. It still can be read.

![Devoded](/images/heroctf-revoked/decoded.png)

A signed token allows the application to verify that the content hasn't been changend since the moment i has been created from the host.
