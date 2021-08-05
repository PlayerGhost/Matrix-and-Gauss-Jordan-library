class LinearAlgebra {
    transpose(a) {
        let c

        if (typeof a == "object" || (a instanceof Vector)) {
            c = new Vector(a.rows)
            c.rows = a.cols
            c.cols = a.rows

            for (let i = 1; i <= c.size; i++) {
                c.set(i, a.get(i))
            }
        } else if (typeof a == "object" || (a instanceof Matrix)) {
            c = new Matrix(a.cols, a.rows)

            for (let i = 1; i <= a.rows; i++) {
                for (let j = 1; j <= a.cols; j++) {
                    c.set(i, j, a.get(j, i))
                }
            }
        } else {
            throw "O parâmetro a deve ser do tipo Vector ou Matriz."
        }

        return c
    }

    plus(a, b) {
        if (typeof a != "object" || !(a instanceof Matrix)) {
            throw "O parâmetro a deve ser do tipo Matriz."
        } else if (typeof b != "object" || !(b instanceof Matrix)) {
            throw "O parâmetro b deve ser do tipo Matriz."
        }

        if (a.rows != b.rows || a.cols != b.cols) {
            throw "As matrizes passadas como parâmetro são incompatíveis!"
        }

        let c = new Matrix(a.rows, a.cols)

        for (let i = 1; i <= a.rows; i++) {
            for (let j = 1; j <= a.cols; j++) {
                c.set(i, j, a.get(i, j) + b.get(i, j))
            }
        }

        return c
    }

    times(a, b) {
        if (typeof b != "object" || !(b instanceof Matrix)) {
            throw "O parâmetro b deve ser do tipo Matriz."
        }

        let c = new Matrix(b.rows, b.cols)

        if (typeof a == "number") {
            for (let i = 1; i <= c.rows; i++) {
                for (let j = 1; j <= c.cols; j++) {
                    c.set(i, j, a * b.get(i, j))
                }
            }
        } else if (typeof a == "object" && a instanceof Matrix) {
            if (a.rows != b.rows || a.cols != b.cols) {
                throw "As matrizes passadas como parâmetro são incompatíveis!"
            }

            for (let i = 1; i <= c.rows; i++) {
                for (let j = 1; j <= c.cols; j++) {
                    c.set(i, j, a.get(i, j) * b.get(i, j))
                }
            }
        } else {
            throw "O parâmetro a deve ser um escalar numérico ou uma Matriz."
        }

        return c
    }

    div(a, b) {
        if (typeof a != "object" || !(a instanceof Matrix)) {
            throw "O parâmetro a deve ser do tipo Matriz."
        } else if (typeof b != "object" || !(b instanceof Matrix)) {
            throw "O parâmetro b deve ser do tipo Matriz."
        }

        if (a.rows != b.rows || a.cols != b.cols) {
            throw "As matrizes passadas como parâmetro são incompatíveis!"
        }

        for (let i = 0; i < b.values.length; i++) {
            if (b.values[i] == 0) {
                throw "A matriz b possui pelo menos um elemento nulo."
            }
        }

        let c = new Matrix(a.rows, a.cols)

        for (let i = 1; i <= c.rows; i++) {
            for (let j = 1; j <= c.cols; j++) {
                c.set(i, j, a.get(i, j) / b.get(i, j))
            }
        }

        return c
    }

    dot(a, b) {
        if (typeof a != "object" || !(a instanceof Matrix)) {
            throw "O parâmetro a deve ser do tipo Matriz."
        } else if (typeof b != "object" || !(b instanceof Matrix)) {
            throw "O parâmetro b deve ser do tipo Matriz."
        }

        if (a.cols != b.rows) {
            throw "As matrizes passadas como parâmetro são incompatíveis!"
        }

        let c = new Matrix(a.rows, b.cols)

        for (let i = 1; i <= a.rows; i++) {
            for (let j = 1; j <= b.cols; j++) {
                for (let k = 1; k <= a.cols; k++) {
                    c.set(i, j, c.get(i, j) + a.get(i, k) * b.get(k, j))
                }
            }
        }

        return c
    }

    permuteRow(a, row, col) {
        for (let i = 1; i <= c.rows; i++) {
            if (a.get(i, col) != 0) {
                for (let j = 1; j <= c.cols; j++) {
                    let aux = a.get(row, j)

                    a.set(row, j, a.get(i, j))
                    a.set(i, j, aux)
                }
            }
        }
    }

    round(n) {
        return Math.round((n + Number.EPSILON) * 1) / 1
    }

    solve(a) {
        if (typeof a != "object" || !(a instanceof Matrix)) {
            throw "O parâmetro deve ser do tipo Matriz."
        }

        if (a.rows > a.cols || a.rows < a.cols - 1) {
            throw "A matriz passada como parâmetro deve ser quadrada."
        }

        let c = new Matrix(a.rows, a.cols, a.values.slice())

        //c.print()

        for (let j = 1; j <= c.cols - 2; j++) {
            for (let i = j + 1; i <= c.rows; i++) {
                if (c.get(j, j) == 0) {
                    this.permuteRow(c, j, j)
                }

                let aux = (c.get(i, j) * -1) / c.get(j, j)

                for (let k = j; k <= c.cols; k++) {
                    if (k < c.cols) {
                        c.set(i, k, (c.get(j, k) * aux) + c.get(i, k))
                    } else {
                        c.set(i, k, this.round((c.get(j, k) * aux) + c.get(i, k)))
                    }
                }
            }
        }

        for (let j = c.cols - 1; j >= 1; j--) {
            for (let i = j - 1; i >= 1; i--) {
                if (c.get(j, j) == 0) {
                    this.permuteRow(c, j, j)
                }

                let aux = (c.get(i, j) * -1) / c.get(j, j)

                for (let k = c.cols; k >= j; k--) {
                    if (k < c.cols) {
                        c.set(i, k, (c.get(j, k) * aux) + c.get(i, k))
                    } else {
                        c.set(i, k, this.round((c.get(j, k) * aux) + c.get(i, k)))
                    }
                }
            }
        }

        for (let i = 1; i <= c.rows; i++) {
            var aux = 0
            if (c.get(i, i) != 1) {
                aux = c.get(i, i)
                for (let j = 1; j <= c.cols; j++) {

                    c.set(i, j, this.round(c.get(i, j) / aux))
                }

            }
        }

        let vector = new Vector(c.rows)

        for (let i = 1; i <= c.rows; i++) {
            vector.set(i, c.get(i, c.cols))
        }

        c.print()

        return vector
    }
}