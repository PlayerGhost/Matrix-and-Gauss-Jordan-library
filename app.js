/*
let a = new Matrix(3, 4, [2, -1, -3, 0, -1, 2, -3, 0, 1, 1, 4, 0])
let b = new Matrix(3, 4, [1, 1, 2, 9, 2, 4, -3, 1, 3, 6, -5, 0])
let c = new Matrix(4, 7, [1, 3, -2, 0, 2, 0, 0, 2, 6, -5, -2, 4, -3, -1, 0, 0, 5, 10, 0, 15, 5, 2, 6, 0, 8, 4, 18, 6])
console.log(la.solve(b)) */

let la = new LinearAlgebra()

function makeFile(text) {
    let file = null

    let data = new Blob([text], { type: 'text/plain' })

    file = window.URL.createObjectURL(data)

    return file
}

function outputFile(conteudo) {
    let link = document.createElement("a")
    link.setAttribute("download", "Planilha.txt")
    link.href = makeFile(conteudo)
    document.body.appendChild(link)

    window.requestAnimationFrame(function() {
        let event = new MouseEvent('click');
        link.dispatchEvent(event);
        document.body.removeChild(link);
    })
}

function formatFile() {
    let saida = "Nome;Tempo gasto\n"

    for (let i = 0; i < filenames.length; i++) {
        saida += filenames[i] + ";"

        saida += tempos[i] + "\n"
    }

    outputFile(saida)
}

const fileSelector = document.getElementById('file-selector');

let filenames = []
let tempos = []

fileSelector.addEventListener('change', function(event) {
    filenames = []
    tempos = []

    for (let i = 0; i < event.target.files.length; i++) {
        const file = event.target.files[i];

        let fileName = String(event.target.files[i].name)

        filenames.push(fileName.substring(0, fileName.length - 2))

        if (file) {

            let reader = new FileReader(file);
            let firstLine = true;

            reader.onload = function() {

                let lines = reader.result.split('\n');
                let matrix;

                for (let i = 0; i < lines.length; i++) {
                    if (!lines[i].startsWith('%') && lines[i] != '') {
                        let aux = lines[i].split(' ');
                        if (firstLine) {
                            matrix = new Matrix(parseInt(aux[0]), parseInt(aux[1]))
                            firstLine = false;
                        } else {
                            matrix.set(parseInt(aux[0]), parseInt(aux[1]), parseInt(aux[2]))
                        }
                    }
                }

                console.log(matrix);

                let start = Date.now()
                console.log(la.solve(matrix))
                let stop = Date.now()

                var elapsedTime = stop - start

                console.log(elapsedTime);

                tempos.push(elapsedTime)

                if (i + 1 == event.target.files.length) {
                    formatFile()
                }
            };

            reader.readAsText(file);
        }
    }
});