from flask import Flask,render_template,request
from flask.wrappers import Request

app=Flask(__name__)

@app.route('/')
def estudiante():
    return render_template('estudiante.html')


@app.route('/result',methods=['POST','GET'])
def result():
    if request.method=='POST':
        notas=request.form
        return render_template('notas_estudiante.html',result=notas)


if __name__=='__main__':
    app.run()