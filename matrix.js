class Matrix {

    constructor(rows, cols, values) {
        this.rows = rows
        this.cols = cols

        if (values == undefined) {
            this.values = []

            for (let i = 0; i < this.rows * this.cols; i++) {
                this.values.push(0)
            }
        } else {
            if (values.length == this.rows * this.cols) {
                this.values = values;
            } else {
                throw "A quantidade de elementos é incompatível com tamanho da matrix!"
            }
        }
    }

    get(i, j) {
        return this.values[this.getIndex(i, j)]
    }

    set(i, j, value) {
        this.values[this.getIndex(i, j)] = value
    }

    getIndex(i, j) {
        if (i < 1 || i > this.rows) throw "O índice da linha nâo corresponde ao tamanho da matriz."
        if (j < 1 || j > this.cols) throw "O índice da coluna nâo corresponde ao tamanho da matriz."

        return (j - 1) + ((i - 1) * this.cols)
    }

    print(a) {

        for (let i = 1; i <= this.rows; i++) {
            for (let j = 1; j <= this.cols; j++) {
                if (j < this.cols) {
                    document.write("(" + this.get(i, j) + ") ")
                } else {
                    document.write("(" + this.get(i, j) + ") " + "</br>")
                }
            }
        }

        document.writeln("</br>")
        document.writeln("</br>")
    }
}