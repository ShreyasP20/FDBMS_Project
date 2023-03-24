from flask import Flask, render_template, request, flash

app = Flask(__name__)
app.secret_key = "YELLOW_SECRET_KEY"

@app.route("/hello")
def index():
    flash("What's Your Name?")
    return render_template('index.html')

@app.route("/greet", methods=["GET", "POST"])
def greet():
    flash("Hi " + str(request.form['name_input']) + ",great to see you!!")
    return render_template('index.html')
