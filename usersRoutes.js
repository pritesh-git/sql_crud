const mysqlConnection = require("./connectDB");

module.exports = function (app) {
  const handleError = (res, err) => {
    console.log(err)
    res.status(300).send(JSON.stringify(err))
  }
  //Get all employees
  app.get('/employees', (req, res) => {
    mysqlConnection.query('SELECT * FROM employee', (err, rows, fields) => {
      if (err) handleError(res, err)
      res.send(rows)
    })
  })

  app.get('/employees/:id', (req, res) => {
    mysqlConnection.query(
      'SELECT * FROM employee WHERE id= ?',
      [req.params.id],
      (err, rows, fields) => {
        if (err) handleError(res, err)
        res.send(rows)
      },
    )
  })

  //Delete an employees
  app.delete('/employees/:id', (req, res) => {
    mysqlConnection.query(
      'DELETE FROM employee WHERE id = ?',
      [req.params.id],
      (err, rows, fields) => {
        if (err) handleError(res, err)
        res.send('Deleted successfully.')
      },
    )
  })

  //Insert an employees
  app.post('/employees', (req, res) => {
    const Emp = req.body

    mysqlConnection.query(
      'INSERT INTO `employee` (`name`,`email`,`password`,`emp_code`,`salary`) VALUES (?,?,?)',
      [Emp.name, Emp.email, Emp.password, Emp.empCode, Emp.salary],
      (err, result) => {
        if (err) handleError(res, err)
        res.send(result.affectedRows + 'row inserted')
      },
    )
  })

  app.put('/employees/:id', (req, res) => {
    const Emp = req.body
    mysqlConnection.query(
      'UPDATE  `employee` SET `name`=?,`email`=?,`password`=?,`emp_code`=?,`salary`=? WHERE `id`=?',
      [
        Emp.name,
        Emp.email,
        Emp.password,
        Emp.empCode,
        Emp.salary,
        req.params.id,
      ],
      (err, result) => {
        if (err) handleError(res, err)
        res.send(result.affectedRows + 'row update')
      },
    )
  })
}
