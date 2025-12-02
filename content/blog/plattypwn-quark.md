+++
title = 'Plattypwn Quark'
date = 2025-11-16T18:27:41+01:00
draft = false
shortdesc = "What happens if you mix LaTeX and Markdown?"
+++

I was lucky enough to participate in PlatyPWN 2025 on-site, hosted by members of the HPI in Potsdam. The challenges ranged from easy to hard across a lot of different fields.

#### Description

> What happens when you mix LaTeX and Markdown? Could that be secure? Is it utterly broken, 'cause LaTeX? Well, time to find out!

It seems like we are dealing with LaTeX, which by nature often has security quirks. All we have to do is get the flag that is stored in the environment variables.

Let's look at the application in the browser first. After that, we will take a look at the mechanism behind it.

![Web View](/images/plattypwn-quark/web.png)

"Render HTML" gives us a download redirect to the rendered HTML. Nothing special so far. But how is the HTML being rendered? A look at `app.py` reveals a basic Flask app.

```python
...
@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        source = request.form.get("source", "")
        if not source.strip():
            return "No input provided", 400

        with tempfile.TemporaryDirectory() as tmpdir:
            qk_file = os.path.join(tmpdir, "input.qk")
            html_file = os.path.join(tmpdir, "output/index.html")

            with open(qk_file, "w") as f:
                f.write(source)

            subprocess.run(["quarkdown", "c", qk_file, "--out", tmpdir, "--out-name", "output"], check=True)

            return send_file(html_file, as_attachment=True, download_name="output.html")

    return render_template_string(FORM_HTML)
```

Nothing special within the application code; everything seems normal. The rendering engine appears to be Quarkdown. Quarkdown is a Markdown-based typesetting system. Basically, it allows you to quickly write papers with the support of basic logic elements such as functions, loops, or control structures.

If we check their documentation, we see this:

> When called from a Quarkdown source, the function name is preceded by a . (dot) and each argument is wrapped in curly brackets.

```LaTeX
.myfunction {arg1} {arg2}
```

So we are able to perform basic functions such as multiply, divide, or one that looks like this:

```LaTeX
.read {myfile.txt}
```

How generous of them to give us a read function! Let's try to read some system files, shall we?

#### Burpsuite

![Burpsuite](/images/plattypwn-quark/burp.png)

Hey, that looks like the `/etc/hosts` file. But remember, we need to read the environment variables. So we are just going to use a standard trick and read from good old `/proc/self/environ`.

![Flag Hoooray](/images/plattypwn-quark/flag.png)

And that's the flag. The challenge itself was rather beginner-friendly, but it was certainly a lot of fun diving a little bit into the weird world of LaTeX.
